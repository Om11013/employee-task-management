import React from "react";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
  isLoading?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  colorClass,
  isLoading,
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 flex items-center p-5 hover:shadow-md transition-shadow">
      <div
        className={`p-3 rounded-full ${colorClass} text-white mr-4 shadow-sm`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <div className="mt-1 flex items-baseline">
          {isLoading ? (
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
};
