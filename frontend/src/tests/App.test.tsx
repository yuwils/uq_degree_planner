import { store, persistor } from '../reducers/reducers'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import renderer from 'react-test-renderer';
import App from '../App';
import Timetable from '../components/DisplayTimetable';

// Focus on snapshotting the main components

test('render home screen', () => {
  const tree = renderer.create(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('render timetable', () => {
    const tree = renderer.create(<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Timetable />
      </PersistGate>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
