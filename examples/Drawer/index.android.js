import { AppRegistry } from 'react-native'

import App from './src/index'

// NOTE For Uranium/carbon-ui
global.matchMedia = () => ({ addListener: () => 0, removeListener: () => 0 })

AppRegistry.registerComponent('Drawer', () => App)
