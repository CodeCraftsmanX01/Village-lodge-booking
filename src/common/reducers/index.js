import { combineReducers } from 'redux'

import reducers from './reducers'

const combinedReducers = {
  ...reducers,
}

export default combineReducers(combinedReducers)