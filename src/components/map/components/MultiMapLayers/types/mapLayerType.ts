import type {
  CanvasSourceSpecification,
  CustomLayerInterface,
  CustomSourceInterface,
  LayerSpecification,
  SourceSpecification,
} from "mapbox-gl";

type AnyLayerSource = {
  source?: LayerSpecification["source"] | SourceSpecification;
};

export type layerTpe =
  | (Omit<LayerSpecification, "source"> & AnyLayerSource)
  | CustomLayerInterface;
export interface ItemLayer {
  sourceId: string;
  source:
    | SourceSpecification
    | CanvasSourceSpecification
    | CustomSourceInterface<unknown>;
  layer: layerTpe;
}
export interface UseMultiMapLayers {
  extraLeftLayers?: ItemLayer[];
  extraRightLayers?: ItemLayer[];
}
