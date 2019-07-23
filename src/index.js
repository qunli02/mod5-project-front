import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";
import { createStore } from "redux";
import reducer from "./reducer.js";
import { Provider } from "react-redux";
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

const store = createStore(reducer)


ReactDOM.render(<ActionCableProvider url={API_WS_ROOT}><Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider></ActionCableProvider>, document.getElementById('root'));
