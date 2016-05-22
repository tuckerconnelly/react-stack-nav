export { default as createOrchestrator } from './createOrchestrator'

export const NAV_PUSH = 'NAV_PUSH'
export const NAV_POP = 'NAV_POP'
export const NAV_REPLACE = 'NAV_REPLACE'
export const NAV_RESET = 'NAV_RESET'
export const NAV_BACK = 'NAV_BACK'
export const NAV_FORWARD = 'NAV_FORWARD'

export const push = fragment => ({ type: NAV_PUSH, fragment })
export const pop = () => ({ type: NAV_POP })
export const replace = fragment => ({ type: NAV_REPLACE, fragment })
export const reset = stack => ({ type: NAV_RESET, stack })
export const back = () => ({ type: NAV_BACK })
export const forward = () => ({ type: NAV_FORWARD })

const initialState = { history: [[]], index: 0 }

// HACK global.__BUNDLE_START_TIME__ is only present in
// React Native
const __WEB__ = !global.__BUNDLE_START_TIME__ && window.location.pathname

// Create initial stack from url if on web
if (__WEB__) {
  const pathArray = window.location.pathname.split('/')
  pathArray.shift()
  pathArray[pathArray.length - 1] === '' && pathArray.pop()
  initialState.history[0] = pathArray
}

export default (state = initialState, action) => {
  const stack = state.history[state.index]
  let nextStack
  switch (action.type) {
    case NAV_PUSH: nextStack = [...stack, action.fragment]; break
    case NAV_POP: nextStack = stack.slice(0, stack.length - 1); break
    case NAV_REPLACE: nextStack = state.splice(stack.length - 1, 1, action.fragment); break
    case NAV_RESET: nextStack = action.stack || []; break

    case NAV_BACK:
      if (state.index === 0) return state
      return { ...state, index: state.index - 1 }
    case NAV_FORWARD:
      if (state.index === state.history.length - 1) return state
      return { ...state, index: state.index + 1 }
    default: return state
  }

  __WEB__ && window.history.pushState(null, null, nextStack.join('/'))
  return {
    index: state.index + 1,
    history: state.history.concat([nextStack]),
  }
}
