import React, { Component, PropTypes } from 'react'
import invariant from 'invariant'

function makeStackFromPathname(pathname) {
  const pathArray = pathname.split('/')
  pathArray.shift() // Remove first blank ""
  return pathArray
}

export default fragment => component => {
  let ComposedComponent = component

  // Handle stateless components
  if (!ComposedComponent.render && !ComposedComponent.prototype.render) {
    ComposedComponent = class extends Component {
      render() {
        return component(this.props, this.context)
      }
    }
  }

  class Orchestrator extends Component { // eslint-disable-line react/no-multi-comp
    constructor(props, context) {
      super(props, context)
      invariant(context.store,
        'Couldn\'t find the store on the context. ' +
        'Make sure you have a redux <Provider> at the top ' +
        'of your app.')

      invariant(context.store.getState().navigation,
        'Couldn\'t find the navigation reducer on the store. ' +
        'Make sure you have react-stack-nav\'s reducer on ' +
        'your root reducer.'
      )
    }

    state = { urlStack: [] }

    getChildContext() {
      return {
        lastOrchestratorId: this._orchestratorId,
        orchestratorPath: this._orchestratorPath,
      }
    }

    componentWillMount() {
      const { lastOrchestratorId } = this.context

      this._orchestratorId = lastOrchestratorId !== undefined ?
        lastOrchestratorId + 1 :
        0
      this._orchestratorPath = this.context.orchestratorPath ?
        [...this.context.orchestratorPath, fragment] :
        []

      this._updateUrlStack()
      this._unsubscribeFromStore = this.context.store.subscribe(this._updateUrlStack)
    }

    componentWillUnmount() {
      this._unsubscribeFromStore()
    }

    _unsubscribeFromStore = null

    _updateUrlStack = () => {
      const state = this.context.store.getState()
      const index = state.navigation.index
      // Default to redux store for stack if this is the first
      // route and the navStack hasn't been set yet
      this.setState({
        urlStack: makeStackFromPathname(state.navigation.history[index].url),
      })
    }

    get _routeFragment() {
      const urlMatchesOrchestratorPath = this._orchestratorPath.reduce((prev, curr, i) => {
        if (!prev) return false

        if (!this.state.urlStack[i]) return false
        // Handle regex orchestrators
        if (this._orchestratorPath[i] instanceof RegExp) {
          return this.state.urlStack[i].match(this._orchestratorPath[i])
        }
        // Handle string orchestrators
        return this.state.urlStack[i] === this._orchestratorPath[i]
      }, true)

      if (!urlMatchesOrchestratorPath) return undefined

      return this.state.urlStack[this._orchestratorId] || ''
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          routeFragment={this._routeFragment} />
      )
    }
  }

  Orchestrator.displayName =
    `Orchestrator(${Component.displayName || Component.name || 'Component'})`

  Orchestrator.contextTypes = {
    ...Orchestrator.contextTypes,
    store: PropTypes.object,
    lastOrchestratorId: PropTypes.number,
    orchestratorPath: PropTypes.array,
  }

  Orchestrator.childContextTypes = {
    ...Orchestrator.childContextTypes,
    lastOrchestratorId: PropTypes.number,
    orchestratorPath: PropTypes.array,
  }

  return Orchestrator
}
