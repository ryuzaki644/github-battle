const React = require('react')
const queryString = require('query-string')
const api = require('../utils/api')
const Link = require('react-router-dom').Link

class Results extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount () {
    const players = queryString.parse(this.props.location.search)

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (results) {
      if (results === null) {
        return this.setState(function () {
          return {
            error: 'Looks like there is an error check whether both players exist',
            loading: false
          }
        })
      }
      if (results[0].score === results[1].score) {
        return this.setState(function () {
          return {
            error: null,
            winner: results[0],
            loser: results[1],
            loading: false,
            draw: true
          }
        })
      }
      this.setState(function () {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false,
          draw: false
        }
      })
    }.bind(this))
  }
  render () {
    const error = this.state.error
    const winner = this.state.winner
    const loser = this.state.loser
    const draw = this.state.draw
    const loading = this.state.loading

    if (loading === true) {
      return <p> loading... </p>
    }
    if (error) {
      return (
        <div>
          <p>
            {error}
            <Link to='/batle'>Reset</Link>
          </p>
        </div>
      )
    }

    if (draw === true) {
      return (
        <div>
          <h1>Winner</h1>
          <p>
            {JSON.stringify(winner, null, 2)}
          </p>
          <h1>Winner</h1>
          <p>{JSON.stringify(loser, null, 2)}</p>

        </div>
      )
    }

    return (
      <div>
        <h1>Winner</h1>
        <p>
          {JSON.stringify(winner, null, 2)}
        </p>
        <h1>Loser</h1>
        <p>{JSON.stringify(loser, null, 2)}</p>

      </div>
    )
  }
}

module.exports = Results
