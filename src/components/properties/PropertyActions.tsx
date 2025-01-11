import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/hooks/use-toast";
import { propertyService } from "@/lib/services/property.service";
import { ModifyPropertyDialog } from "./ModifyPropertyDialog";
import type { Property } from "@/types/property.types";

interface PropertyActionsProps {
  property: Property;
  onPropertyUpdated: () => void;
  onPropertyDeleted: () => void;
}

export function PropertyActions({ 
  property, 
  onPropertyUpdated,
  onPropertyDeleted 
}: PropertyActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showModifyDialog, setShowModifyDialog] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await propertyService.deleteProperty(property.id);
      toast({
        title: "Property Deleted",
        description: "Property has been deleted successfully.",
      });
      onPropertyDeleted();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete property",
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

      <ModifyPropertyDialog
        property={property}
        open={showModifyDialog}
        onOpenChange={setShowModifyDialog}
        onPropertyUpdated={onPropertyUpdated}
      />

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Property"
        description="Are you sure you want to delete this property? This action cannot be undone."
      />
    </div>
  );
}