import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  onClick?: () => void;
  isActive?: boolean;
};
export function StatCard({
  title,
  value,
  icon,
  color,
  trend,
  onClick,
  isActive = false
}: StatCardProps) {
  return <div className={`bg-white rounded-lg border shadow-sm p-3 flex items-center ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${isActive ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`} onClick={onClick}>
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
        {onClick && <div className="text-xs text-blue-500 mt-1 flex items-center">
            <span>Filtrer</span>
            <ChevronRightIcon size={12} className="ml-1" />
          </div>}
      </div>
      <div className={`p-2 rounded-full ${color} ml-2`}>{icon}</div>
    </div>;
}