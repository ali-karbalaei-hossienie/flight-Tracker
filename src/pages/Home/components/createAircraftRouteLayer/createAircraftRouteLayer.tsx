import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";
import type { Layer } from "@deck.gl/core";

import type { Aircraft } from "../../../../services/types";

export const createAircraftRouteLayer = (
  selectedAircraft: Aircraft,
): Layer[] => {
  if (!selectedAircraft?.path?.length) {
    return [];
  }

  // مسیر اصلی: [lat, lon] -> [lon, lat]
  const routeCoordinates: [number, number][] = selectedAircraft.path.map(
    ([lat, lon]) => [lon, lat],
  );

  // -----------------------------------------
  // موقعیت فعلی هواپیما
  // -----------------------------------------

  const currentPosition: [number, number] | null = selectedAircraft
    ? [selectedAircraft.lon, selectedAircraft.lat]
    : null;

  // -----------------------------------------
  // مسیر
  // -----------------------------------------

  const path = currentPosition
    ? [...routeCoordinates, currentPosition]
    : routeCoordinates;

  const routeLayer = new PathLayer({
    id: `aircraft-route-${selectedAircraft.id}`,

    data: [
      {
        path,
      },
    ],

    getPath: (d) => d.path,

    getColor: [147, 51, 234, 230],

    getWidth: 3,
    widthUnits: "pixels",

    capRounded: true,
    jointRounded: true,

    pickable: false,

    updateTriggers: {
      getPath: currentPosition ? [currentPosition[0], currentPosition[1]] : [],
    },
  });

  // -----------------------------------------
  // دو سر مسیر
  // -----------------------------------------

  const startPoint = routeCoordinates[0];

  const endPoint = routeCoordinates[routeCoordinates.length - 1];

  const endpointData = [
    {
      position: startPoint,
      type: "start",
    },
    {
      position: endPoint,
      type: "end",
    },
  ];

  const endpointLayer = new ScatterplotLayer({
    id: `aircraft-route-points-${selectedAircraft.id}`,

    data: endpointData,

    getPosition: (d) => d.position,

    // مبدأ سبز / مقصد قرمز
    getFillColor: (d) =>
      d.type === "start" ? [34, 197, 94, 255] : [239, 68, 68, 255],

    // حاشیه سفید
    getLineColor: [255, 255, 255, 255],

    getRadius: 7,

    radiusUnits: "pixels",

    stroked: true,

    getLineWidth: 2,

    lineWidthUnits: "pixels",

    pickable: false,

    radiusMinPixels: 7,
    radiusMaxPixels: 7,
  });

  return [routeLayer, endpointLayer];
};
