import { applyMiddleware } from 'redux'

import checker from './checker'
import logger from './logger'
import motivator from './motivator'
import thunk from 'redux-thunk'

export default applyMiddleware(
	thunk,
	checker,
	logger,
	motivator
)