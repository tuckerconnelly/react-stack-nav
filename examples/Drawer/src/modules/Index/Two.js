import React, { PropTypes } from 'react'
import { Headline } from 'carbon-ui'
import { createOrchestrator } from 'react-stack-nav'

import NotFound from '../common/NotFound'

const Two = ({ routeFragment }) => {
  if (routeFragment !== '' && routeFragment) return <NotFound />
  return <Headline>Two</Headline>
}

Two.propTypes = { routeFragment: PropTypes.string }

export default createOrchestrator('two')(Two)
