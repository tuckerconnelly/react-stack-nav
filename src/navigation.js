// HACK global.__BUNDLE_START_TIME__ is only present in
// React Native
const __WEB__ = !global.__BUNDLE_START_TIME__ && window.location.pathname

export { default as createOrchestrator } from './createOrchestrator'

export const push = fragment => ({ type: 'NAV_PUSH', fragment })
export const pop = () => ({ type: 'NAV_POP' })
export const replace = fragment => ({ type: 'NAV_REPLACE', fragment })
export const reset = stack => ({ type: 'NAV_RESET', stack })
export const back = reduxOnly => ({ type: 'NAV_BACK', reduxOnly })
export const forward = reduxOnly => ({ type: 'NAV_FORWARD', reduxOnly })

export const attachHistoryModifiers = ({ getState, dispatch }, { BackAndroid }) => {
  if (__WEB__) {
    window.onpopstate = ({ state }) => {
      const newIndex = (state && state.index) || 0
      const lastIndex = getState().navigation.index
      if (newIndex <= lastIndex) dispatch(back(true))
      if (newIndex > lastIndex) dispatch(forward(true))
    }
  }
  if (BackAndroid) {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { index } = getState().navigation
      if (index === 0) return false
      dispatch(back())
      return true
    })
  }
}

function makeStackFromPathname(pathname) {
  const pathArray = pathname.split('/')
  pathArray.shift()
  pathArray[pathArray.length - 1] === '' && pathArray.pop()
  return pathArray
}

const initialState = { history: [[]], index: 0 }
if (__WEB__) initialState.history[0] = makeStackFromPathname(location.pathname)

export default (state = initialState, action) => {
  const stack = state.history[state.index]
  let nextStack
  switch (action.type) {
    case 'NAV_PUSH': nextStack = [...stack, action.fragment]; break
    case 'NAV_POP': nextStack = stack.slice(0, stack.length - 1); break
    case 'NAV_REPLACE': nextStack = state.splice(stack.length - 1, 1, action.fragment); break
    case 'NAV_RESET': nextStack = action.stack || []; break

    case 'NAV_BACK':
      // If action.stateOnly is set, don't call history.back()
      if (__WEB__ && !action.reduxOnly) history.back()
      // If we're at index 0 and there's still pushstate history in the browser
      if (__WEB__ && state.index === 0) {
        const newHistory = [...state.history]
        newHistory.splice(0, 0, makeStackFromPathname(location.pathname))
        return { index: 0, history: newHistory }
      }
      if (state.index === 0) return state
      return { ...state, index: state.index - 1 }
    case 'NAV_FORWARD':
      if (__WEB__ && !action.reduxOnly) history.forward()
      // If we're at the last index and there's still pushstate history in the browser
      if (__WEB__ && state.index === state.history.length - 1) {
        const newHistory = state.history.concat([makeStackFromPathname(location.pathname)])
        return { index: state.index + 1, history: newHistory }
      }
      if (state.index === state.history.length - 1) return state
      return { ...state, index: state.index + 1 }
    default: return state
  }

  const nextState = {
    index: state.index + 1,
    history: state.history.slice(0, state.index + 1).concat([nextStack]),
  }

  __WEB__ && history.pushState(nextState, null, nextStack.join('/'))
  return nextState
}
