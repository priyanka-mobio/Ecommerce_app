import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import ContextProvider from "./components/context/ContextProvider";

ReactDOM.render(
  <ContextProvider >
    <Provider store = {store}> 
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </ContextProvider>

,
  document.getElementById('root')
);

