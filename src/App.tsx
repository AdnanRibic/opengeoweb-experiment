import { Provider } from 'react-redux';
import { ConnectedMapWithTimeSlider } from './ReduxComponent'

import { store } from '@opengeoweb/core';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedMapWithTimeSlider mapId='jeff' />
      </Provider>
    </div>
  )
}

export default App
