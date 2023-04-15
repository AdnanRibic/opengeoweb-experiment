import { generateLayerId, layerActions, mapTypes } from "@opengeoweb/core";
import { KNMIgeoservicesHarmonie, KNMIgeoservicesObs, KNMIgeoservicesRadar, KNMImsgcpp, MetNorwayService } from "./type";



export interface SimpleGeoWebPresetsProps {
    setLayers?: typeof layerActions.setLayers;
    mapId: string;
  }


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

export const SimpleGeoWebPresets: React.FC<SimpleGeoWebPresetsProps> = ({
    setLayers,
    mapId,
  }: SimpleGeoWebPresetsProps) => {
    // useDefaultMapSettings({
    //   mapId,
    //   layers: [{ ...radarLayer, id: `radar-${mapId}` }],
    //   baseLayers: [{ ...baseLayerGrey, id: `baseGrey-${mapId}` }, overLayer],
    // });

    const presetHarmonie = {
      layers: [harmonieAirTemperature],
    };
    const presetRadar = {
      layers: [{ ...radarLayer, id: `radar-${mapId}-2` }],
    };
    const presetHarmoniePrecipAndObs = {
      layers: [
        harmoniePrecipitation,
        { ...radarLayer, id: `radar-${mapId}-3` },
        harmoniePressure,
      ],
    };

    const presetRadarMSGCPP = {
      layers: [{ ...radarLayer, id: `radar-${mapId}-4` }, msgCppLayer],
    };

    const presetWind = {
      layers: [metNorwayWind1, metNorwayWind2, metNorwayWind3],
    };

    const presetHarmoniePL = {
      layers: [harmonieWindPl, harmonieRelativeHumidityPl],
    };

    return (
      <div
        color="primary"
        aria-label="outlined primary button group"
      >
        <button
          onClick={(): void => {
            setLayers!({
              layers: presetHarmonie.layers,
              mapId,
            });
          }}
        >
          {' '}
          Harmonie
        </button>
        <button
          onClick={(): void => {
            setLayers!({
              layers: presetRadar.layers,
              mapId,
            });
          }}
        >
          Radar
        </button>
        <button
          onClick={(): void => {
            setLayers!({
              layers: presetHarmoniePrecipAndObs.layers,
              mapId,
            });
          }}
        >
          Precip + Obs
        </button>
        <button
          onClick={(): void => {
            setLayers!({
              layers: presetRadarMSGCPP.layers,
              mapId,
            });
          }}
        >
          Radar + MSGCPP
        </button>
        <button
          onClick={(): void => {
            setLayers!({
              layers: presetWind.layers,
              mapId,
            });
          }}
        >
          Wind
        </button>
        <button
          onClick={(): void => {
            setLayers!({
              layers: presetHarmoniePL.layers,
              mapId,
            });
          }}
        >
          HarmoniePL
        </button>
      </div>
    );
  };