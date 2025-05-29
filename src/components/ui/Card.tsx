import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ className = '', children }) => {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardProps> = ({ className = '', children }) => {
  return (
    <h3 className={`text-lg font-semibold ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent: React.FC<CardProps> = ({ className = '', children }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className = '',
  children,
}) => {
  return (
    <p className={`text-sm text-slate-500 ${className}`}>
      {children}
    </p>
  );
};

export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};