import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from './App';
import store from './redux/reduxStore'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainApp />
);

