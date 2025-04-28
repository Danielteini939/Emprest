import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLoan } from "@/context/LoanContext";

export default function StatusSummary() {
  const { getDashboardMetrics } = useLoan();
  const metrics = getDashboardMetrics();
  
  const totalLoans = 
    metrics.activeLoanCount + 
    metrics.paidLoanCount + 
    metrics.overdueLoanCount + 
    metrics.defaultedLoanCount;
  
  const getPercentage = (count: number) => {
    return totalLoans > 0 ? (count / totalLoans) * 100 : 0;
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Distribuição de Empréstimos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <StatusItem 
            label="Ativos" 
            count={metrics.activeLoanCount} 
            percentage={getPercentage(metrics.activeLoanCount)} 
            color="bg-blue-500" 
          />
          
          <StatusItem 
            label="Pagos" 
            count={metrics.paidLoanCount} 
            percentage={getPercentage(metrics.paidLoanCount)} 
            color="bg-green-500" 
          />
          
          <StatusItem 
            label="Vencidos" 
            count={metrics.overdueLoanCount} 
            percentage={getPercentage(metrics.overdueLoanCount)} 
            color="bg-amber-500" 
          />
          
          <StatusItem 
            label="Inadimplentes" 
            count={metrics.defaultedLoanCount} 
            percentage={getPercentage(metrics.defaultedLoanCount)} 
            color="bg-red-500" 
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface StatusItemProps {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

function StatusItem({ label, count, percentage, color }: StatusItemProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-sm font-medium text-slate-900">{count}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
