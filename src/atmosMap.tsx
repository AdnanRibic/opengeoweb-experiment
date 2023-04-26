import React, { useEffect, useRef } from 'react';
// import { useResizeDetector } from 'react-resize-detector';
import {
  getWMJSMapById,
  mapTypes,
  MapView,
  MapViewLayer,
} from '@opengeoweb/core';
import { MapViewProps } from '@opengeoweb/core/lib/components/MapView/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { WMJSMap } from '@opengeoweb/webmap';

const styles = {
  root: { height: '100vh', width: '100vw', zIndex: 0 },
  controls: { position: 'absolute', top: 0 } as React.CSSProperties,
};

export interface IResponsiveMapViewProps extends MapViewProps {
  //** optional string for testing */
  dataTestId?: string;
  //** boolean which controls the underlying passiveMap prop, !editable = passiveMap  */
  editable?: boolean;
  zoomControls: boolean;
}

const ResponsiveMapView: React.FC<IResponsiveMapViewProps> = ({
  children,
  dataTestId,
  mapId,
  zoomControls,
  ...props
}) => {
  // const { ref, height, width } = useResizeDetector();
  const wmjsMapRef = useRef<WMJSMap | null>(null);

  const baseLayer = {
    id: 'map-base',
    enabled: true,
    layerType: mapTypes.LayerType.baseLayer,
    name: 'arcGisCanvas',
    title: 'arcGisCanvas',
    type: 'twms',
  };

  // useEffect(() => {
  //   if (wmjsMapRef.current && !!width && !!height) {
  //     const { height: mapHeight, width: mapWidth } =
  //       wmjsMapRef.current.getSize();
  //     if (width !== mapWidth || height !== mapHeight) {
  //       wmjsMapRef.current.setSize(Math.ceil(width), Math.ceil(height));
  //     }
  //   }
  // }, [width, height]);

  if (!mapId) return null;

  return (
    <div style={styles.root} data-testid={dataTestId}>
      <MapView
        {...props}
        key={mapId}
        mapId={mapId}
        controls={{ zoomControls }}
        onWMJSMount={(id) => (wmjsMapRef.current = getWMJSMapById(id))}
      >
        <MapViewLayer {...baseLayer} />
        {children}
      </MapView>
    </div>
  );
};

export default ResponsiveMapView;

  