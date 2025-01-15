import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Validation schema with proper error messages
const tenantSchema = z.object({
  first_name: z.string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[a-zA-Z\s-']+$/, "First name can only contain letters, spaces, hyphens and apostrophes"),
  last_name: z.string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[a-zA-Z\s-']+$/, "Last name can only contain letters, spaces, hyphens and apostrophes"),
  email: z.string()
    .email("Invalid email address")
    .toLowerCase(),
  phone_number: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  status: z.string().default("active"),
  background_check_status: z.string().optional(),
  aadhar_id: z.string()
    .length(12, "Aadhar ID must be exactly 12 digits")
    .regex(/^\d+$/, "Aadhar ID must contain only numbers"),
  permanent_address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  emergency_contact: z.object({
    name: z.string().min(1, "Emergency contact name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    phone: z.string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  }),
  organization_id: z.string()
});

export type TenantFormData = z.infer<typeof tenantSchema>;

interface TenantFormProps {
  initialData?: Partial<TenantFormData>;
  onSuccess?: () => void;
  onSubmitTenant: (data: TenantFormData) => Promise<void>;
  organizationId: string;
}

export function TenantForm({ 
  initialData, 
  onSuccess, 
  onSubmitTenant, 
  organizationId 
}: TenantFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form with default values
  const form = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      email: initialData?.email || "",
      phone_number: initialData?.phone_number || "",
      status: initialData?.status || "active",
      background_check_status: initialData?.background_check_status || "pending",
      aadhar_id: initialData?.aadhar_id || "",
      permanent_address: initialData?.permanent_address || {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India"
      },
      emergency_contact: initialData?.emergency_contact || {
        name: "",
        relationship: "",
        phone: ""
      },
      organization_id: organizationId
    },
  });

  // Debounced submit handler
  const onSubmit = useCallback(async (data: TenantFormData) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmitTenant(data);
      
      toast({
        title: "Success!",
        description: initialData ? "Tenant updated successfully." : "Tenant added successfully.",
      });
      
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save tenant. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, onSubmitTenant, toast, form, onSuccess, initialData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-kingdom-dark/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-kingdom-dark/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className="bg-kingdom-dark/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-kingdom-dark/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aadhar_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhar ID</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-kingdom-dark/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Permanent Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold gradient-text">Permanent Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="permanent_address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-kingdom-dark/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permanent_address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-kingdom-dark/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permanent_address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-kingdom-dark/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permanent_address.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-kingdom-dark/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permanent_address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-kingdom-dark/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold gradient-text">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="emergency_contact.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-kingdom-dark/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergency_contact.relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-kingdom-dark/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergency_contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-kingdom-dark/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess?.()}
            className="border-kingdom-primary/20 text-kingdom-text hover:bg-kingdom-primary/20"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-primary hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}