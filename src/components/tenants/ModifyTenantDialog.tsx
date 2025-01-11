import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TenantForm } from "./TenantForm";
import { useToast } from "@/hooks/use-toast";
import { tenantService } from "@/lib/services/tenant.service";
import type { Tenant } from "@/types/tenant.types";

interface ModifyTenantDialogProps {
  tenant: Tenant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTenantUpdated: () => void;
}

export function ModifyTenantDialog({
  tenant,
  open,
  onOpenChange,
  onTenantUpdated,
}: ModifyTenantDialogProps) {
  const { toast } = useToast();

  const handleSubmit = async (data: Partial<Tenant>) => {
    try {
      await tenantService.updateTenant(tenant.id, data);
      toast({
        title: "Success",
        description: "Tenant updated successfully",
      });
      onTenantUpdated();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update tenant",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-kingdom-dark/95 border-kingdom-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Modify Tenant
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <TenantForm
            initialData={tenant}
            onSuccess={() => onOpenChange(false)}
            onSubmitTenant={handleSubmit}
            organizationId={tenant.organization_id}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}