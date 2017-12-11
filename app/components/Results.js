const React = require('react')
const queryString = require('query-string')
const api = require('../utils/api')
const Link = require('react-router-dom').Link
const PropTypes = require('prop-types')
const PlayerPreview = require('./PlayerPreview')

function Player (props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>{props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}


function Profile (props) {
  const info = props.info
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login} >
      <ul className='space-list-items'>
        {info.name ? <li> Name: {info.name}</li> : <li>Name: {info.login}</li>}
        {info.followers && <li>{info.followers} </li>}
      </ul>
    </PlayerPreview>
  )
}


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
    ]).then((results) => {
      if (results === null) {
        return this.setState(function () {
          return {
            error: 'Looks like there is an error check whether both players exist',
            loading: false
          }
        })
      }
      this.setState(function () {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    })
  }
  render () {
    const error = this.state.error
    const winner = this.state.winner
    const loser = this.state.loser
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

    return (
      <div className='row'>
        <Player
          label={winner === loser ? 'Draw' : 'Winner'}
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label={winner === loser ? 'Draw' : 'Loser'}
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Results
