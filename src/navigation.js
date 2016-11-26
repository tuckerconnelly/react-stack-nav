// HACK global.__BUNDLE_START_TIME__ is only present in React Native
const __WEB__ = !global.__BUNDLE_START_TIME__ && window.location.pathname

const removeTrailingSlashFromUrl = url => {
  const urlParts = url.split('?')
  urlParts[0] = urlParts[0].replace(/\/$/, '')
  return urlParts.join('?')
}

export const pushState = (stateObj, title, url) => ({
  type: 'HISTORY_PUSH_STATE',
  payload: { stateObj: stateObj || {}, title: title || '', url: removeTrailingSlashFromUrl(url) },
})
export const replaceState = (stateObj, title, url) => ({
  type: 'HISTORY_REPLACE_STATE',
  payload: { stateObj: stateObj || {}, title: title || '', url: removeTrailingSlashFromUrl(url) },
})
export const back = reduxOnly => ({
  type: 'HISTORY_BACK',
  payload: { reduxOnly },
})
export const forward = reduxOnly => ({
  type: 'HISTORY_FORWARD',
  payload: { reduxOnly },
})
export const go = numberOfEntries => ({
  type: 'HISTORY_GO',
  payload: { numberOfEntries },
})
export const indexRedirect = (stateObj, title, url) => ({
  type: 'HISTORY_INDEX_REDIRECT',
  payload: { stateObj: stateObj || {}, title: title || '', url: removeTrailingSlashFromUrl(url) },
})

const initialState = {
  index: 0,
  history: [{ stateObj: { index: 0 }, title: '', url: '' }],
}

if (__WEB__) {
  initialState.history[0].url = removeTrailingSlashFromUrl(location.pathname)
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

      if (url === state.history[state.index].url) return state

      const stateObjWithIndex = { ...stateObj, index: state.index + 1 }

      if (__WEB__) history.pushState(stateObjWithIndex, title, url.length ? url : '/')
      return {
        index: state.index + 1,
        history: state.history
          .slice(0, state.index + 1)
          .concat([{ stateObj: stateObjWithIndex, title, url }]),
      }
    }
    case 'HISTORY_REPLACE_STATE': {
      const { stateObj, title, url } = action.payload

      if (url === state.history[state.index].url) return state

      const stateObjWithIndex = { ...stateObj, index: state.index }

      if (__WEB__) history.replaceState(stateObj, title, url.length ? url : '/')
      return {
        index: state.index,
        history: state.history
          .slice(0, state.index)
          .concat([{ stateObj: stateObjWithIndex, title, url }]),
      }
    }
    case 'HISTORY_INDEX_REDIRECT': {
      const { stateObj, title, url } = action.payload

      const stateObjWithIndex = { ...stateObj, index: state.index }

      const newUrl = state.history[state.index].url + '/' + url

      if (__WEB__) history.replaceState(stateObj, title, newUrl)
      return {
        index: state.index,
        history: state.history
          .slice(0, state.index)
          .concat([{ stateObj: stateObjWithIndex, title, url: newUrl }]),
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

    case 'HISTORY_GO': {
      const targetIndex = state.index + action.payload.numberOfEntries

      if (!state.history[targetIndex]) {
        console.warn('Tried to `go()` to a non-existant index!') // eslint-disable-line no-console, max-len
        return state
      }
      return { ...state, index: targetIndex }
    }

    default: return state
  }
}
