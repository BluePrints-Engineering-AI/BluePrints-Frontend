
import { FileText } from "lucide-react";

interface Document {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
}

interface DocumentsListProps {
  documents?: Document[];
}

export const DocumentsList = ({ documents }: DocumentsListProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-[#2463EB]">Stored Documents</h4>
      <div className="space-y-1">
        {documents?.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between text-sm p-2 bg-[#2463EB]/5 rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2463EB]" />
              <span className="text-[#2463EB]">{doc.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{doc.size.toFixed(2)}MB</span>
              <span className="text-gray-600 text-xs">
                {new Date(doc.uploadedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {(!documents || documents.length === 0) && (
          <div className="text-sm text-gray-500 italic">
            No documents uploaded yet
          </div>
        )}
      </div>
    </div>
  );
};
