import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PropertyAmenitiesField } from "./form-fields/PropertyAmenitiesField";
import { PropertyFeaturesField } from "./form-fields/PropertyFeaturesField";

const propertySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().min(1, "Please select a property type"),
  status: z.string().default("active"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip_code: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters").default("US"),
  total_units: z.number().min(1, "Number of units is required"),
  amenities: z.record(z.any()).default({}),
  features: z.record(z.any()).default({}),
  description: z.string().optional(),
  organization_id: z.string()
});

export type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  onSuccess?: () => void;
  onSubmitProperty: (data: PropertyFormData) => void;
  organizationId: string;
}

const propertyTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "mixed", label: "Mixed Use" }
];

const propertyStatuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "maintenance", label: "Under Maintenance" },
  { value: "development", label: "Under Development" }
];

export const PropertyForm = ({ onSuccess, onSubmitProperty, organizationId }: PropertyFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      type: "",
      status: "active",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "US",
      total_units: 1,
      amenities: {},
      features: {},
      description: "",
      organization_id: organizationId
    },
  });

  const onSubmit = async (data: PropertyFormData) => {
    setIsLoading(true);
    try {
      await onSubmitProperty(data);
      toast({
        title: "Success!",
        description: "Property has been added successfully.",
      });
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add property. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-kingdom-text">Property Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter property name" 
                    {...field}
                    className="bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Property Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-kingdom-text">Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Property Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-kingdom-text">Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyStatuses.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Units */}
          <FormField
            control={form.control}
            name="total_units"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-kingdom-text">Total Units</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter number of units" 
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value))}
                    className="bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-kingdom-text">Address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter street address" 
                    {...field}
                    className="bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-kingdom-text">City</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter city" 
                    {...field}
                    className="bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-kingdom-text">State</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter state" 
                    {...field}
                    className="bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ZIP Code */}
          <FormField
            control={form.control}
            name="zip_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-kingdom-text">ZIP Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter ZIP code" 
                    {...field}
                    className="bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-kingdom-text">Country</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter country" 
                    {...field}
                    className="bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Amenities */}
        <PropertyAmenitiesField control={form.control} />

        {/* Features */}
        <PropertyFeaturesField control={form.control} />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-kingdom-text">Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter property description" 
                  className="min-h-[100px] bg-kingdom-dark/50 border-kingdom-primary/20 text-kingdom-text" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess?.()}
            className="border-kingdom-primary/20 text-kingdom-text hover:bg-kingdom-primary/20"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-primary hover:opacity-90"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};