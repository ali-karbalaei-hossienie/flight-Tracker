import { useContext } from "react";
import { RoutContext } from "../../context/RoutContext";

export const useRout = () => {
  const context = useContext(RoutContext);
  if (!context) {
    throw new Error("useFlightUI must be used within a FlightUIProvider");
  }
  return context;
};
