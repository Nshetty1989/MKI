import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TenantForm, TenantFormData } from "./TenantForm";
import { DocumentUploadButton } from "./DocumentUploadButton";
import { useAuth } from "@/hooks/use-auth";
import { tenantService } from "@/lib/services/tenant.service";
import { useToast } from "@/hooks/use-toast";

interface AddTenantDialogProps {
  onTenantAdded?: () => void;
}

export const AddTenantDialog = ({ onTenantAdded }: AddTenantDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { organizationId } = useAuth();
  const { toast } = useToast();

  const handleTenantSubmit = async (data: TenantFormData) => {
    try {
      if (!organizationId) {
        throw new Error("No organization ID found");
      }

      await tenantService.createTenant({
        ...data,
        organization_id: organizationId,
      });

      toast({
        title: "Success",
        description: "Tenant added successfully",
      });
      
      setOpen(false);
      onTenantAdded?.();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add tenant",
      });
    }
  };

  const handleDocumentData = (data: any) => {
    // Handle extracted data
    console.log('Extracted data:', data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" /> Add Tenant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-kingdom-dark/95 border-kingdom-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Add New Tenant
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="mb-6">
            <DocumentUploadButton 
              onDataExtracted={handleDocumentData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
          <TenantForm 
            onSuccess={() => setOpen(false)} 
            onSubmitTenant={handleTenantSubmit}
            organizationId={organizationId || ''}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};