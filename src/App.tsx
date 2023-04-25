import { Provider } from 'react-redux';
import { ConnectedMapWithTimeSlider } from './ReduxComponent'

import { store } from '@opengeoweb/core';
import ProductBase from './Product';
import { mockProducts } from './gridTestData';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedMapWithTimeSlider mapId='mapid_1' />
        {/* <ProductBase isEditing={false} product={mockProducts[0]} /> */}
      </Provider>
    </div>
  )
}

export default App
