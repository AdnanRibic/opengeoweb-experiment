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

export const DWD = {
  name: 'DWD',
  url: 'https://maps.dwd.de/geoserver/ows?',
  id: 'dwd',
};

export const nationaalgeoregister = {
  name: 'nationaalgeoregister.nl',
  url: 'https://geodata.nationaalgeoregister.nl/cbsgebiedsindelingen/wms?request=GetCapabilities&service=wms',
  id: 'nationaalgeoregister',
};

export const KNMImsgcpp = {
  name: 'KNMImsgcpp',
  url: 'https://adaguc-server-msg-cpp-portal.pmc.knmi.cloud/wms?DATASET=msgrt&',
  id: 'msgcpp-ogc-realtime',
};

export const HeiGit = {
  name: 'HeiGit',
  url: 'https://maps.heigit.org/osm-wms/service',
  id: 'HeiGit-osm-wms',
};

export const ArcGisCanvas = {
  name: 'ArcGisCanvas',
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/',
  id: 'ArcGisCanvas',
};

export const KNMIgeoservicesBaselayers = {
  name: 'KNMIgeoservicesBaselayers',
  url: 'https://geoservices.knmi.nl/wms?DATASET=baselayers&',
  id: 'KNMIgeoservicesBaselayers',
};

export const KNMIgeoservicesRadar = {
  name: 'KNMIgeoservicesRadar',
  url: 'https://geoservices.knmi.nl/wms?dataset=RADAR&',
  id: 'KNMIgeoservicesRadar',
};

export const KNMIgeoservicesObs = {
  name: 'KNMIgeoservicesObs',
  url: 'https://geoservices.knmi.nl/adagucserver?dataset=OBS',
  id: 'KNMIgeoservicesObs',
};

export const KNMIgeoservicesKlimaatAtlas = {
  name: 'KNMIgeoservicesKlimaatAtlas',
  url: 'https://geoservices.knmi.nl/wms?DATASET=gsie-dataset&SERVICE=WMS&',
  id: 'KNMIgeoservicesKlimaatAtlas',
};

export const KNMIgeoservicesHarmonie = {
  name: 'KNMIgeoservicesHarmonie',
  url: 'https://geoservices.knmi.nl/wms?DATASET=HARM_N25&',
  id: 'KNMIgeoservicesKliKNMIgeoservicesHarmoniemaatAtlas',
};

export const KNMIgeoservicesHarmonieMLService = {
  name: 'KNMI Harmonie ML',
  url: 'https://geoservices.knmi.nl/wms?DATASET=HARM_N25_ML&SERVICE=WMS&',
  id: 'harmonieML',
};

export const MetNorwayService = {
  name: 'MetNorwayService',
  url: 'https://wms-e1.geoweb.met.no/wms?',
  id: 'MetNorwayService',
};

export const FMIopenwms = {
  name: 'FMIopenwms',
  url: 'https://openwms.fmi.fi/geoserver/wms?',
  id: 'FMIopenwms',
};

export const DWDObservations = {
  name: 'DWDObservations',
  url: 'https://maps.dwd.de/geoserver/dwd/Wetter_Beobachtungen/ows?',
  id: 'DWDObservations',
};

export const DWDWarnings = {
  name: 'DWDWarnings',
  url: 'https://maps.dwd.de/geoserver/dwd/Warnungen_Gemeinden_vereinigt/ows?',
  id: 'DWDWarnings',
};

export const DWDWXProdukt = {
  name: 'DWDWXProdukt',
  url: 'https://maps.dwd.de/geoserver/dwd/WX-Produkt/ows?',
  id: 'DWDWXProdukt',
};

export const EUMETSAT = {
  name: 'EUMETSAT',
  url: 'https://view.eumetsat.int/geoserver/wms?',
  id: 'EUMETSAT',
};

export const eumetviewEUMETSAT = {
  name: 'eumetviewEUMETSAT',
  url: 'https://eumetview.eumetsat.int/geoserv/wms?',
  id: 'eumetviewEUMETSAT',
};

export const ECMWFPublicService = {
  name: 'ECMWF',
  url: 'https://eccharts.ecmwf.int/wms/?token=public',
  id: 'ecmwf',
};

export const MeteoCanada = {
  name: 'Meteo Canada',
  url: 'https://geo.weather.gc.ca/geomet/?lang=en&',
  id: 'MeteoCanada',
};
