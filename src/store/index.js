import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';

const initialState = {
  user: {
    fullname: '',
    email: '',
  },
  isLoading: false,
  allChords: [],
};

const store = createStore(reducers, initialState, applyMiddleware(thunk, logger));

export default store;
