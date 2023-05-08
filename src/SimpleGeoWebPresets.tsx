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
  haloPrecipationLayer,
  haloVindLayer,
  MetNoTemp,
  haloVind2Layer,
  haloVind3Layer,
  haloColorScaleLayer,
  haloSeaTempLayer,
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

  const presetRain = {
    layers: [haloPrecipationLayer],
  };
  const presetVind = {
    layers: [haloVind2Layer, haloVind3Layer, haloColorScaleLayer],
  };
  const presetTemp = {
    layers: [haloSeaTempLayer],
  };

    // const presetRadar = {
    //   layers: [{ ...radarLayer, id: `radar-${mapId}-2` }],
    // };
    // const presetHarmoniePrecipAndObs = {
    //   layers: [
    //     harmoniePrecipitation,
    //     { ...radarLayer, id: `radar-${mapId}-3` },
    //     harmoniePressure,
    //   ],
    // };

    // const presetRadarMSGCPP = {
    //   layers: [{ ...radarLayer, id: `radar-${mapId}-4` }, msgCppLayer],
    // };

    // const presetWind = {
    //   layers: [metNorwayWind1, metNorwayWind2, metNorwayWind3],
    // };

    // const presetHarmoniePL = {
    //   layers: [harmonieWindPl, harmonieRelativeHumidityPl],
    // };
  
  //https://cdnstatic.ventusky.com/images/icons/blue-feel.svg

    return (
      <div
        // color="primary"
        // aria-label="outlined primary button group"
        // data-title="Forecast"
        // id="i"
        style={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}
      >
        <button
          onClick={(): void => {
            setLayers!({
              layers: presetRain.layers,
              mapId,
            });
          }}
          id="i"
          style={{margin: '5px'}}
        >
          <span className="temp-icon"/>
          {' '}
          Rain
        </button>
        <button
          onClick={(): void => {
            setLayers!({
              layers: presetVind.layers,
              mapId,
            });
          }}
          style={{margin: '5px'}}
        >
          Vind
        </button>
        <button
          onClick={(): void => {
            setLayers!({
              layers: presetTemp.layers,
              mapId,
            });
          }}
          style={{margin: '5px'}}
        >
          Temp
        </button>
        {/* <button
          onClick={(): void => {
            setLayers!({
              layers: presetRadarMSGCPP.layers,
              mapId,
            });
          }}
          style={{margin: '5px'}}
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
          style={{margin: '5px'}}
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
          style={{margin: '5px'}}
        >
          HarmoniePL
        </button> */}
      </div>
    );
  };