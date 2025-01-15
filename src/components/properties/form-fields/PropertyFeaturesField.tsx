import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PropertyFormData } from "../PropertyForm";
import { Checkbox } from "@/components/ui/checkbox";

const featuresList = [
  { id: "smart_locks", label: "Smart Locks" },
  { id: "hvac", label: "HVAC System" },
  { id: "utilities", label: "Utilities Included" },
  { id: "furnished", label: "Furnished" },
  { id: "pet_friendly", label: "Pet Friendly" },
  { id: "high_speed_internet", label: "High-Speed Internet" },
  { id: "smart_thermostat", label: "Smart Thermostat" },
  { id: "energy_efficient", label: "Energy Efficient" },
];

interface PropertyFeaturesFieldProps {
  control: Control<PropertyFormData>;
}

export function PropertyFeaturesField({ control }: PropertyFeaturesFieldProps) {
  return (
    <FormField
      control={control}
      name="features"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Features</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuresList.map((feature) => (
              <FormItem key={feature.id} className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value[feature.id] || false}
                    onCheckedChange={(checked) => {
                      field.onChange({
                        ...field.value,
                        [feature.id]: checked,
                      });
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {feature.label}
                </FormLabel>
              </FormItem>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}