import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/Modal";
import configureStore from './store';

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}>
        <App />
      </Provider> */}
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
