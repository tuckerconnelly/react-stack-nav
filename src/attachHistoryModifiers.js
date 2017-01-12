import URL from 'url-parse'

// HACK global.__BUNDLE_START_TIME__ is only present in React Native
const __WEB__ = !global.__BUNDLE_START_TIME__ && window.location.pathname

import { replaceState, back, forward } from './navigation'

export default function attachHistoryModifiers({ BackAndroid, Linking } = {}) {
  return createStore => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    const { dispatch, getState } = store

    if (__WEB__) {
      window.onpopstate = ({ state }) => {
        const newIndex = getState().navigation.history
          .map(s => s.stateObj.index)
          .indexOf(state.index)
        const lastIndex = getState().navigation.index

        if (newIndex <= lastIndex) dispatch(back(true))
        if (newIndex > lastIndex) dispatch(forward(true))
      }
    }
    if (BackAndroid) {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        const { index } = store.getState().navigation
        if (index === 0) return false
        dispatch(back())
        return true
      })
    }
    if (Linking) {
      Linking.addEventListener('url', ({ url }) => {
        const { pathname, query, hash } = new URL(url)
        dispatch(replaceState(0, 0, `${pathname}${query}${hash}`))
      })
    }

    return store
  }
}
