/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from "react";
import { useMap } from "react-map-gl/mapbox";
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
  const { map } = useMap();

  const toggleRoute = () => {
    setIsRouteActive((prev) => !prev);
    map?.flyTo({ zoom: 5 });
  };

  return (
    <RoutContext.Provider value={{ isRouteActive, toggleRoute }}>
      {children}
    </RoutContext.Provider>
  );
};
