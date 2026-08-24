import type {
  CustomLayerInterface,
  LayerSpecification,
  Map as MapboxMap,
} from "mapbox-gl";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useSelector } from "react-redux";
import type { layerTpe } from "../types/mapLayerType";
import type { RootState } from "../../../../../app/store";

const BASE_SOURCE_LEFT_ID = "base-source-left";
const BASE_SOURCE_RIGHT_ID = "base-source-right";
const BASE_LAYER_LEFT_ID = "base-layer-left";
const BASE_LAYER_RIGHT_ID = "base-layer-right";
const BASE_SOURCE_ID = "base-source";
const BASE_LAYER_ID = "base-layer";

const LEFT_SCISSOR_LAYER_ID = "left-scissor";
const RIGHT_SCISSOR_LAYER_ID = "right-scissor";
const DISABLE_SCISSOR_LAYER_ID = "disable-scissor";

const GEOMAN_REFERENCE_LAYER = "gm_main-polygon__fill-layer-0";

type ScissorLayer = CustomLayerInterface & {
  map?: MapboxMap;
};

interface UseMultiMapLayersReturn {
  swipeRef: RefObject<HTMLDivElement | null>;
  isSplitMode: boolean;
  startDragging: () => void;
  swipeRatio: RefObject<number>;
}

export const useMultiMapLayers = (): UseMultiMapLayersReturn => {
  const {
    selectedBaseLayers,
    selectedLeftLayers,
    selectedRightLayers,
    isSplitMode,
    extraLeftLayers,
    extraRightLayers,
  } = useSelector((state: RootState) => state.multiMapLayer);

  const { current: map } = useMap();
  const swipeRef = useRef<HTMLDivElement | null>(null);
  const swipeRatio = useRef(0.5);
  const isDraggingRef = useRef(false);

  const removeLayerIfExists = useCallback((mapBox: MapboxMap, id: string) => {
    if (mapBox.getLayer(id)) {
      mapBox.removeLayer(id);
    }
  }, []);

  const removeSourceIfExists = useCallback((mapBox: MapboxMap, id: string) => {
    if (mapBox.getSource(id)) {
      mapBox.removeSource(id);
    }
  }, []);

  const cleanupSplitModeLayers = useCallback(
    (mapBox: MapboxMap) => {
      removeLayerIfExists(mapBox, LEFT_SCISSOR_LAYER_ID);
      removeLayerIfExists(mapBox, RIGHT_SCISSOR_LAYER_ID);
      removeLayerIfExists(mapBox, DISABLE_SCISSOR_LAYER_ID);
      removeLayerIfExists(mapBox, BASE_LAYER_LEFT_ID);
      removeLayerIfExists(mapBox, BASE_LAYER_RIGHT_ID);
      removeSourceIfExists(mapBox, BASE_SOURCE_LEFT_ID);
      removeSourceIfExists(mapBox, BASE_SOURCE_RIGHT_ID);
    },
    [removeLayerIfExists, removeSourceIfExists],
  );

  const cleanupBaseLayer = useCallback(
    (mapBox: MapboxMap) => {
      removeLayerIfExists(mapBox, BASE_LAYER_ID);
      removeSourceIfExists(mapBox, BASE_SOURCE_ID);
    },
    [removeLayerIfExists, removeSourceIfExists],
  );

  const safeAddLayer = useCallback((mapBox: MapboxMap, layer: layerTpe) => {
    if (mapBox.getLayer(layer.id)) return;
    if (mapBox.getLayer(GEOMAN_REFERENCE_LAYER)) {
      mapBox.addLayer(layer as LayerSpecification, GEOMAN_REFERENCE_LAYER);
    } else {
      mapBox.addLayer(layer as LayerSpecification);
    }
  }, []);

  const ensureBaseLayer = useCallback(
    (mapBox: MapboxMap, tile: string) => {
      if (!tile) {
        removeLayerIfExists(mapBox, BASE_LAYER_ID);
        return;
      }

      const existingSource = mapBox.getSource(BASE_SOURCE_ID);
      if (existingSource && "setTiles" in existingSource) {
        existingSource.setTiles([tile]);
      } else if (!existingSource) {
        mapBox.addSource(BASE_SOURCE_ID, {
          type: "raster",
          tiles: [tile],
          tileSize: 256,
        });
      }

      if (!mapBox.getLayer(BASE_LAYER_ID)) {
        safeAddLayer(mapBox, {
          id: BASE_LAYER_ID,
          type: "raster",
          source: BASE_SOURCE_ID,
          paint: {
            "raster-fade-duration": 0,
          },
        } satisfies LayerSpecification);
      }
    },
    [safeAddLayer, removeLayerIfExists],
  );

  const getSwipePosition = useCallback((mapBox: MapboxMap) => {
    const canvas = mapBox.getCanvas();
    return canvas.width * swipeRatio.current;
  }, []);

  const setupSplitModeLayers = useCallback(
    (mapBox: MapboxMap) => {
      cleanupBaseLayer(mapBox);

      const leftTile = selectedLeftLayers[0]?.tile ?? "";
      const rightTile = selectedRightLayers[0]?.tile ?? "";

      // --- 1. Manage and Create Sources ---
      if (leftTile) {
        const leftSource = mapBox.getSource(BASE_SOURCE_LEFT_ID);
        if (leftSource && "setTiles" in leftSource) {
          leftSource.setTiles([leftTile]);
        } else if (!leftSource) {
          mapBox.addSource(BASE_SOURCE_LEFT_ID, {
            type: "raster",
            tiles: [leftTile],
            tileSize: 256,
          });
        }
      }

      if (rightTile) {
        const rightSource = mapBox.getSource(BASE_SOURCE_RIGHT_ID);
        if (rightSource && "setTiles" in rightSource) {
          rightSource.setTiles([rightTile]);
        } else if (!rightSource) {
          mapBox.addSource(BASE_SOURCE_RIGHT_ID, {
            type: "raster",
            tiles: [rightTile],
            tileSize: 256,
          });
        }
      }

      extraLeftLayers.forEach((item) => {
        if (!mapBox.getSource(item.sourceId))
          mapBox.addSource(item.sourceId, structuredClone(item.source));
      });
      extraRightLayers.forEach((item) => {
        if (!mapBox.getSource(item.sourceId))
          mapBox.addSource(item.sourceId, structuredClone(item.source));
      });

      // --- 2. Define Scissor Layers ---
      const leftScissorLayer: ScissorLayer = {
        id: LEFT_SCISSOR_LAYER_ID,
        type: "custom",
        renderingMode: "2d",
        onAdd(mapObj) {
          this.map = mapObj;
        },
        render(gl) {
          const canvas = this.map?.getCanvas();
          if (!canvas) return;
          gl.enable(gl.SCISSOR_TEST);
          gl.scissor(0, 0, getSwipePosition(mapBox), canvas.height);
        },
      };

      const rightScissorLayer: ScissorLayer = {
        id: RIGHT_SCISSOR_LAYER_ID,
        type: "custom",
        renderingMode: "2d",
        onAdd(mapObj) {
          this.map = mapObj;
        },
        render(gl) {
          const canvas = this.map?.getCanvas();
          if (!canvas) return;
          const position = getSwipePosition(mapBox);
          gl.enable(gl.SCISSOR_TEST);
          gl.scissor(position, 0, canvas.width - position, canvas.height);
        },
      };

      const disableScissorLayer: ScissorLayer = {
        id: DISABLE_SCISSOR_LAYER_ID,
        type: "custom",
        renderingMode: "2d",
        render(gl) {
          gl.disable(gl.SCISSOR_TEST);
        },
      };

      // --- 3. Add Layers (Order of addition doesn't matter here as we will sort them later) ---
      safeAddLayer(mapBox, leftScissorLayer);

      // Prevent crash: Add the layer only if the tile exists
      if (leftTile) {
        safeAddLayer(mapBox, {
          id: BASE_LAYER_LEFT_ID,
          type: "raster",
          source: BASE_SOURCE_LEFT_ID,
        } satisfies LayerSpecification);
      } else {
        removeLayerIfExists(mapBox, BASE_LAYER_LEFT_ID);
      }
      extraLeftLayers.forEach((item) =>
        safeAddLayer(mapBox, structuredClone(item.layer)),
      );

      safeAddLayer(mapBox, rightScissorLayer);
      if (rightTile) {
        safeAddLayer(mapBox, {
          id: BASE_LAYER_RIGHT_ID,
          type: "raster",
          source: BASE_SOURCE_RIGHT_ID,
        } satisfies LayerSpecification);
      } else {
        removeLayerIfExists(mapBox, BASE_LAYER_RIGHT_ID);
      }
      extraRightLayers.forEach((item) =>
        safeAddLayer(mapBox, structuredClone(item.layer)),
      );

      safeAddLayer(mapBox, disableScissorLayer);

      // --- 4. Magic Operation: Apply precise Z-INDEX ---
      // This array specifies the correct layer order from Bottom to Top
      const orderedLayerIds = [
        LEFT_SCISSOR_LAYER_ID,
        BASE_LAYER_LEFT_ID,
        ...extraLeftLayers.map((item) => item.layer.id),
        RIGHT_SCISSOR_LAYER_ID,
        BASE_LAYER_RIGHT_ID,
        ...extraRightLayers.map((item) => item.layer.id),
        DISABLE_SCISSOR_LAYER_ID,
      ];

      // // Geoman must always be the topmost layer
      let beforeId = mapBox.getLayer(GEOMAN_REFERENCE_LAYER)
        ? GEOMAN_REFERENCE_LAYER
        : undefined;

      // Using a reverse loop, we stack the layers exactly one under the other
      for (let i = orderedLayerIds.length - 1; i >= 0; i--) {
        const layerId = orderedLayerIds[i];
        if (mapBox.getLayer(layerId)) {
          if (beforeId) {
            mapBox.moveLayer(layerId, beforeId);
          } else {
            mapBox.moveLayer(layerId);
          }
          beforeId = layerId;
        }
      }
      mapBox.triggerRepaint();
    },
    [
      cleanupBaseLayer,
      getSwipePosition,
      selectedLeftLayers,
      selectedRightLayers,
      safeAddLayer,
      removeLayerIfExists,
      extraLeftLayers,
      extraRightLayers,
    ],
  );

  useEffect(() => {
    if (!map) return;
    const mapBox = map.getMap();

    const updateMapLayers = () => {
      if (!mapBox.getStyle()) return;

      if (isSplitMode) {
        setupSplitModeLayers(mapBox);
      } else {
        cleanupSplitModeLayers(mapBox);
        ensureBaseLayer(mapBox, selectedBaseLayers[0]?.tile ?? "");
      }
    };

    if (mapBox.isStyleLoaded()) {
      updateMapLayers();
    } else {
      mapBox.once("style.load", updateMapLayers);
    }

    return () => {
      mapBox.off("style.load", updateMapLayers);
    };
  }, [
    map,
    isSplitMode,
    selectedBaseLayers,
    selectedLeftLayers,
    selectedRightLayers,
    extraRightLayers,
    extraLeftLayers,
    cleanupBaseLayer,
    cleanupSplitModeLayers,
    ensureBaseLayer,
    setupSplitModeLayers,
  ]);

  const startDragging = useCallback(() => {
    isDraggingRef.current = true;
  }, []);

  const stopDragging = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    if (!map || !isSplitMode) return;

    const mapBox = map.getMap();

    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;

      const clientX =
        "touches" in event ? event.touches[0]?.clientX : event.clientX;
      if (clientX === undefined) return;

      const rect = mapBox.getContainer().getBoundingClientRect();

      const position = Math.max(0, Math.min(rect.width, clientX - rect.left));

      swipeRatio.current = position / rect.width;

      if (swipeRef.current) {
        swipeRef.current.style.left = `${position}px`;
      }

      mapBox.triggerRepaint();
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchmove", handleMove, { passive: true });
    document.addEventListener("touchend", stopDragging);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [map, isSplitMode, stopDragging]);
  // useEffect(() => {
  //   if (!map) return;

  //   const container = map.getMap().getContainer();
  //   if (!container) return;

  //   const resizeObserver = new ResizeObserver(() => {
  //     // 1. به مپ‌باکس می‌گوید سایز کانتینر عوض شده است
  //     map.resize();

  //     // 2. وب‌جی‌ال (WebGL) را مجبور می‌کند تا Scissor Test را با ابعاد جدید دوباره محاسبه و رسم کند
  //     map.triggerRepaint();
  //   });

  //   resizeObserver.observe(container);

  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, [map]);

  return { swipeRef, isSplitMode, startDragging, swipeRatio };
};
