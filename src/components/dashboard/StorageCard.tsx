
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database } from "lucide-react";

interface StorageCardProps {
  storagePercentage: number;
  totalStorageUsed: number;
  totalStorageLimit: number;
}

export const StorageCard = ({ storagePercentage, totalStorageUsed, totalStorageLimit }: StorageCardProps) => {
  return (
    <Card className="mb-8 bg-card shadow-[0_0_40px_rgba(59,130,246,0.15)] animate-fade-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-[#2463EB]">Storage Usage</CardTitle>
        <Database className="h-4 w-4 text-[#2463EB]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={storagePercentage} className="h-2 bg-[#2463EB]/20 [&>[role=progressbar]]:bg-[#2463EB]" />
          <p className="text-sm text-gray-600">
            {totalStorageUsed.toFixed(1)}GB / {totalStorageLimit}GB used
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
