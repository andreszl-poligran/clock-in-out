import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './reducers/index.ts';

// Render the application
ReactDOM.createRoot(document.getElementById('host')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
