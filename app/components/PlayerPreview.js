const React = require('react')
const propTypes = require('prop-types')

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

module.exports = PlayerPreview
