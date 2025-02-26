
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Edit2, Check, X, Trash2 } from "lucide-react";
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

interface ChatBotHeaderProps {
  name: string;
  isEditing: boolean;
  newName: string;
  onEdit: () => void;
  onUpdate: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onNameChange: (name: string) => void;
}

export const ChatBotHeader = ({
  name,
  isEditing,
  newName,
  onEdit,
  onUpdate,
  onCancel,
  onDelete,
  onNameChange,
}: ChatBotHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="flex items-center gap-2">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={newName}
              onChange={(e) => onNameChange(e.target.value)}
              className="h-8"
              autoFocus
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={onUpdate}
              className="h-8 w-8 p-0"
            >
              <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onCancel}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <>
            <CardTitle className="text-xl font-medium text-[#2463EB]">
              {name}
            </CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="h-4 w-4 text-gray-400 hover:text-[#2463EB]" />
            </Button>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-[#2463EB]" />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Chatbot</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-red-500 hover:bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </CardHeader>
  );
};
