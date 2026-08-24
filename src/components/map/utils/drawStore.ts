import type { MapRef } from "react-map-gl/mapbox";
import { Geoman } from "@geoman-io/mapbox-geoman-free";

const store = new WeakMap<MapRef, Geoman>();

export function registerGeoman(map: MapRef, geoman: Geoman) {
  store.set(map, geoman);
}

export function getGeoman(map?: MapRef) {
  if (!map) return;
  return store.get(map);
}

export function unregisterGeoman(map: MapRef) {
  store.delete(map);
}
