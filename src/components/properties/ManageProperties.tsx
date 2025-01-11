import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
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
import { Button } from "@/components/ui/button";
import { Search, Building2 } from "lucide-react";
import { AddPropertyDialog } from "@/components/properties/AddPropertyDialog";
import { useAuth } from "@/hooks/use-auth";
import { propertyService } from "@/lib/services/property.service";
import type { Property } from "@/types/property.types";

const ManageProperties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { organizationId } = useAuth();

  // Load properties on component mount
  useEffect(() => {
    loadProperties();
  }, [organizationId]);

  const loadProperties = async () => {
    if (!organizationId) return;
    
    try {
      setIsLoading(true);
      const data = await propertyService.getProperties(organizationId);
      setProperties(data);
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter properties based on search query
  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-kingdom-dark min-h-screen pt-16">
      <Navigation />
      <div className="md:ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Property Management
            </h1>
            <p className="text-kingdom-text/80">
              Manage and monitor your property portfolio
            </p>
          </div>
          <AddPropertyDialog onPropertyAdded={loadProperties} />
        </div>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kingdom-muted" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-kingdom-dark/50 border-kingdom-primary/20"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading properties...
                    </TableCell>
                  </TableRow>
                ) : filteredProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No properties found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>{property.name}</TableCell>
                      <TableCell className="capitalize">{property.type}</TableCell>
                      <TableCell>{property.address}</TableCell>
                      <TableCell>{property.total_units}</TableCell>
                      <TableCell className="capitalize">{property.status}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ManageProperties;