import React, { Component, PropTypes } from 'react'
import { Animated, View } from 'react-native-universal'

class Route extends Component {
  state = { visible: this.props.active }

  componentWillReceiveProps(next) {
    const { active } = this.props

    if (active && !next.active) {
      Animated.timing(this._opacityAV, { duration: 112, toValue: 0 })
        .start(() => this.setState({ visible: false }))
    } else if (!active && next.active) {
      this.setState({ visible: true }, () =>
        Animated.timing(this._opacityAV, { duration: 225, delay: 112, toValue: 1 })
          .start()
      )
    }
  }

  _opacityAV = new Animated.Value(this.props.active ? 1 : 0)

  render() {
    return (
      <Animated.View
        style={[
          styles.base,
          { opacity: this._opacityAV },
          !this.state.visible && styles.hidden,
        ]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

Route.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
}

export default Route

const styles = {
  base: {
    position: 'absolute',
  },

  hidden: {
    width: 0,
    height: 0,
  },
}
