import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function ProductDetails({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="details[fabric]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fabric</FormLabel>
                <FormControl>
                  <Input placeholder="Cotton, Polyester, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details[valueAddition]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value Addition</FormLabel>
                <FormControl>
                  <Input placeholder="Special features" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details[cutFit]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cut & Fit</FormLabel>
                <FormControl>
                  <Input placeholder="Slim, Regular, Loose" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details[collarNeck]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collar/Neck</FormLabel>
                <FormControl>
                  <Input placeholder="Round neck, V-neck, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details[sleeve]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sleeve</FormLabel>
                <FormControl>
                  <Input placeholder="Short, Long, 3/4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details[length]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length</FormLabel>
                <FormControl>
                  <Input placeholder="Short, Medium, Long" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details[washCare]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wash Care</FormLabel>
                <FormControl>
                  <Input placeholder="Machine wash, Hand wash" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details[sideCut]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Side Cut</FormLabel>
                <FormControl>
                  <Input placeholder="Side cut details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductDetails;
