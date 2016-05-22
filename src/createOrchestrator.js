import React, { Component, PropTypes } from 'react'
import invariant from 'invariant'

export default component => {
  let ComposedComponent = component

  // Handle stateless components
  if (!ComposedComponent.render && !ComposedComponent.prototype.render) {
    ComposedComponent = class extends Component {
      render() {
        return component(this.props, this.context)
      }
    }
  }

  class Route extends Component { // eslint-disable-line react/no-multi-comp
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

      this.updateFromStore()
    }

    getChildContext() {
      return { navigationStack: this.navigationStack.slice(1, this.navigationStack.length) }
    }

    componentDidMount() {
      // Reset navigation stack when store changes
      this.context.store.subscribe(() => this.updateFromStore(true))
    }

    updateFromStore(forceUpdate) {
      const state = this.context.store.getState()
      this.index = state.navigation.index
      // Default to redux store for stack if this is the first
      // route and the navStack hasn't been set yet
      this.navigationStack =
        this.context.navigationStack || state.navigation.history[this.index]

      forceUpdate && this.forceUpdate()
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          routeFragment={this.navigationStack[0]} />
      )
    }
  }

  Route.displayName =
    `Route(${Component.displayName || Component.name || 'Component'})`

  Route.contextTypes = {
    ...Route.contextTypes,
    store: PropTypes.object,
    navigationStack: PropTypes.array,
  }

  Route.childContextTypes = {
    ...Route.childContextTypes,
    navigationStack: PropTypes.array,
  }

  return Route
}
