import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PropertyFormData } from "../PropertyForm";
import { Checkbox } from "@/components/ui/checkbox";

const amenitiesList = [
  { id: "parking", label: "Parking" },
  { id: "elevator", label: "Elevator" },
  { id: "security", label: "Security System" },
  { id: "gym", label: "Fitness Center" },
  { id: "pool", label: "Swimming Pool" },
  { id: "storage", label: "Storage Units" },
  { id: "laundry", label: "Laundry Facilities" },
  { id: "wifi", label: "WiFi" },
];

interface PropertyAmenitiesFieldProps {
  control: Control<PropertyFormData>;
}

export function PropertyAmenitiesField({ control }: PropertyAmenitiesFieldProps) {
  return (
    <FormField
      control={control}
      name="amenities"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amenities</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenitiesList.map((amenity) => (
              <FormItem key={amenity.id} className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value[amenity.id] || false}
                    onCheckedChange={(checked) => {
                      field.onChange({
                        ...field.value,
                        [amenity.id]: checked,
                      });
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {amenity.label}
                </FormLabel>
              </FormItem>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}