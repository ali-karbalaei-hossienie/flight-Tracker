// src/components/MapControlBox.jsx
import { useControl } from "react-map-gl/mapbox";
import { createPortal } from "react-dom";
import { useRef, useState, useEffect } from "react";

class ControlBoxHandler {
  constructor(
    position: string,
    margin: { top: number; bottom: number; left: number; right: number },
  ) {
    (this as any)._position = position;
    (this as any)._margin = margin;
    (this as any)._container = null;
  }

  onAdd(map: any) {
    (this as any)._map = map;
    (this as any)._container = document.createElement("div");
    (this as any)._container.className = "mapboxgl-ctrl";

    const { top, bottom, left, right } = (this as any)._margin;
    const pos = (this as any)._position;

    const marginStyles: Record<string, string> = {
      "top-left": `margin: ${top}px 0 0 ${left}px;`,
      "top-right": `margin: ${top}px ${right}px 0 0;`,
      "bottom-left": `margin: 0 0 ${bottom}px ${left}px;`,
      "bottom-right": `margin: 0 ${right}px ${bottom}px 0;`,
    };

    (this as any)._container.style.cssText = `
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 0;
      ${marginStyles[pos as string] ?? "margin: 10px;"}
    `;

    return (this as any)._container;
  }

  onRemove() {
    if ((this as any)._container && (this as any)._container.parentNode) {
      (this as any)._container.parentNode.removeChild((this as any)._container);
    }
    (this as any)._map = undefined;
  }

  getDefaultPosition() {
    return (this as any)._position;
  }

  getContainer() {
    return (this as any)._container;
  }
}

// ✅ Import the type and define a strict prop type
import type { ControlPosition } from "react-map-gl/mapbox";

const MapControl = ({
  position = "top-right",
  margin = { top: 10, bottom: 10, left: 10, right: 10 },
  children,
}: {
  position?: ControlPosition;
  margin?: { top: number; bottom: number; left: number; right: number };
  children?: React.ReactNode;
}) => {
  const controlRef = useRef<ControlBoxHandler | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  // ✅ position is now typed as ControlPosition — no more error
  useControl(
    () => {
      if (controlRef.current == null) {
        controlRef.current = new ControlBoxHandler(position, margin);
      }
      return controlRef.current;
    },
    { position },
  );

  useEffect(() => {
    const ctrl = controlRef.current;
    if (ctrl) {
      setContainer(ctrl.getContainer());
    }
  }, [position, margin]);

  if (!container) return null;

  return createPortal(children, container);
};

export default MapControl;
