import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AppRole = 'customer' | 'admin' | 'merchant' | 'rider';
export type ViewportMode = 'mobile-frame' | 'responsive';

interface RoleContextType {
  role: AppRole;
  setRole: (role: AppRole) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  deviceWidth: '360px' | '390px' | '414px';
  setDeviceWidth: (w: '360px' | '390px' | '414px') => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<AppRole>('customer');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('mobile-frame');
  const [deviceWidth, setDeviceWidth] = useState<'360px' | '390px' | '414px'>('390px');

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        viewportMode,
        setViewportMode,
        deviceWidth,
        setDeviceWidth
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within RoleProvider');
  return context;
};
