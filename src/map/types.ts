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

import { TimeInterval } from '@opengeoweb/webmap';
import type { Layer, LayerActionOrigin } from '../types';

export interface Dimension {
  name?: string;
  units?: string;
  currentValue: string;
  maxValue?: string;
  minValue?: string;
  timeInterval?: TimeInterval;
  synced?: boolean;
  validSyncSelection?: boolean;
  values?: string;
}

export interface WebMap {
  id: string;
  isAnimating: boolean;
  animationStartTime?: string;
  animationEndTime?: string;
  isAutoUpdating: boolean;
  isEndTimeOverriding: boolean;
  srs: string;
  bbox: Bbox;
  mapLayers: string[];
  baseLayers: string[];
  overLayers: string[];
  featureLayers: string[];
  dimensions?: Dimension[];
  autoUpdateLayerId?: string;
  autoTimeStepLayerId?: string;
  timeSliderScale?: Scale;
  timeStep?: number;
  animationDelay?: number;
  timeSliderCenterTime?: number;
  timeSliderUnfilteredSelectedTime?: number;
  timeSliderSecondsPerPx?: number;
  timeSliderDataScaleToSecondsPerPx?: number;
  isTimestepAuto?: boolean;
  isTimeSliderHoverOn?: boolean;
  isTimeSliderVisible?: boolean;
  shouldShowZoomControls?: boolean;
  mapPinLocation?: MapLocation;
  disableMapPin?: boolean;
  displayMapPin?: boolean;
  legendId?: string;
  dockedLayerManagerSize?: DockedLayerManagerSize;
}

export type DockedLayerManagerSize =
  | 'sizeSmall'
  | 'sizeMedium'
  | 'sizeLarge'
  | '';
export interface WebMapState {
  byId: Record<string, WebMap>;
  allIds: string[];
}

export interface MapLocation {
  lat: number;
  lon: number;
}

export interface Bbox {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export enum Scale {
  Minutes5,
  Hour,
  Hours3,
  Hours6,
  Day,
  Week,
  Month,
  Year,
  DataScale,
}

export enum AnimationLength {
  Minutes15 = 15,
  Minutes30 = 30,
  Hours1 = 60,
  Hours2 = 2 * 60,
  Hours3 = 3 * 60,
  Hours6 = 6 * 60,
  Hours12 = 12 * 60,
  Hours24 = 24 * 60,
}

export type SpeedFactorType = 0.1 | 0.2 | 0.5 | 1 | 2 | 4 | 8 | 16;

export interface AnimationPayloadType {
  duration?: number; // Defined in minutes
  interval?: number; // Defined in minutes, note that if you set an interval, the auto timestep is set to false
  speed?: SpeedFactorType; // Defined as one of the animation speed options to be chosen via the UI [0.1, 0.2, 0.5, 1, 2, 4, 8, 16]
  endTime?: string; // Defined in NOW+PTxHyM/NOW-PTxHyM (NOW = current time utc, x = hours and y = minutes) or TODAY+PTxHyM/TODAY-PTxHyM (TODAY = current date at 00:00 utc)
  shouldEndtimeOverride?: boolean; // Defined as true/false
}

export enum MapActionOrigin {
  map = 'map',
}

export interface MapPreset {
  layers?: Layer[];
  activeLayerId?: string;
  autoTimeStepLayerId?: string;
  autoUpdateLayerId?: string;
  proj?: {
    bbox: Bbox;
    srs: string;
  };
  dimensions?: Dimension[];
  shouldAnimate?: boolean;
  shouldAutoUpdate?: boolean;
  showTimeSlider?: boolean;
  displayMapPin?: boolean;
  shouldShowZoomControls?: boolean;
  toggleTimestepAuto?: boolean;
  animationPayload?: AnimationPayloadType;
  shouldShowLegend?: boolean;
  shouldShowLayerManager?: boolean;
  shouldShowDockedLayerManager?: boolean;
  dockedLayerManagerSize?: DockedLayerManagerSize;
}

export interface MapPresetInitialProps {
  mapPreset: MapPreset;
  syncGroupsIds?: string[];
}

// Layer actions

export interface MoveLayerPayload {
  mapId: string;
  oldIndex: number;
  newIndex: number;
  origin: string;
}

export interface SetBboxPayload {
  mapId: string;
  bbox: Bbox;
  srs?: string;
}

export interface SetMapDimensionPayload {
  origin: string;
  mapId: string;
  dimension: Dimension;
}

export interface UpdateAllMapDimensionsPayload {
  origin: string;
  mapId: string;
  dimensions: Dimension[];
}

export type TimeListType = {
  name: string;
  value: string;
};

export interface SetMapAnimationStartPayload {
  mapId: string;
  start?: string;
  end?: string;
  interval?: number; // in seconds
  timeList?: TimeListType[];
  origin?: MapActionOrigin;
}

export interface SetMapAnimationStopPayload {
  mapId: string;
  origin?: MapActionOrigin;
}

export interface SetAutoLayerIdPayload {
  mapId: string;
  layerId?: string;
  autoUpdateLayerId?: string;
  autoTimeStepLayerId?: string;
  origin?: LayerActionOrigin | string;
}

export interface ToggleAutoUpdatePayload {
  mapId: string;
  shouldAutoUpdate: boolean;
  origin?: MapActionOrigin;
}
export interface SetEndTimeOverriding {
  mapId: string;
  shouldEndtimeOverride: boolean;
}

export interface SetTimeSliderScalePayload {
  mapId: string;
  timeSliderScale: Scale;
}

export interface SetTimeStepPayload {
  mapId: string;
  timeStep?: number;
  origin?: MapActionOrigin;
}

export interface SetAnimationDelayPayload {
  mapId: string;
  animationDelay: number;
  origin?: MapActionOrigin;
}

export interface SetAnimationStartTimePayload {
  mapId: string;
  animationStartTime: string;
}

export interface SetAnimationEndTimePayload {
  mapId: string;
  animationEndTime: string;
}

export interface ToggleTimestepAutoPayload {
  mapId: string;
  timestepAuto: boolean;
  origin?: MapActionOrigin;
}

export interface ToggleTimeSliderHoverPayload {
  mapId: string;
  isTimeSliderHoverOn: boolean;
}

export interface ToggleTimeSliderIsVisiblePayload {
  mapId: string;
  isTimeSliderVisible: boolean;
  origin?: MapActionOrigin;
}

export interface SetTimeSliderCenterTimePayload {
  mapId: string;
  timeSliderCenterTime: number;
}

export interface SetTimeSliderUnfilteredSelectedTimePayload {
  mapId: string;
  timeSliderUnfilteredSelectedTime: number;
}

export interface SetTimeSliderSecondsPerPxPayload {
  mapId: string;
  timeSliderSecondsPerPx: number;
}

export interface SetTimeSliderDataScaleToSecondsPerPxPayload {
  mapId: string;
  timeSliderDataScaleToSecondsPerPx: number;
}

export interface ToggleZoomControlsPayload {
  mapId: string;
  shouldShowZoomControls: boolean;
}

export interface MapPinLocationPayload {
  mapId: string;
  mapPinLocation: MapLocation;
}

export interface DisableMapPinPayload {
  mapId: string;
  disableMapPin: boolean;
}

export interface ToggleMapPinIsVisiblePayload {
  mapId: string;
  displayMapPin: boolean;
}

export interface SetMapPresetPayload {
  mapId: string;
  initialProps: MapPresetInitialProps;
}

export interface SetDockedLayerManagerSize {
  mapId: string;
  dockedLayerManagerSize: DockedLayerManagerSize;
}
