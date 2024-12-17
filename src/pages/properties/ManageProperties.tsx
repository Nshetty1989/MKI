import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  MapPin,
  Home,
  DollarSign,
  Users,
} from "lucide-react";

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    name: "Skyline Apartments",
    type: "Residential Complex",
    location: "123 Main St, New York, NY",
    units: 24,
    occupancyRate: "92%",
    monthlyRevenue: "$52,000",
    status: "Active",
  },
  {
    id: 2,
    name: "Tech Hub Office Space",
    type: "Commercial Building",
    location: "456 Innovation Ave, San Francisco, CA",
    units: 12,
    occupancyRate: "88%",
    monthlyRevenue: "$78,000",
    status: "Active",
  },
  {
    id: 3,
    name: "Green Valley Residences",
    type: "Residential Complex",
    location: "789 Park Road, Austin, TX",
    units: 18,
    occupancyRate: "95%",
    monthlyRevenue: "$45,000",
    status: "Active",
  },
];

const ManageProperties = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = mockProperties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const propertyMetrics = [
    {
      icon: Building2,
      title: "Total Properties",
      value: "3",
      change: "+1 this quarter",
    },
    {
      icon: Home,
      title: "Total Units",
      value: "54",
      change: "All properties",
    },
    {
      icon: Users,
      title: "Average Occupancy",
      value: "91.6%",
      change: "+2.3% vs last month",
    },
    {
      icon: DollarSign,
      title: "Total Revenue",
      value: "$175,000",
      change: "Monthly",
    },
  ];

  return (
    <div className="bg-kingdom-dark min-h-screen pt-16">
      <Navigation />
      <div className="md:ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Property Management
            </h1>
            <p className="text-kingdom-text/80">
              Manage and monitor your property portfolio
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {propertyMetrics.map((metric, index) => (
            <Card
              key={index}
              className="glass-card p-6 glow-effect group hover:border-kingdom-primary/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <metric.icon className="h-8 w-8 text-kingdom-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-medium text-kingdom-text mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-2xl font-bold gradient-text">{metric.value}</p>
                  <p className="text-sm text-kingdom-muted mt-1">{metric.change}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kingdom-muted" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text"
            />
          </div>
        </div>

        {/* Properties Table */}
        <Card className="glass-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-kingdom-primary/20">
                <TableHead className="text-kingdom-text">Property</TableHead>
                <TableHead className="text-kingdom-text">Location</TableHead>
                <TableHead className="text-kingdom-text">Units</TableHead>
                <TableHead className="text-kingdom-text">Occupancy</TableHead>
                <TableHead className="text-kingdom-text">Revenue</TableHead>
                <TableHead className="text-kingdom-text">Status</TableHead>
                <TableHead className="text-kingdom-text w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow
                  key={property.id}
                  className="border-kingdom-primary/20 hover:bg-kingdom-primary/5"
                >
                  <TableCell className="text-kingdom-text">
                    <div>
                      <p className="font-medium">{property.name}</p>
                      <p className="text-sm text-kingdom-muted">{property.type}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-kingdom-text">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-kingdom-primary mr-2" />
                      {property.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-kingdom-text">{property.units}</TableCell>
                  <TableCell className="text-kingdom-text">
                    {property.occupancyRate}
                  </TableCell>
                  <TableCell className="text-kingdom-text">
                    {property.monthlyRevenue}
                  </TableCell>
                  <TableCell className="text-kingdom-text">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-kingdom-primary/20 text-kingdom-primary">
                      {property.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-kingdom-muted hover:text-kingdom-text"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-kingdom-dark border-kingdom-primary/20"
                      >
                        <DropdownMenuItem className="text-kingdom-text hover:bg-kingdom-primary/20">
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 hover:bg-red-500/20">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default ManageProperties;