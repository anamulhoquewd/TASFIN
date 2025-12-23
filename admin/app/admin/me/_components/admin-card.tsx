import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadAvatar } from "@/components/upload-avatar";
import { IAdmin } from "@/interfaces/users";
import { Camera } from "lucide-react";

interface IUserCard {
  user: IAdmin | null;
  changeAvatarOpen: (value: boolean) => void;
  isOpen: boolean;
  changePasswordOpen: (value: boolean) => void;
  error: string;
  setError: (error: string) => void;
  uploadHandler: any;
}

function UserCard({
  user,
  changeAvatarOpen,
  isOpen,
  changePasswordOpen,
  error,
  setError,
  uploadHandler,
}: IUserCard) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            {/* Avatar section */}
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  className="w-auto h-full object-cover"
                  src={user?.avatar?.url ?? ""}
                  alt={user?.name ?? "TASFIN USER"}
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold select-none">
                  {user
                    ? user.name
                        .split(" ")
                        .map((ch) => ch[0])
                        .join("")
                        .toUpperCase()
                    : "SG"}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="outline"
                onClick={() => changeAvatarOpen(true)}
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full cursor-pointer dark:bg-foreground-dark dark:hover:bg-foreground-dark/80"
              >
                <Camera className="h-4 w-4" />
              </Button>

              <UploadAvatar
                collection={{
                  name: user?.name ?? "TASFIN USER",
                  avatar: user?.avatar?.url ?? "",
                }}
                error={error}
                setError={setError}
                uploadHandler={uploadHandler}
                isAvatarOpen={isOpen}
                setIsAvatarOpen={changeAvatarOpen}
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <h2 className="text-xl font-bold">
                {user?.name || "TASFIN USER"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {user?.email || "example@me.com"}
              </p>
              <Badge className="bg-primary text-primary-foreground px-2 mt-3 rounded-full">
                {user?.role || "user"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={() => changePasswordOpen(true)}
        className="w-full cursor-pointer"
      >
        Change Password
      </Button>
    </div>
  );
}

export default UserCard;
