import { Provider } from 'react-redux';
import { ConnectedMapWithTimeSlider } from './ReduxComponent'

import { store } from '@opengeoweb/core';
import ProductBase from './Product';
import { mockProducts } from './gridTestData';
import MapView from './atmosMap';
import { ConfigurableMapTest, MapConnectTest } from './MapTest';
import ResponsiveMapView from './atmosMap';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedMapWithTimeSlider mapId='mapid_1' />
        {/* <ProductBase isEditing={false} product={mockProducts[0]} /> */}
        {/* <MapView height={400} /> */}
        {/* <MapConnectTest /> */}
        {/* <ResponsiveMapView zoomControls={false} mapId={'map1'} /> */}
      </Provider>
    </div>
  )
}

export default App
