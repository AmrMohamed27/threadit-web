import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateUserImageMutation } from "@/generated/graphql";
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader } from "lucide-react";
import FileUpload from "../common/FileUpload";
import { Button } from "../ui/button";

const UploadProfileImage = () => {
  const [UpdateUserImageMutation, { loading }] = useUpdateUserImageMutation();
  const { toast } = useToast();
  const handleUploadComplete = async (url: string) => {
    const { data } = await UpdateUserImageMutation({
      variables: {
        options: {
          image: url,
        },
      },
      refetchQueries: [
        "GetUserById",
        "GetUserByName",
        "GetAllPosts",
        "GetUserCommunityPosts",
        "GetAllCommunities",
        "GetUserCommunities",
        "Me",
      ],
    });
    if (data?.updateUserImage.errors) {
      for (const error of data.updateUserImage.errors) {
        toast({
          title: "Upload Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="-right-2 bottom-0 absolute bg-muted"
        >
          {loading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <Camera size={20} />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a new profile picture</DialogTitle>
        </DialogHeader>
        <FileUpload onUploadComplete={handleUploadComplete} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadProfileImage;
