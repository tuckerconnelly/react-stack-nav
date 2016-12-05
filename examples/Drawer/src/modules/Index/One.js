import React, { PropTypes } from 'react'
import { Headline } from 'carbon-ui'
import { createOrchestrator } from 'react-stack-nav'

import NotFound from '../common/NotFound'

const One = ({ routeFragment }) => {
  if (routeFragment !== '' && routeFragment) return <NotFound />
  return <Headline>One</Headline>
}

One.propTypes = { routeFragment: PropTypes.string }

export default createOrchestrator('one')(One)
