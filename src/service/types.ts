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
 * Copyright 2023 - Koninklijk Nederlands Meteorologisch Instituut (KNMI)
 * Copyright 2023 - Finnish Meteorological Institute (FMI)
 * */

import { LayerProps } from '@opengeoweb/webmap';

export interface InitialService {
  id: string; // user presets have no id
  name: string;
  serviceUrl: string;
  scope?: ServiceScope;
  abstract?: string;
}

export interface Services {
  [key: string]: ReduxService;
}

export type ServiceScope = 'user' | 'system';

export interface ReduxService {
  name?: string;
  serviceUrl?: string;
  active?: boolean;
  layers?: ServiceLayer[];
  scope?: ServiceScope;
}

/**
 * Used in the services object of webmap to keep a list of available layers in the service
 */
export type ServiceLayer = LayerProps;
export interface ServiceState {
  byId: Services;
  allIds: string[];
}
export interface SetLayersForServicePayload {
  id: string;
  name: string;
  serviceUrl: string;
  abstract?: string;
  layers: ServiceLayer[];
  scope: ServiceScope;
  isUpdating?: boolean;
}

export interface MapStoreRemoveServicePayload {
  id: string;
  serviceUrl: string;
}

export interface FetchInitialServicesPayload {
  services: InitialService[];
}

export interface ServiceFilterSettings {
  enabledServiceIds: string[];
  searchString: string;
  checkedFilterIds: string[];
  allFiltersActive: boolean;
}
