import React from "react";

interface BaseCardProps {
  children: React.ReactNode;
  className: string;
}

const BaseCard = ({ children, className = "" }: BaseCardProps) => {
  return (
    <div>
      <div
        className={`bg-slate-50 dark:bg-gray-800 w-full max-w-sm min-h-[120px] flex flex-col justify-between p-5 box-border rounded-xl shadow-xl space-y-3 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default BaseCard;
