import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileType, File } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const validFiles = newFiles.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length !== newFiles.length) {
      toast.error("Some files were not accepted. Please upload only PDF, Excel, or Word documents.");
    }

    setFiles(prev => [...prev, ...validFiles]);
    toast.success(`${validFiles.length} file(s) added successfully`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Documents</h1>
        
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          } transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Drag and drop your files here
          </h3>
          <p className="text-gray-500 mb-4">
            or click to browse from your computer
          </p>
          <Input
            type="file"
            className="hidden"
            id="file-upload"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileInput}
          />
          <Button
            variant="outline"
            className="hover:bg-blue-50"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Browse Files
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Supported formats: PDF, Word, Excel
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Uploaded Files
            </h2>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
                >
                  <FileType className="text-blue-500" />
                  <span className="flex-1 text-gray-700">{file.name}</span>
                  <span className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;