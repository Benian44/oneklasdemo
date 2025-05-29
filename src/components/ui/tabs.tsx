import React from 'react';

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className = '', children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={`tabs ${className}`} data-active-tab={activeTab}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            activeTab,
            setActiveTab,
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ className = '', children }) => {
  return (
    <div className={`tabs-list ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps & { activeTab?: string; setActiveTab?: (value: string) => void }> = ({
  value,
  className = '',
  children,
  activeTab,
  setActiveTab
}) => {
  return (
    <button
      className={`tabs-trigger ${activeTab === value ? 'active' : ''} ${className}`}
      onClick={() => setActiveTab?.(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps & { activeTab?: string }> = ({
  value,
  className = '',
  children,
  activeTab
}) => {
  if (activeTab !== value) return null;
  
  return (
    <div className={`tabs-content ${className}`}>
      {children}
    </div>
  );
}; 