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

import { Action } from '@reduxjs/toolkit';
// import { FeatureCollection } from 'geojson';
import { CustomDate } from '@opengeoweb/webmap';
import type { Dimension, UpdateAllMapDimensionsPayload } from './map/types';

import type { SetLayersForServicePayload } from './service/types';

export enum SyncGroupActionOrigin {
  delete = 'ORIGIN_GENERIC_SYNCHRONIZATIONGROUP_UTILS_DELETEACTION',
  layerActions = 'ORIGIN_GENERIC_SYNCHRONIZATIONGROUP_UTILS_LAYERACTIONS',
  move = 'ORIGIN_GENERIC_SYNCHRONIZATIONGROUP_UTILS_MOVEACTION',
  add = 'ORIGIN_GENERIC_SYNCHRONIZATIONGROUP_UTILS_ADDACTION',
  activateLayerId = 'ORIGIN_GENERIC_SYNCHRONIZATIONGROUP_UTILS_ACTIVELAYERIDACTION',
}

export interface WMJSDimension {
  getFirstValue(): string;
  getLastValue(): string;
  getClosestValue(
    currentValue?: string,
    evenWhenOutsideRange?: boolean,
  ): string;
  setValue: (currentValue: string) => void;
  name: string;
  currentValue: string;
  getIndexForValue: (
    currentValue: string,
    outSideOfRangeFlag?: boolean,
  ) => number;
  getValueForIndex: (index: number) => string | CustomDate;
  size: () => number;
  linked: boolean;
  values?: string;
  units?: string;
  unitSymbol: string;
}

export enum LayerType {
  mapLayer = 'mapLayer',
  baseLayer = 'baseLayer',
  overLayer = 'overLayer',
}

export enum LayerStatus {
  default = 'default',
  error = 'error',
}

export interface Bbox {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * ReduxLayer is used to reflect the shape of the layer in the redux layers store.
 * It is a subset of Layer since some properties like the styles list now come from the service store.
 */
export interface ReduxLayer {
  id?: string;
  mapId?: string;
  service?: string;
  name?: string;
  title?: string;
  enabled?: boolean;
  style?: string;
  dimensions?: Dimension[];
  opacity?: number; // between 0.0 and 1.0
  type?: string;
  layerType?: LayerType;
  status?: LayerStatus;
  format?: string;
  geojson?: any;
  selectedFeatureIndex?: number;
}

/**
 * Layer is used to define a layer with all its possible properties.
 */
export interface Layer extends ReduxLayer {
  headers?: Headers[];
}

export interface AvailableBaseLayersType {
  byId: Record<string, ReduxLayer>;
  allIds: string[];
}

export interface LayerState {
  byId: Record<string, ReduxLayer>;
  allIds: string[];
  availableBaseLayers: AvailableBaseLayersType;
}

export enum LayerActionOrigin {
  layerManager = 'layerManager',
  wmsLoader = 'WMSLayerTreeConnect',
  ReactMapViewParseLayer = 'ReactMapViewParseLayer',
  setLayerDimensionSaga = 'setLayerDimensionSaga',
  toggleAutoUpdateSaga = 'toggleAutoUpdateSaga',
  unregisterMapSaga = 'unregisterMapSaga',
}

// actions
export interface LayerPayload {
  layerId: string;
  origin?: string;
}

export interface SetLayersPayload {
  mapId: string;
  layers: ReduxLayer[];
  origin?: string;
}

export interface SetBaseLayersPayload {
  mapId: string;
  layers: ReduxLayer[];
  origin?: LayerActionOrigin | SyncGroupActionOrigin.layerActions;
}

export interface SetLayerDimensionsPayload extends LayerPayload {
  origin: string;
  dimensions: Dimension[];
}

export interface SetLayerOpacityPayload extends LayerPayload {
  opacity: number; // between 0.0 and 1.0
  mapId?: string;
  origin?: LayerActionOrigin;
}

export interface SetLayerNamePayload extends LayerPayload {
  name: string;
  mapId?: string;
  origin?: LayerActionOrigin;
}

export interface SetLayerEnabledPayload extends LayerPayload {
  enabled: boolean;
  mapId?: string;
  origin?: LayerActionOrigin;
}

export interface SetLayerDimensionPayload extends LayerPayload {
  dimension: Dimension;
  service?: string;
  origin?: LayerActionOrigin;
  mapId?: string;
}

export interface SetLayerStylePayload extends LayerPayload {
  style: string; // TODO: (Sander de Snaijer, 2020-03-19) Change to name as well
  mapId?: string;
  origin?: LayerActionOrigin | SyncGroupActionOrigin.layerActions;
}

export interface SetLayerGeojsonPayload extends LayerPayload {
  geojson: FeatureCollection;
}

export interface DeleteLayerPayload extends LayerPayload {
  mapId: string;
  layerIndex: number;
  origin?: LayerActionOrigin | SyncGroupActionOrigin.delete;
}

export interface AddLayerPayload {
  mapId: string;
  layerId: string;
  layer: Layer;
  origin: string;
}

export interface AddBaseLayerPayload {
  mapId: string;
  layerId: string;
  layer: Layer;
  origin?: string;
}

export interface AddAvailableBaseLayerPayload {
  layer: Layer;
  origin?: string;
}

export interface AddAvailableBaseLayersPayload {
  layers: ReduxLayer[];
  origin?: string;
}

export interface SetAvailableBaseLayersPayload
  extends AddAvailableBaseLayersPayload {
  mapId: string;
}

export interface ErrorLayerPayload extends LayerPayload {
  error: Error;
}

export interface UpdateLayerInfoPayload {
  origin: string;
  mapDimensions?: UpdateAllMapDimensionsPayload;
  layerStyle?: SetLayerStylePayload;
  layerDimensions?: SetLayerDimensionsPayload;
  serviceLayers?: SetLayersForServicePayload;
}
export interface UpdateLayerInfo extends Action {
  type: `layerReducer/onUpdateLayerInformation`;
  payload: UpdateLayerInfoPayload;
}

export interface SetSelectedFeaturePayload extends LayerPayload {
  selectedFeatureIndex: number;
}
