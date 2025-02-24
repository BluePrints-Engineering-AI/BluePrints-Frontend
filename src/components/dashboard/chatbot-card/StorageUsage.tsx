
import { Progress } from "@/components/ui/progress";

interface StorageUsageProps {
  storageUsed: number;
  storageLimit: number;
}

export const StorageUsage = ({ storageUsed, storageLimit }: StorageUsageProps) => {
  return (
    <div className="pt-4">
      <Progress 
        value={(storageUsed || 0) / (storageLimit || 1) * 100} 
        className="h-1.5 bg-[#2463EB]/20 [&>[role=progressbar]]:bg-[#2463EB]"
      />
      <p className="text-xs text-gray-600 mt-1">
        Storage: {storageUsed.toFixed(2)}GB / {storageLimit.toFixed(2)}GB
      </p>
    </div>
  );
};
