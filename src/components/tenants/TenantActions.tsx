import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/hooks/use-toast";
import { tenantService } from "@/lib/services/tenant.service";
import { ModifyTenantDialog } from "./ModifyTenantDialog";
import type { Tenant } from "@/types/tenant.types";

interface TenantActionsProps {
  tenant: Tenant;
  onTenantUpdated: () => void;
  onTenantDeleted: () => void;
}

export function TenantActions({ 
  tenant, 
  onTenantUpdated,
  onTenantDeleted 
}: TenantActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showModifyDialog, setShowModifyDialog] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await tenantService.deleteTenant(tenant.id);
      toast({
        title: "Tenant Deleted",
        description: "Tenant has been deleted successfully.",
      });
      onTenantDeleted();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete tenant",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-kingdom-dark/50 border-kingdom-primary/20 hover:bg-kingdom-primary/20"
        onClick={() => setShowModifyDialog(true)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="bg-kingdom-dark/50 border-red-500/20 hover:bg-red-500/20 text-red-500"
        onClick={() => setShowDeleteDialog(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <ModifyTenantDialog
        tenant={tenant}
        open={showModifyDialog}
        onOpenChange={setShowModifyDialog}
        onTenantUpdated={onTenantUpdated}
      />

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Tenant"
        description="Are you sure you want to delete this tenant? This action cannot be undone."
      />
    </div>
  );
}