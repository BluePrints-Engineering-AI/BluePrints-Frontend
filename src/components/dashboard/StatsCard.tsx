
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  className?: string;
}

export const StatsCard = ({ title, value, Icon, className = "" }: StatsCardProps) => {
  return (
    <Card className={`bg-card shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:shadow-xl transition-shadow animate-fade-up ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#2463EB]">{title}</CardTitle>
        <Icon className="h-4 w-4 text-[#2463EB]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#2463EB]">{value}</div>
      </CardContent>
    </Card>
  );
};
