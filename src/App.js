import './App.css';
import AppRouter from './AppRouter';
import {NotificationContainer} from 'react-notifications';

function App() {
  return (
    <>
      <NotificationContainer />
      <AppRouter />
    </>
  );
}

export default App;
