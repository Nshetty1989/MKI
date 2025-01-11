import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { tenantService } from "@/lib/services/tenant.service";

interface BackgroundStatusDropdownProps {
  tenantId: string;
  currentStatus: string;
  onStatusChange?: (newStatus: string) => void;
}

export function BackgroundStatusDropdown({ 
  tenantId, 
  currentStatus,
  onStatusChange 
}: BackgroundStatusDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: string) => {
    try {
      setIsUpdating(true);
      await tenantService.updateTenant(tenantId, {
        background_check_status: newStatus
      });
      
      onStatusChange?.(newStatus);
      
      toast({
        title: "Status Updated",
        description: "Background check status has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update status",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={handleStatusChange}
      disabled={isUpdating}
    >
      <SelectTrigger className="w-32 bg-kingdom-dark/50 border-kingdom-primary/20">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="passed">Active</SelectItem>
        <SelectItem value="failed">Failed</SelectItem>
      </SelectContent>
    </Select>
  );
}