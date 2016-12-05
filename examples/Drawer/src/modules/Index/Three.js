import React, { PropTypes } from 'react'
import { Headline } from 'carbon-ui'
import { createOrchestrator } from 'react-stack-nav'

import NotFound from '../common/NotFound'

const Three = ({ routeFragment }) => {
  if (routeFragment !== '' && routeFragment) return <NotFound />
  return <Headline>Three</Headline>
}

Three.propTypes = { routeFragment: PropTypes.string }

export default createOrchestrator('three')(Three)
