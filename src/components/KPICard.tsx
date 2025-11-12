import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend?: "up" | "down";
}

export function KPICard({ title, value, change, icon, trend = "up" }: KPICardProps) {
  const isPositive = trend === "up" ? change >= 0 : change <= 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-foreground">{value}</h3>
          <div className="flex items-center mt-2 gap-1">
            {isPositive ? (
              <ArrowUp className="w-4 h-4 text-success" />
            ) : (
              <ArrowDown className="w-4 h-4 text-destructive" />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}
            >
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-muted-foreground">vs last period</span>
          </div>
        </div>
        <div className="text-primary opacity-20">{icon}</div>
      </div>
    </Card>
  );
}
