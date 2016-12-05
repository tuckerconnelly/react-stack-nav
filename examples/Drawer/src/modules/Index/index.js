import React, { PropTypes } from 'react'
import { View } from 'react-native-universal'
import { createOrchestrator } from 'react-stack-nav'

import RouteFade from '../common/RouteFade'
import NotFound from '../common/NotFound'

import HomePage from './HomePage'
import One from './One'
import Two from './Two'
import Three from './Three'

const VALID_FRAGMENTS = [
  '',
  'one',
  'two',
  'three',
]

// Fading isn't necessary, could do:
//
// {routeFragment === '' && <HomePage />}
// {routeFragment === 'one' && <One />}
// …
//
// but it's good UX

const Index = ({ routeFragment }) =>
  <View style={styles.base}>
    <RouteFade active={routeFragment === ''}><HomePage /></RouteFade>
    <RouteFade active={routeFragment === 'one'}><One /></RouteFade>
    <RouteFade active={routeFragment === 'two'}><Two /></RouteFade>
    <RouteFade active={routeFragment === 'three'}><Three /></RouteFade>
    <RouteFade active={VALID_FRAGMENTS.indexOf(routeFragment) === -1}>
      <NotFound />
    </RouteFade>
  </View>

Index.propTypes = {
  // createOrchestrator
  routeFragment: PropTypes.string.isRequired,
}

export default createOrchestrator()(Index)

const styles = {
  base: {
    position: 'relative',

    padding: 16,
  },
}
