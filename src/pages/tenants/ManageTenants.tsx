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
import { Search } from "lucide-react";
import { AddTenantDialog } from "@/components/tenants/AddTenantDialog";
import { BackgroundStatusDropdown } from "@/components/tenants/BackgroundStatusDropdown";
import { TenantActions } from "@/components/tenants/TenantActions";
import { useAuth } from "@/hooks/use-auth";
import { tenantService } from "@/lib/services/tenant.service";
import type { Tenant } from "@/types/tenant.types";

const ManageTenants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { organizationId } = useAuth();

  useEffect(() => {
    loadTenants();
  }, [organizationId]);

  const loadTenants = async () => {
    if (!organizationId) return;
    
    try {
      setIsLoading(true);
      const data = await tenantService.getTenants(organizationId);
      setTenants(data);
    } catch (error) {
      console.error("Failed to load tenants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (tenantId: string, newStatus: string) => {
    setTenants(prevTenants => 
      prevTenants.map(tenant => 
        tenant.id === tenantId 
          ? { ...tenant, background_check_status: newStatus }
          : tenant
      )
    );
  };

  const handleTenantDeleted = () => {
    loadTenants();
  };

  const filteredTenants = tenants.filter(tenant => 
    tenant.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-kingdom-dark min-h-screen pt-16">
      <Navigation />
      <div className="md:ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Tenant Management
            </h1>
            <p className="text-kingdom-text/80">
              Manage and monitor your tenants
            </p>
          </div>
          <AddTenantDialog onTenantAdded={loadTenants} />
        </div>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kingdom-muted" />
              <Input
                placeholder="Search tenants..."
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
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Background Check</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading tenants...
                    </TableCell>
                  </TableRow>
                ) : filteredTenants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No tenants found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell>{`${tenant.first_name} ${tenant.last_name}`}</TableCell>
                      <TableCell>{tenant.email}</TableCell>
                      <TableCell>{tenant.phone_number}</TableCell>
                      <TableCell className="capitalize">{tenant.status}</TableCell>
                      <TableCell>
                        <BackgroundStatusDropdown
                          tenantId={tenant.id}
                          currentStatus={tenant.background_check_status || 'pending'}
                          onStatusChange={(newStatus) => handleStatusChange(tenant.id, newStatus)}
                        />
                      </TableCell>
                      <TableCell>
                        <TenantActions
                          tenant={tenant}
                          onTenantUpdated={loadTenants}
                          onTenantDeleted={handleTenantDeleted}
                        />
                      </TableCell>
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

export default ManageTenants;