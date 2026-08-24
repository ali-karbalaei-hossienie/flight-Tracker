import type {
  CustomLayerInterface,
  LayerSpecification,
  SourceSpecification,
} from "mapbox-gl";

export interface LayerType {
  id: string | number;
  name: string;
  image: string;
  tile: string;
}

type AnyLayerSource = {
  source?: LayerSpecification["source"] | SourceSpecification;
};

export type MapboxLayerType =
  | (Omit<LayerSpecification, "source"> & AnyLayerSource)
  | CustomLayerInterface;

export interface ExtraLayer {
  sourceId: string;
  source: SourceSpecification;
  layer: MapboxLayerType;
  id: string | number;
}

export interface MultiMapLayer {
  selectedBaseLayers: LayerType[];
  selectedRightLayers: LayerType[];
  selectedLeftLayers: LayerType[];
  isSplitMode: boolean;
  extraLeftLayers: ExtraLayer[];
  extraRightLayers: ExtraLayer[];
}
