import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'

import searchReducer from './store/reducers/search';
import hotelReducer from './store/reducers/hotel';
import hotelIdReducer from './store/reducers/hotelId';


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
    search: searchReducer,
    hotel:hotelReducer,
    hotelId:hotelIdReducer,
});

const store = createStore(rootReducer,applyMiddleware(logger));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
