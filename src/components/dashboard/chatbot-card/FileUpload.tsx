
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface FileUploadProps {
  isUploading: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload = ({ isUploading, onFileUpload }: FileUploadProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#2463EB]">Upload Documents</label>
      <div className="flex items-center gap-2">
        <Input
          type="file"
          className="flex-1"
          onChange={onFileUpload}
          accept=".pdf,.doc,.docx,.txt"
          disabled={isUploading}
        />
        <Button variant="outline" disabled={isUploading}>
          <Upload className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
