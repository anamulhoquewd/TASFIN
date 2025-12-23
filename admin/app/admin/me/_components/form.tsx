import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface IAdminProfileForm {
  form: any;
  handleUpdate: any;
  isEditing: boolean;
  isLoading: boolean;
  changeIsEditing: (value: boolean) => void;
}
function AdminProfileForm({
  form,
  handleUpdate,
  isEditing,
  isLoading,
  changeIsEditing,
}: IAdminProfileForm) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <FormField
            control={form.control}
            name={"name"}
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="cursor-pointer">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"email"}
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="cursor-pointer">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Type your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"nid"}
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel className="cursor-pointer">NID Number</FormLabel>
                <FormControl>
                  <Input placeholder="Type your NID number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"phone"}
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="cursor-pointer">Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Type your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder="123 Main Street"
                    {...field}
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New York"
                    {...field}
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="United States"
                    {...field}
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button
                className="cursor-pointer"
                type="button"
                variant="outline"
                onClick={() => changeIsEditing(false)}
              >
                Cancel
              </Button>
              <Button className="cursor-pointer" type="submit">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </>
          ) : (
            <Button
              className="cursor-pointer"
              type="button"
              onClick={() => changeIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default AdminProfileForm;
