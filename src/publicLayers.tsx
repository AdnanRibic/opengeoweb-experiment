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
import { generateLayerId, layerActions, mapTypes } from "@opengeoweb/core";
import {
  nationaalgeoregister,
  HeiGit,
  ArcGisCanvas,
  KNMImsgcpp,
  KNMIgeoservicesBaselayers,
  KNMIgeoservicesRadar,
  KNMIgeoservicesHarmonie,
  MetNorwayService,
  FMIopenwms,
  DWDObservations,
  DWDWarnings,
  DWDWXProdukt,
  KNMIgeoservicesObs,
  EUMETSAT,
  eumetviewEUMETSAT,
  KNMIgeoservicesKlimaatAtlas,
} from './publicServices';

export const baseLayer = {
  name: 'arcGisSat',
  title: 'arcGisSat',
  type: 'twms',
  layerType: mapTypes.LayerType.baseLayer,
  enabled: true,
  id: generateLayerId(),
};

// Base Layers List

export const baseLayerGrey = {
  id: generateLayerId(),
  name: 'WorldMap_Light_Grey_Canvas',
  type: 'twms',
  layerType: mapTypes.LayerType.baseLayer,
};

export const baseLayerOpenStreetMapNL = {
  id: 'base-layer-2',
  name: 'OpenStreetMap_NL',
  type: 'twms',
  layerType: mapTypes.LayerType.baseLayer,
  enabled: true,
};

export const baseLayerArcGisCanvas = {
  service: ArcGisCanvas.url,
  id: generateLayerId(),
  name: 'arcGisCanvas',
  type: 'twms',
  enabled: true,
  layerType: mapTypes.LayerType.baseLayer,
};

export const baseLayerWorldMap = {
  id: generateLayerId(),
  name: 'WorldMap',
  type: 'twms',
  layerType: mapTypes.LayerType.baseLayer,
  enabled: true,
};

export const baseLayerHeiGit = {
  service: HeiGit.url,
  id: generateLayerId(),
  name: 'osm_auto:all',
  layerType: mapTypes.LayerType.baseLayer,
};

// Over Layers List

export const overLayer = {
  service: KNMIgeoservicesBaselayers.url,
  name: 'countryborders',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.overLayer,
};

// Met Norway Layers List

export const haloPrecipationLayer = {
  service: "https://halo-wms.met.no/halo/default.map",
  name: 'precipitation_mm_palette_regional',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.overLayer,
};

export const haloBaseLayer = {
  service: "https://halo-wms.met.no/halo/default.map",
  name: 'basemap',
  format: 'image/png',
  layers: 'proff.bl',
  enabled: true,
  request: 'GetMap',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.baseLayer,
};

// KNMI msgcpp List

export const msgCppLayer = {
  // doesn't work with https
  service: KNMImsgcpp.url,
  name: 'lwe_precipitation_rate',
  format: 'image/png',
  enabled: true,
  style: 'precip-transparent/nearest',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

// Nederlandse Nationaal Georegister Layers list

export const veiligheidsRegiosGebiedsIndelingenLabels = {
  service: nationaalgeoregister.url,
  name: 'cbsgebiedsindelingen:cbs_veiligheidsregio_2020_labelpoint',
  style: 'CBS_Label',
  enabled: false,
  layerType: mapTypes.LayerType.mapLayer,
};

export const veiligheidsRegiosGebiedsIndelingen = {
  service: nationaalgeoregister.url,
  name: 'cbsgebiedsindelingen:cbs_veiligheidsregio_2020_gegeneraliseerd',
  style: 'CBS_Gebiedsindeling',
  enabled: false,
  layerType: mapTypes.LayerType.mapLayer,
};

// KNMI Geoservices Layers List

export const radarLayer = {
  service: KNMIgeoservicesRadar.url,
  name: 'RAD_NL25_PCP_CM',
  format: 'image/png',
  enabled: true,
  style: 'radar/nearest',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const radarLayerWithError = {
  service: KNMIgeoservicesRadar.url,
  name: 'radarLayer',
  format: 'image/png',
  enabled: true,
  style: 'knmiradar/nearest',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const obsAirTemperature = {
  service: KNMIgeoservicesObs.url,
  name: '10M/ta',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const obsWind = {
  service: KNMIgeoservicesObs.url,
  name: '10M/wind',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const obsAirPressureAtSeaLevel = {
  service: KNMIgeoservicesObs.url,
  name: '10M/pp',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const obsRelativeHumidity = {
  service: KNMIgeoservicesObs.url,
  name: '10M/rh',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const obsGlobalSolarRadiation = {
  service: KNMIgeoservicesObs.url,
  name: '10M/qg',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const obsPrecipitationIntensityPWS = {
  service: KNMIgeoservicesObs.url,
  name: '10M/pg',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const harmonieRelativeHumidityPl = {
  service: KNMIgeoservicesHarmonie.url,
  name: 'relative_humidity__at_pl',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
  enabled: true,
};

export const harmonieWindPl = {
  service: KNMIgeoservicesHarmonie.url,
  name: 'wind__at_pl',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
  enabled: true,
};

export const harmonieAirTemperature = {
  service: KNMIgeoservicesHarmonie.url,
  name: 'air_temperature__at_2m',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
  enabled: true,
};

export const harmoniePrecipitation = {
  service: KNMIgeoservicesHarmonie.url,
  name: 'precipitation_flux',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
  enabled: true,
};

export const harmoniePressure = {
  service: KNMIgeoservicesHarmonie.url,
  name: 'air_pressure_at_sea_level',
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
  enabled: true,
};

export const harmonieWindFlags = {
  service: KNMIgeoservicesHarmonie.url,
  name: 'wind__at_10m',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const klimaatAtlasTG3 = {
  service: KNMIgeoservicesKlimaatAtlas.url,
  name: 'TG3',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

// DWD Layers List

export const dwdWarningLayer = {
  service: DWDWarnings.url,
  name: 'Warnungen_Gemeinden_vereinigt',
  format: 'image/png',
  // style: 'warnungen_gemeinden_vereinigt_event_seamless_param',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const dwdRadarLayer = {
  service: DWDWXProdukt.url,
  name: 'WX-Produkt',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

// this needs authentication to work
export const dwdObservationsWetterLayer = {
  service: DWDObservations.url,
  name: 'Wetter_Beobachtungen',
  style: 'Wetter_Symbole',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
  // headers: [{ name: 'Authorization', value: 'Basic ...' }]
};

export const dwdObservationsWetterLayerWithHeader = {
  service: DWDObservations.url,
  name: 'Wetter_Beobachtungen',
  style: 'Wetter_Symbole',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
  headers: [
    { name: 'authorization', value: 'Basic aW50cmFuZXQtdXNlcjpDQnMjMTEh' },
  ],
};

// this needs authentication to work
export const dwdObservationsWindLayer = {
  service: DWDObservations.url,
  name: 'Wetter_Beobachtungen',
  style: 'Wetter_Wind',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

// FMI open wms Layers List

export const FMITemp = {
  service: FMIopenwms.url,
  name: 'temperature-forecast',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

// Met Norway Layers List

export const MetNoTemp = {
  service: MetNorwayService.url,
  name: 'thredds_meps_latest_wind',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const metNorwayWind1 = {
  service: MetNorwayService.url,
  name: 'thredds_meps_latest_wind',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const metNorwayWind2 = {
  service: MetNorwayService.url,
  name: 'thredds_aromearctic_extracted_t',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const metNorwayWind3 = {
  service: MetNorwayService.url,
  name: 'thredds_nk800_temperature',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const metNorwayLatestT = {
  service: MetNorwayService.url,
  name: 'thredds_meps_latest_t',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const metNorwaySalinaty = {
  service: MetNorwayService.url,
  name: 'thredds_barents_2_5km_1h_salinity',
  format: 'image/png',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const msgFesEUMETSAT = {
  service: EUMETSAT.url,
  name: 'msg_fes:rgb_eview',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const msgNaturalenhncdEUMETSAT = {
  service: eumetviewEUMETSAT.url,
  name: 'meteosat:msg_naturalenhncd',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const msgAshEUMETSAT = {
  service: eumetviewEUMETSAT.url,
  name: 'meteosat:msg_ash',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const msgCthEUMETSAT = {
  service: eumetviewEUMETSAT.url,
  name: 'meteosat:msg_cth',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const msgFogEUMETSAT = {
  service: eumetviewEUMETSAT.url,
  name: 'meteosat:msg_fog',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};

export const msgNaturalEUMETSAT = {
  service: eumetviewEUMETSAT.url,
  name: 'meteosat:msg_natural',
  enabled: true,
  id: generateLayerId(),
  layerType: mapTypes.LayerType.mapLayer,
};
