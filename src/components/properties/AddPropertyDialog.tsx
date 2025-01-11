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
import { PropertyForm, PropertyFormData } from "./PropertyForm";
import { DocumentUploadButton } from "./DocumentUploadButton";
import { useAuth } from "@/hooks/use-auth";
import { propertyService } from "@/lib/services/property.service";
import { useToast } from "@/hooks/use-toast";

interface AddPropertyDialogProps {
  onPropertyAdded?: () => void;
}

export const AddPropertyDialog = ({ onPropertyAdded }: AddPropertyDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { organizationId } = useAuth();
  const { toast } = useToast();

  const handlePropertySubmit = async (data: PropertyFormData) => {
    try {
      if (!organizationId) {
        throw new Error("No organization ID found");
      }

      await propertyService.createProperty({
        ...data,
        organization_id: organizationId,
      });

      toast({
        title: "Success",
        description: "Property added successfully",
      });
      
      setOpen(false);
      onPropertyAdded?.();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add property",
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
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-kingdom-dark/95 border-kingdom-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Add New Property
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
          <PropertyForm 
            onSuccess={() => setOpen(false)} 
            onSubmitProperty={handlePropertySubmit}
            organizationId={organizationId || ''}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};