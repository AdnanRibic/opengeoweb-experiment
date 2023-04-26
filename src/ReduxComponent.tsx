import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  mapActions,
  MapViewConnect,
  LegendConnect,
  LegendMapButtonConnect,
  TimeSliderConnect,
  CoreThemeStoreProvider,
  store,
  MapControls,
  LayerManagerMapButtonConnect,
  DockedLayerManagerConnect,
  LayerManagerConnect,
  LayerSelectConnect,
  MultiDimensionSelectMapButtonsConnect,
  MultiMapDimensionSelectConnect,
  AppStore,
  layerActions,
  mapSelectors,
  mapTypes,
} from '@opengeoweb/core';
import ErrorBoundary from './ErrorBoundary';
import { SimpleGeoWebPresets } from './SimpleGeoWebPresets';
import {
  radarLayer,
  overLayer,
  baseLayerGrey,
  haloPrecipationLayer,
  haloBaseLayer
} from './publicLayers';
import type { Dimension } from './map/types';
import { LayerType } from '@opengeoweb/webmap';
import { LayerStatus } from '@opengeoweb/core/lib/store/mapStore/types';

export interface ReduxLayer {
    id?: string;
    mapId?: string;
    service?: string;
    name?: string;
    title?: string;
    enabled?: boolean;
    style?: string;
    dimensions?: Dimension[];
    opacity?: number;
    type?: string;
    layerType?: LayerType;
    status?: LayerStatus;
    format?: string;
    // geojson?: FeatureCollection;
    selectedFeatureIndex?: number;
}

export enum LayerActionOrigin {
  layerManager = 'layerManager',
  wmsLoader = 'WMSLayerTreeConnect',
  ReactMapViewParseLayer = 'ReactMapViewParseLayer',
  setLayerDimensionSaga = 'setLayerDimensionSaga',
  toggleAutoUpdateSaga = 'toggleAutoUpdateSaga',
  unregisterMapSaga = 'unregisterMapSaga',
}

interface SimpleGeoWebPresetsProps {
  setLayers?: typeof layerActions.setLayers;
  mapId: string;
}


const enhance = connect(
  (state: AppStore, props: SimpleGeoWebPresetsProps) => ({
    layers: mapSelectors.getMapLayers(state, props.mapId),
  }),
  {
    setLayers: layerActions.setLayers,
  },
  );

const ConnectedSimpleGeoWebPresets = enhance(SimpleGeoWebPresets);

const baseLayer = {
  id: 'map-base',
  enabled: true,
  layerType: mapTypes.LayerType.baseLayer,
  name: 'arcGisCanvas',
  title: 'arcGisCanvas',
  type: 'twms',
};

const styles = {
  root: { height: '100vh', width: '100vw', zIndex: 0 },
  controls: { position: 'absolute', top: 0 } as React.CSSProperties,
};


export const ConnectedMapWithTimeSlider = ({ mapId }: { mapId: string }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // set layers
    dispatch(mapActions.setLayers({ layers: [radarLayer], mapId }));
    // baseLayers
    dispatch(
      mapActions.setBaseLayers({
        mapId,
        layers: [haloBaseLayer, haloPrecipationLayer],
        origin:  LayerActionOrigin.layerManager,
      }),
    );
  }, []);

  return (
    <CoreThemeStoreProvider store={store}>
      <ErrorBoundary>
        <div style={{ height: '100vh' }}>
          <MapControls>
            <LayerManagerMapButtonConnect mapId={mapId} />
            <LegendMapButtonConnect mapId={mapId} />
            <MultiDimensionSelectMapButtonsConnect mapId={mapId} />
          </MapControls>
          <LayerSelectConnect />
          <LayerManagerConnect bounds="#root" />
          <DockedLayerManagerConnect mapId={mapId} />
          <LegendConnect mapId={mapId} />
          <MultiMapDimensionSelectConnect />
          <div
            style={{
              position: 'absolute',
              left: '0px',
              bottom: '0px',
              zIndex: 50,
              width: '100%',
            }}
          >
            <TimeSliderConnect mapId={mapId} sourceId="timeslider-1" />
          </div>
            <div style={styles.root}>
            <MapViewConnect mapId={mapId} showLayerInfo={false} />
            </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: '50px',
            top: '10px',
            zIndex: 90,
          }}
        >
          <ConnectedSimpleGeoWebPresets mapId={mapId} />
        </div>
      </ErrorBoundary>
    </CoreThemeStoreProvider>
  );
};
