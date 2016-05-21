import React, { Component, PropTypes } from 'react'
import invariant from 'invariant'

export default (component) => {
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

      invariant(context.store.navigation,
        'Couldn\'t find the navigation reducer on the store. ' +
        'Make sure you have react-stack-navigation\'s reducer on ' +
        'your root reducer.'
      )
    }

    getChildContext() {
      return { navStack: this.navStack.slice(0, this.navStack.length - 1) }
    }

    // Default to redux store for stack if this is the first
    // route and the navStack hasn't been set yet
    navStack = this.context.navStack || this.store.navigation

    render() {
      return (
        <ComposedComponent
          {...this.props}
          routeFragment={this.navStack[this.navStack.length - 1]} />
      )
    }
  }

  Route.displayName =
    `Route(${Component.displayName || Component.name || 'Component'})`

  Route.contextTypes = {
    ...Route.contextTypes,
    store: PropTypes.object.isRequired,
  }

  Route.childContextTypes = {
    ...Route.childContextTypes,
    navStack: PropTypes.array,
  }

  return Route
}
