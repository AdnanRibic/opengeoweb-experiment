/* *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2020 - Koninklijk Nederlands Meteorologisch Instituut (KNMI)
 * Copyright 2020 - Finnish Meteorological Institute (FMI)
 * */

import * as React from 'react';
import { useDispatch } from 'react-redux';

import { overLayer, baseLayerGrey } from './publicLayers';
import {
  Layer,
  Bbox,
  DeleteLayerPayload,
  SetLayerDimensionPayload,
  SetLayerEnabledPayload,
  SetLayerStylePayload,
  SetLayerNamePayload,
  SetLayerOpacityPayload,
} from './types';
import { replaceLayerIdsToEnsureUniqueLayerIdsInStore } from './utils';
import { generateLayerId, layerActions, mapActions } from "@opengeoweb/core";

export const initialBbox = {
  srs: 'EPSG:3857',
  bbox: {
    left: -450651.2255879827,
    bottom: 6490531.093143953,
    right: 1428345.8183648037,
    top: 7438773.776232235,
  },
};

export const handleLayerActionsCallback = (
  payload:
    | DeleteLayerPayload
    | SetLayerDimensionPayload
    | SetLayerEnabledPayload
    | SetLayerStylePayload
    | SetLayerNamePayload
    | SetLayerOpacityPayload,
): LayerActions => {
  // eslint-disable-next-line no-console
  console.log('handleLayerActionsCallback', JSON.stringify(payload));
  return null!;
};

interface UseDefaultMapSettingsProps {
  mapId?: string;
  layers?: Layer[];
  baseLayers?: Layer[];
  bbox?: Bbox;
  srs?: string;
  shouldAutoUpdate?: boolean;
}

export const useDefaultMapSettings = (
  props: UseDefaultMapSettingsProps = {},
): void => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const { mapId = 'test-map-1' } = props;
    const {
      layers = [],
      baseLayers = [
        { ...baseLayerGrey, id: `layer-grey-${mapId}` },
        { ...overLayer, id: `overlayer-${mapId}` },
      ],
      bbox = initialBbox.bbox,
      srs = initialBbox.srs,
      shouldAutoUpdate = false,
    } = props;
    // make sure all layers have a unique id before going forward
    const { layers: layersNewIds } =
      replaceLayerIdsToEnsureUniqueLayerIdsInStore({
        layers,
      });
    // set layers
    dispatch(
      layerActions.setLayers({
        mapId,
        layers: layersNewIds,
      }),
    );
    // set active layer if given otherwise to first layer
    // MISSING!
    // const autoLayerId = layersNewIds[0]?.id;
    // dispatch(
    //   mapActions.setAutoLayerId({
    //     mapId,
    //     autoTimeStepLayerId: autoLayerId,
    //     autoUpdateLayerId: autoLayerId,
    //   }),
    // );
    //  baseLayers
    dispatch(
      layerActions.setBaseLayers({
        mapId,
        layers: baseLayers,
      }),
    );
    // bbox
    dispatch(
      mapActions.setBbox({
        bbox,
        srs,
        mapId,
      }),
    );
    // auto update
    dispatch(mapActions.toggleAutoUpdate({ mapId, shouldAutoUpdate }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
