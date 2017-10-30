// @flow
/* eslint no-underscore-dangle: 0 */
import { combineReducers } from 'redux'

let _reducers: $reducers

export const initReducers = () : void => {
  _reducers = {}
}

// get reducer for given dispatch type
// pass in (state, payload)
export const getReducer = (reducer: $reducers, initialState: any) => (
  state: any = initialState,
  action: $action,
) => {
  if (typeof reducer[action.type] === 'function') {
    return reducer[action.type](state, action.payload)
  }
  return state
}

// adds "model/reducer"
export const resolveReducers = (modelName: string, reducers: $reducers = {}) =>
  Object.keys(reducers).reduce((acc, reducer) => {
    acc[`${modelName}/${reducer}`] = reducers[reducer]
    return acc
  }, {})

// creates a reducer out of "reducers" keys and values
export const createReducers = ({ name, reducers, state }: $model) =>
  getReducer(resolveReducers(name, reducers), state)

// uses combineReducers to merge new reducers into existing reducers
export const mergeReducers = (nextReducers: $reducers, customCombineReducers) => {
  _reducers = { ..._reducers, ...nextReducers }
  if (customCombineReducers) {
    return customCombineReducers(_reducers)
  }
  return combineReducers(_reducers)
}
