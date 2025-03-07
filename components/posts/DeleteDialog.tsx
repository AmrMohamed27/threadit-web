"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface Props {
  children: React.ReactNode;
  handleDelete: () => Promise<void>;
  label: string;
}

const DeleteDialog = ({ children, handleDelete, label }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Delete ${label}?`}</AlertDialogTitle>
          <AlertDialogDescription>
            {`Once you delete this ${label}, it can't be restored.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"grey"}>Go Back</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={"red"} onClick={handleDelete}>
              {"Yes, Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
