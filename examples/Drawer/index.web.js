/* global document */
import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { AppRegistry, BaseStyles } from 'react-native-universal'
import { WebStyles } from 'carbon-ui'

import App from './src/index'

const app = render(
  <App>
    <BaseStyles />
    <WebStyles />
  </App>,
  document.getElementById('root')
)
AppRegistry.registerComponent('client', app)
