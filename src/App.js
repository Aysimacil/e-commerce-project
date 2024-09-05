import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
        <ToastContainer stacked />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
