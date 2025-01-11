import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PropertyForm } from "./PropertyForm";
import { useToast } from "@/hooks/use-toast";
import { propertyService } from "@/lib/services/property.service";
import type { Property } from "@/types/property.types";

interface ModifyPropertyDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPropertyUpdated: () => void;
}

export function ModifyPropertyDialog({
  property,
  open,
  onOpenChange,
  onPropertyUpdated,
}: ModifyPropertyDialogProps) {
  const { toast } = useToast();

  const handleSubmit = async (data: Partial<Property>) => {
    try {
      await propertyService.updateProperty(property.id, data);
      toast({
        title: "Success",
        description: "Property updated successfully",
      });
      onPropertyUpdated();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update property",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-kingdom-dark/95 border-kingdom-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Modify Property
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <PropertyForm
            initialData={property}
            onSuccess={() => onOpenChange(false)}
            onSubmitProperty={handleSubmit}
            organizationId={property.organization_id}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}