export { default as createRoute } from './createRoute'

export const NAV_PUSH = 'NAV_PUSH'
export const NAV_POP = 'NAV_POP'

export const push = url => ({ type: NAV_PUSH, url })
export const pop = () => ({ type: NAV_POP })

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case NAV_PUSH:
      window.history && window.history.pushState(null, null, action.url)
      return [...state, action.state]
    case NAV_POP: return state.slice(0, state.length - 2)
    default: return state
  }
}
