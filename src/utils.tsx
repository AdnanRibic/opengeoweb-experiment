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
 * Copyright 2021 - Koninklijk Nederlands Meteorologisch Instituut (KNMI)
 * Copyright 2021 - Finnish Meteorological Institute (FMI)
 * */

import { Layer } from './types';

let generatedLayerIds = 0;
const generateLayerId = (): string => {
    generatedLayerIds += 1;
    return `layerid_${generatedLayerIds}`;
  };

export interface LayersAndAutoLayerIds {
  layers: Layer[];
  autoTimeStepLayerId?: string;
  autoUpdateLayerId?: string;
}

export const replaceLayerIdsToEnsureUniqueLayerIdsInStore = (
  layerIds: LayersAndAutoLayerIds,
): LayersAndAutoLayerIds => {
  const { layers, autoTimeStepLayerId, autoUpdateLayerId } = layerIds;

  const layerIdIsSameForTimestepAndUpdate =
    autoTimeStepLayerId && autoTimeStepLayerId === autoUpdateLayerId;
  if (layerIdIsSameForTimestepAndUpdate) {
    const newAutoLayerId = generateLayerId();
    return {
      layers: replaceLayerIds(layers, autoTimeStepLayerId!, newAutoLayerId),
      autoTimeStepLayerId: newAutoLayerId,
      autoUpdateLayerId: newAutoLayerId,
    };
  }

  const autoTimeStepLayerIdNew = autoTimeStepLayerId && generateLayerId();

  const autoUpdateLayerIdNew = autoUpdateLayerId && generateLayerId();

  const timestepAndUpdateLayerIdsAreProvided =
    autoTimeStepLayerId && autoUpdateLayerId;

  if (timestepAndUpdateLayerIdsAreProvided) {
    const autoTimeStepLayerIndex = layers.findIndex(
      (layer) => layer.id === autoTimeStepLayerId,
    );

    const autoUpdateLayerIndex = layers.findIndex(
      (layer) => layer.id === autoUpdateLayerId,
    );

    const layersWithNewIds = layers.map((layer, index) => {
      if (layer.id && index === autoTimeStepLayerIndex) {
        return { ...layer, id: autoTimeStepLayerIdNew };
      }
      if (layer.id && index === autoUpdateLayerIndex) {
        return { ...layer, id: autoUpdateLayerIdNew };
      }
      return { ...layer, id: generateLayerId() };
    });
    return {
      layers: layersWithNewIds,
      autoTimeStepLayerId: autoTimeStepLayerIdNew,
      autoUpdateLayerId: autoUpdateLayerIdNew,
    };
  }
  if (autoTimeStepLayerIdNew) {
    return {
      layers: replaceLayerIds(
        layers,
        autoTimeStepLayerId!,
        autoTimeStepLayerIdNew,
      ),
      autoTimeStepLayerId: autoTimeStepLayerIdNew,
    };
  }
  if (autoUpdateLayerIdNew) {
    return {
      layers: replaceLayerIds(layers, autoUpdateLayerId!, autoUpdateLayerIdNew),
      autoUpdateLayerId: autoUpdateLayerIdNew,
    };
  }

  // The code below is executed if neither auto timestep
  // nor auto update layer id was provided
  const layersWithNewIds = layers.map((layer) => {
    return { ...layer, id: generateLayerId() };
  });
  return {
    layers: layersWithNewIds,
  };
};

function replaceLayerIds(
  layers: Layer[],
  autoLayerIdOld: string,
  autoLayerIdNew: string,
): Layer[] {
  const autoLayerIndex = layers.findIndex(
    (layer) => layer.id === autoLayerIdOld,
  );

  const layersWithNewIds = layers.map((layer, index) => {
    if (layer.id && index === autoLayerIndex) {
      return { ...layer, id: autoLayerIdNew };
    }
    return { ...layer, id: generateLayerId() };
  });
  return layersWithNewIds;
}
