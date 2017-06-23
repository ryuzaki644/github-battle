const React = require('react')
const propTypes = require('prop-types')
const Link = require('react-router-dom').Link

function PlayerPreview (props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}>
          Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  onReset: propTypes.func.isRequired
}

class PlayerInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    let value = event.target.value
    console.log(value)
    this.setState(function () {
      return {
        username: value
      }
    })
  }
  handleSubmit (event) {
    event.preventDefault()

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render () {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
          />
        <button className='button'
          type='submit'
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Username'}

class Battle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneAvatar: null,
      playerTwoAvatar: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  handleSubmit (id, username) {
    this.setState(function () {
      const newState = {}
      newState[id + 'Name'] = username
      newState[id + 'Avatar'] = 'https://github.com/' + username + '.png?size=200'
      return newState
    })
  }

  handleReset (id) {
    this.setState(function () {
      const newState = {}
      newState[id + 'Name'] = ''
      newState[id + 'Avatar'] = null
      return newState
    })
  }

  render () {
    const match = this.props.match
    let playerOneName = this.state.playerOneName
    let playerTwoName = this.state.playerTwoName
    let playerOneAvatar = this.state.playerOneAvatar
    let playerTwoAvatar = this.state.playerTwoAvatar

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}
          {playerOneAvatar !== null &&
            <PlayerPreview
              avatar={playerOneAvatar}
              id='playerOne'
              username={playerOneName}
              onReset={this.handleReset}
              />}

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

          {playerTwoAvatar !== null &&
            <PlayerPreview
              avatar={playerTwoAvatar}
              id='playerTwo'
              username={playerTwoName}
              onReset={this.handleReset}
              />}
        </div>
        {playerOneAvatar && playerTwoAvatar &&
        <Link
          className='button'
          to={{
            pathname: match.url + '/results',
            search: `?playerOneName=` + playerOneName + `&playerTwoName=` +
                playerTwoName
          }}>
              Battle
        </Link>}

      </div>
    )
  }
}

module.exports = Battle
