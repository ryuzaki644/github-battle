const React = require('react')
const ReactRouter = require('react-router-dom')
const Popular = require('./Popular')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
const Nav = require('./Nav')

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>
    )
  }
}

module.exports = App
