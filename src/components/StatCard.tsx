import React from 'react';
type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
};
export function StatCard({
  title,
  value,
  icon,
  color,
  trend
}: StatCardProps) {
  return <div className="bg-white rounded-lg border shadow-sm p-3 flex items-center">
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <div className="text-xl font-bold">{value}</div>
          <span className="text-sm text-gray-500 font-medium">{title}</span>
        </div>
        {trend && <div className="flex items-center mt-1">
            <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
              {trend.isPositive ? '+' : ''}
              {trend.value}
            </span>
            <span className="text-gray-400 text-sm ml-1">vs last month</span>
          </div>}
      </div>
      <div className={`p-2 rounded-full ${color} ml-2`}>{icon}</div>
    </div>;
}