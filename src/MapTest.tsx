import React from 'react';
import {
  ConfigurableMapConnect,
  CoreThemeStoreProvider,
  mapTypes,
  MapView,
  MapViewConnect,
  MapViewLayer,
  store,
} from '@opengeoweb/core';

export const ConfigurableMapTest: React.FC = () => {
  return (
    <div style={{ height: '50vh' }} data-testid={'map-test'}>
      <CoreThemeStoreProvider store={store}>
        <ConfigurableMapConnect
          id={'map-test'}
          layers={[]}
          displayTimeInMap={false}
          displayLayerManagerAndLegendButtonInMap={false}
          displayDimensionSelectButtonInMap={false}
          disableTimeSlider
          shouldShowZoomControls={false}
        />
      </CoreThemeStoreProvider>
    </div>
  );
};

export const MapConnectTest: React.FC = () => {
  const mapId = 'map-connect-test';

  // TODO: create store with layers

  return (
    <div style={{ height: '50vh' }} data-testid={'map-test'}>
      <CoreThemeStoreProvider store={store}>
        <MapViewConnect mapId={mapId} />
      </CoreThemeStoreProvider>
    </div>
  );
};

export const MapViewTest: React.FC = () => {
  const mapId = 'map-view-test';

  const baseLayer = {
    id: 'map-base',
    enabled: true,
    layerType: mapTypes.LayerType.baseLayer,
    name: 'arcGisCanvas',
    title: 'arcGisCanvas',
    type: 'twms',
  };

  return (
    <div style={{ height: '50vh' }} data-testid={'map-test'}>
      <CoreThemeStoreProvider store={store}>
        <MapView mapId={mapId} controls={{ zoomControls: false }}>
          <MapViewLayer {...baseLayer} />
        </MapView>
      </CoreThemeStoreProvider>
    </div>
  );
};
