import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

interface MetricCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  change?: {
    value: number | string;
    isPositive: boolean;
    label: string;
  };
  isCurrency?: boolean;
}

export default function MetricCard({
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
  change,
  isCurrency = true,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-semibold text-slate-900">
              {isCurrency ? formatCurrency(value) : value}
            </h3>
          </div>
          <div
            className={`h-10 w-10 rounded-full ${iconBgColor} flex items-center justify-center ${iconColor}`}
          >
            {icon}
          </div>
        </div>
        {change && (
          <div className="mt-2 flex items-center">
            <span
              className={`text-xs font-medium flex items-center ${
                change.isPositive ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              {change.isPositive ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {change.value} {change.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
