import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { navigation, attachHistoryModifiers } from 'react-stack-nav'
import { BackAndroid } from 'react-native'

const rootReducer = combineReducers({ navigation })

export default initialState =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      attachHistoryModifiers({ BackAndroid }),
    ),
  )
