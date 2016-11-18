// HACK global.__BUNDLE_START_TIME__ is only present in React Native
const __WEB__ = !global.__BUNDLE_START_TIME__ && window.location.pathname

export const pushState = (stateObj, title, url) => ({
  type: 'HISTORY_PUSH_STATE',
  payload: { stateObj: stateObj || {}, title, url },
})
export const replaceState = (stateObj, title, url) => ({
  type: 'HISTORY_REPLACE_STATE',
  payload: { stateObj: stateObj || {}, title, url },
})
export const back = reduxOnly => ({
  type: 'HISTORY_BACK',
  payload: { reduxOnly },
})
export const forward = reduxOnly => ({
  type: 'HISTORY_FORWARD',
  payload: { reduxOnly },
})

const initialState = {
  index: 0,
  history: [{ stateObj: { index: 0 }, title: null, url: '/' }],
}

if (__WEB__) {
  initialState.history[0].url = location.pathname
  history.replaceState(
    initialState.history[0].stateObj,
    initialState.history[0].title,
    initialState.history[0].url
  )
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HISTORY_PUSH_STATE': {
      const { stateObj, title, url } = action.payload

      if (url === state.history[state.history.length - 1].url) return state

      const stateObjWithIndex = { ...stateObj, index: state.index + 1 }

      if (__WEB__) history.pushState(stateObjWithIndex, title, url)
      return {
        index: state.index + 1,
        history: state.history
          .slice(0, state.index + 1)
          .concat([{ stateObj: stateObjWithIndex, title, url }]),
      }
    }
    case 'HISTORY_REPLACE_STATE': {
      const { stateObj, title, url } = action.payload

      if (url === state.history[state.history.length - 1].url) return state

      const stateObjWithIndex = { ...stateObj, index: state.index }

      if (__WEB__) history.replaceState(stateObj, title, url)
      return {
        index: state.index,
        history: state.history
          .slice(0, state.index)
          .concat([{ stateObj: stateObjWithIndex, title, url }]),
      }
    }
    case 'HISTORY_BACK':
      if (state.index === 0) return state

      if (__WEB__ && !action.payload.reduxOnly) history.back()
      return { ...state, index: state.index - 1 }

    case 'HISTORY_FORWARD':
      if (state.index === state.history.length - 1) return state

      if (__WEB__ && !action.payload.reduxOnly) history.forward()
      return { ...state, index: state.index + 1 }

    default: return state
  }
}
