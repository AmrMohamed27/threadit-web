import { Pencil as EditIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditUsernameForm from "../forms/EditUsernameForm";

const EditUsernameDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="flex items-center gap-2"
        >
          <EditIcon className="w-5 lg:w-6 h-5 lg:h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
        </DialogHeader>
        <EditUsernameForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditUsernameDialog;
