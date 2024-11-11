import React, { createContext, useState, useContext } from 'react';

// Create context for shoulder width
const ShoulderWidthContext = createContext<number | null>(null);

// Custom hook to access the context
export const useShoulderWidth = () => {
  return useContext(ShoulderWidthContext);
};

// The ShoulderWidthProvider component should accept children
interface ShoulderWidthProviderProps {
  children: React.ReactNode; // This allows passing any valid JSX as children
}

export const ShoulderWidthProvider: React.FC<ShoulderWidthProviderProps> = ({
  children,
}) => {
  const [shoulderWidth, setShoulderWidth] = useState<number | null>(null);

  return (
    <ShoulderWidthContext.Provider value={shoulderWidth}>
      {children}
    </ShoulderWidthContext.Provider>
  );
};
