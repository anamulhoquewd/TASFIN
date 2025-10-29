"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Mail, MapPin, Phone, Save, Store, Upload } from "lucide-react";
import useSettings from "./_hooks/useSettings";
import { UploadAvatar } from "@/components/upload-avatar";

export default function SettingsPage() {
  const {
    form,
    handleUpdate,
    uploadHandler,
    settings,
    isLoading,
    error,
    setError,
    isAvatarOpen,
    setIsAvatarOpen,
  } = useSettings();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your store settings and preferences.
            </p>
          </div>
          <Button type="submit" disabled={isLoading} className="hidden sm:flex">
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>
                  Basic information about your store.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Logo Upload Section */}
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-2">
                      <AvatarImage />
                      <AvatarFallback className="text-2xl text-primary  font-bold select-none">
                        TASFIN
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAvatarOpen(true)}
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full cursor-pointer dark:bg-foreground-dark dark:hover:bg-foreground-dark/80"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>

                    {/* <UploadAvatar
                      collection={{
                        name: settings?.logo?.alt ?? "TASFIN LOGO",
                        avatar: settings?.logo?.url ?? "",
                      }}
                      error={error}
                      setError={setError}
                      uploadHandler={uploadHandler}
                      isAvatarOpen={isAvatarOpen}
                      setIsAvatarOpen={setIsAvatarOpen}
                    /> */}
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="siteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store Name</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Store className="h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Tasfin Fashion"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="email"
                                  placeholder="example@email.com"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="+8801XXXXXXXXX"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="123 Main Street"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Address (City, State, Zip, Country) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Dhaka" {...field} />
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
                              <Input placeholder="Dhaka Division" {...field} />
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
                              <Input placeholder="1207" {...field} />
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
                              <Input placeholder="Bangladesh" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="siteDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Write a short description about your store..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Mobile Save Button */}
        <div className="flex justify-center sm:hidden">
          <Button type="submit" className="w-full" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
