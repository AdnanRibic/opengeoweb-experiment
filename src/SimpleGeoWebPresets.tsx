import { layerActions } from "@opengeoweb/core";
export interface SimpleGeoWebPresetsProps {
    setLayers?: typeof layerActions.setLayers;
    mapId: string;
  }

  import {
    msgCppLayer,
    radarLayer,
    overLayer,
    baseLayerGrey,
    metNorwayWind1,
    metNorwayWind2,
    metNorwayWind3,
    harmonieAirTemperature,
    harmoniePressure,
    harmoniePrecipitation,
    harmonieRelativeHumidityPl,
    harmonieWindPl,
  } from './publicLayers';
import { useDefaultMapSettings } from "./defaultStorySettings";

export const SimpleGeoWebPresets: React.FC<SimpleGeoWebPresetsProps> = ({
    setLayers,
    mapId,
  }: SimpleGeoWebPresetsProps) => {
    useDefaultMapSettings({
      mapId,
      layers: [{ ...radarLayer, id: `radar-${mapId}` }],
      baseLayers: [{ ...baseLayerGrey, id: `baseGrey-${mapId}` }, overLayer],
    });

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