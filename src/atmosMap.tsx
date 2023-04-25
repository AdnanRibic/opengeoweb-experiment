import React, { useEffect } from 'react';
import { mapTypes, MapViewLayer, ReactMapView } from '@opengeoweb/core';
import { MapViewProps } from '@opengeoweb/core/lib/components/MapView/types';
import { ReactMapViewProps } from '@opengeoweb/core/lib/components/ReactMapView/types';
import { WMJSMap } from '@opengeoweb/webmap';
import { ResizeSensor } from 'css-element-queries';

const styles = {
  root: { height: '100%', width: '100%' },
};

const MapView: React.FC<MapViewProps> = ({
    children,
    displayTimeInMap = true,
    ...props // rest of ReactMapView props
  }) => {
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const adagucRef = React.useRef<WMJSMap | null>(null);
  
    const baseLayer = {
      id: 'map-base',
      enabled: true,
      layerType: mapTypes.LayerType.baseLayer,
      name: 'arcGisCanvas',
      title: 'arcGisCanvas',
      type: 'twms',
    };
  
    useEffect(() => {
      if (wrapper.current)
        new ResizeSensor(wrapper.current, () => {
          if ((adagucRef.current, wrapper.current)) {
            const map = adagucRef.current as WMJSMap;
            const { offsetHeight, offsetWidth } = wrapper.current;
            map.setSize(offsetWidth, offsetHeight);
          }
        });
    }, [wrapper]);
  
    return (
      <div style={styles.root} ref={wrapper} data-testid={'map-test'}>
        <ReactMapView
          {...(props as ReactMapViewProps)}
          onRegisterAdaguc={(adaguc: WMJSMap | null): void => {
            adagucRef.current = adaguc;
          }}
          showLegend={false}
          displayTimeInMap={false}
        >
          <MapViewLayer {...baseLayer} />
          {children}
        </ReactMapView>
      </div>
    );
  };
  
  export default MapView;
  