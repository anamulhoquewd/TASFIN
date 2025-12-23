"use client";

import useMe from "@/hooks/auth/useMe";

import ChangePassword from "@/components/change-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAvatar from "@/hooks/auth/useAvatar";
import UserCard from "./_components/admin-card";
import AdminProfileForm from "./_components/form";

function Me() {
  const {
    form,
    handleUpdate,
    isLoading,
    passwordOpen,
    setPasswordOpen,
    isEditing,
    setIsEditing,
    user,
  } = useMe();

  const { uploadHandler, error, setError, isAvatarOpen, setIsAvatarOpen } =
    useAvatar();

  return (
    <div className="">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Stay in Control of Your Profile</h1>
        <p className="text-gray-500 text-sm mb-8">
          Manage your Personal information.
        </p>
        <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:gap-10">
          <UserCard
            error={error}
            setError={setError}
            uploadHandler={uploadHandler}
            isOpen={isAvatarOpen}
            changeAvatarOpen={setIsAvatarOpen}
            changePasswordOpen={setPasswordOpen}
            user={user}
          />

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Keep your profile information up to date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminProfileForm
                isLoading={isLoading}
                changeIsEditing={setIsEditing}
                handleUpdate={handleUpdate}
                isEditing={isEditing}
                form={form}
              />
            </CardContent>
          </Card>

          {/* change password modal */}
          <ChangePassword
            isOpen={passwordOpen}
            onClose={() => setPasswordOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Me;
