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
} from '@opengeoweb/core';
import ErrorBoundary from './ErrorBoundary';
import { SimpleGeoWebPresets } from './SimpleGeoWebPresets';

export interface ReduxLayer {
    id?: string;
    mapId?: string;
    service?: string;
    name?: string;
    title?: string;
    enabled?: boolean;
    style?: string;
    // dimensions?: Dimension[];
    opacity?: number;
    type?: string;
    // layerType?: LayerType;
    // status?: LayerStatus;
    format?: string;
    // geojson?: FeatureCollection;
    selectedFeatureIndex?: number;
}

const radarLayer: ReduxLayer = {
    id: 'radar',
    name: 'radar',
    title: 'Radar',
    enabled: true,
    style: 'default',
}

const baseLayerGrey: ReduxLayer = {
    id: 'base',
    name: 'base',
    title: 'Base',
    enabled: true,
    style: 'default',
}

const overLayer: ReduxLayer = {
    id: 'over',
    name: 'over',
    title: 'Over',
    enabled: true,
    style: 'default',
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

export const ConnectedMapWithTimeSlider = ({ mapId }: { mapId: string }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // set layers
    dispatch(mapActions.setLayers({ layers: [radarLayer], mapId }));
    // baseLayers
    dispatch(
      mapActions.setBaseLayers({
        mapId,
        layers: [baseLayerGrey, overLayer],
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
          <MapViewConnect mapId={mapId} showLayerInfo={false} />
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
