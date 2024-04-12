import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const container = (component, ...args) => withRouter(connect(...args)(component))

export default container
