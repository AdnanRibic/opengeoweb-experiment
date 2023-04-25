import React, { lazy, Suspense } from 'react';
import { Delete, DragIndicatorOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { mapTypes, MapViewLayer } from '@opengeoweb/core';

import { IMockProduct } from './gridTestData';

export enum IProductType {
  Color = 'Color',
  Map = 'Map',
}

const MapView = lazy(() => import('./atmosMap'));

const editBarStyles = {
  alignItems: 'center',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  padding: '0.5em',
  width: '100%',
};
const styles = {
  color: {
    height: '100%',
    textAlign: 'center',
    width: '100%',
  },
  dragHandle: {
    backgroundColor: 'transparent',
    cursor: 'move',
  },
  footer: {
    ...editBarStyles,
    borderTop: '1px solid black',
  },
  header: {
    ...editBarStyles,
    '&:hover': {
      backgroundColor: grey[100], // TODO: use theme
    },
    borderBottom: '1px solid black',
    cursor: 'move',
  },
};

interface IProps {
  handleDelete?: (id: string) => void;
  isEditing: boolean;
  product: IMockProduct;
}

const ProductBase: React.FC<IProps> = ({
  handleDelete,
  isEditing,
  product,
}) => {
  const FMIgetcapabilities = {
    id: 'FMIgetcapabilities',
    name: 'FMIgetcapabilities',
    url: 'https://data.fmi.fi/fmi-apikey/ff22323b-ac44-486c-887c-3fb6ddf1116c/wms',
  };

  const msgCppLayer = {
    id: 'fmi:pal:temperature',
    enabled: true,
    format: 'image/png',
    layerType: mapTypes.LayerType.mapLayer,
    name: 'fmi:pal:temperature',
    opacity: 0.7,
    service: FMIgetcapabilities.url,
  };

  const simpleMultiPolygon = {
    features: [
      {
        geometry: {
          coordinates: [
            [
              [
                [4.365729269907452, 55.315807175634454],
                [3.299427839634416, 55.605958027800156],
                [2.368817, 55.764314],
                [5.331914, 59.332644],
                [8.365729269907419, 55.315807175634454],
              ],
            ],
            [
              [
                [12.500001602574285, 54.735051191917506],
                [11.526314849017847, 58.0000007017522],
                [25.500002, 65.000002],
                [24.50000160257428, 54.735051191917506],
              ],
            ],
          ],
          type: 'MultiPolygon',
        },
        properties: {
          fill: '#33ccFF',
          'fill-opacity': 0.5,
          stroke: '#8F8',
          'stroke-opacity': 1,
          'stroke-width': 4,
        },
        type: 'Feature',
      },
    ],
    type: 'FeatureCollection',
  };

  const animateLayer = (layer: any, webMap: any): void => {
    webMap.setAnimationDelay(100);
    if (layer) {
      const timeDim = layer.getDimension('time');
      if (timeDim) {
        const numTimeSteps = timeDim.size();
        if (timeDim.getValueForIndex(numTimeSteps - 1) !== new Date()) {
          const dates = [];
          for (let j = numTimeSteps - 48; j < numTimeSteps; j += 1) {
            dates.push({
              name: 'time',
              value: timeDim.getValueForIndex(j),
            });
          }
          webMap.stopAnimating();
          layer.zoomToLayer();
          webMap.draw(dates);
        }
      }
    }
  };

  return (
    <>
      {isEditing && (
        <Box sx={styles.header} className={'atmos-drag-handle'}>
          <IconButton size="small" disableRipple style={styles.dragHandle}>
            <DragIndicatorOutlined />
          </IconButton>
        </Box>
      )}
      {product.type === IProductType.Map ? (
        <Suspense fallback={<div>Loading...</div>}>
          <MapView mapId={'map-view-test'}>
            {/^[0-9][a-z]/.test(product.id.split('-')[1] || '') && (
              <MapViewLayer {...msgCppLayer} />
            )}
            {/^[a-z]/.test(product.id.split('-')[1] || '') && (
              <MapViewLayer id="simple-geo-json" geojson={simpleMultiPolygon} />
            )}
            {/^[0-9]{2}/.test(product.id.split('-')[1] || '') && (
              <MapViewLayer {...msgCppLayer} onLayerReady={animateLayer} />
            )}
          </MapView>
        </Suspense>
      ) : (
        <Box
          sx={{
            ...styles.color,
            backgroundColor:
              product.type === IProductType.Color ? product.color : '',
          }}
        >
          {product.id}
        </Box>
      )}
      {isEditing && handleDelete && (
        <Box sx={styles.footer}>
          <IconButton
            data-test-id="atmos-delete-product-button"
            size="small"
            onClick={() => handleDelete(product.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default ProductBase;
