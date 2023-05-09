import { layerActions, mapActions } from "@opengeoweb/core";
import Modal from 'react-modal';
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
  haloBaseLayer,
  } from './publicLayers';
import { useDefaultMapSettings } from "./defaultStorySettings";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LayerActionOrigin } from "./types";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
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
  const [modalOpen, setModalOpen] = useState(false);
  const [rainChecked, setRainChecked] = useState(false);
  const [windChecked, setWindChecked] = useState(false);
  const [tempChecked, setTempChecked] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRainChange = () => {
    setRainChecked(!rainChecked);
  };

  const handleWindChange = () => {
    setWindChecked(!windChecked);
  };

  const handleTempChange = () => {
    setTempChecked(!tempChecked);
  };


  const presetRain = {
    layers: [haloPrecipationLayer],
  };
  const presetVind = {
    layers: [haloVind2Layer, haloVind3Layer, haloColorScaleLayer],
  };
  const presetTemp = {
    layers: [haloSeaTempLayer],
  };

  const payload = {
    mapId: mapId,
    layerIndex: 1,
    layerId: 'layerid_42'
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const baseLayers = [];
    if (rainChecked) {
      baseLayers.push(haloPrecipationLayer);
      console.log(baseLayers)
    }
    else if (windChecked) {
      baseLayers.push(haloVind2Layer);
    }
    else if (tempChecked) {
      baseLayers.push(haloSeaTempLayer);
    } else {
      console.log('no layers selected');
      baseLayers.push();
      dispatch(
        mapActions.layerDelete(payload)
      )
    }
    dispatch(
      mapActions.setLayers({
        mapId,
        layers: baseLayers,
        origin: LayerActionOrigin.layerManager,
      }),
    );
  }, [rainChecked, windChecked, tempChecked]);

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
    <>
      <div
        style={{
          position: 'absolute',
          left: '10px',
          bottom: '40vh',
          zIndex: 90,
          display: 'flex',
          backgroundColor: 'white',
          padding: modalOpen ? '15px' : '0px',
          width: modalOpen ? '180px' : '0px',
          borderWidth: '1px',
          borderColor: 'black',
          borderStyle: modalOpen ? 'solid' : 'none',
        }}
      >
      {modalOpen && (
        <div className="modal">
            <div className="modal-content"
            style={{ display: 'flex', flexDirection: 'column'}}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>Select layers:</p>
            <div>
              <input
                type="checkbox"
                id="rain"
                name="rain"
                checked={rainChecked}
                onChange={handleRainChange}
              />
              <label htmlFor="rain">Rain</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="wind"
                name="wind"
                checked={windChecked}
                onChange={handleWindChange}
              />
              <label htmlFor="wind">Wind</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="temp"
                name="temp"
                checked={tempChecked}
                onChange={handleTempChange}
              />
              <label htmlFor="temp">Temperature</label>
            </div>
          </div>
        </div>
      )}
      </div>
      <div
      id="yourAppElement"
        // color="primary"
        // aria-label="outlined primary button group"
        // data-title="Forecast"
        // id="i"
        style={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}
      >
        
        
        <button
          onClick={openModal}
          id="i"
          style={{margin: '5px'}}
        >
          <span className="temp-icon"/>
          {' '}
          Layers
        </button>
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
      </>
    );
  };