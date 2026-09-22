import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
  onClick
}) => {
  const baseStyles = "bg-white border border-slate-100 rounded-2xl p-6 transition-all duration-300";
  const hoverStyles = hoverEffect 
    ? "hover:shadow-lg hover:shadow-slate-100 hover:border-slate-200 hover:-translate-y-0.5 cursor-pointer" 
    : "";
  const clickStyles = onClick ? "cursor-pointer" : "";

  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${clickStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
