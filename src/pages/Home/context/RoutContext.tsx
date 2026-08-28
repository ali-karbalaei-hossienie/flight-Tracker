/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from "react";
interface RoutContextType {
  isRouteActive: boolean;
  toggleRoute: () => void;
}
export const RoutContext = createContext<RoutContextType | undefined>(
  undefined,
);

export const RoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isRouteActive, setIsRouteActive] = useState(false);

  const toggleRoute = () => {
    setIsRouteActive((prev) => !prev);
  };

  return (
    <RoutContext.Provider value={{ isRouteActive, toggleRoute }}>
      {children}
    </RoutContext.Provider>
  );
};
