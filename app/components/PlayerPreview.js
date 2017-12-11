const React = require('react')
const propTypes = require('prop-types')

function PlayerPreview (props) {
  console.log(props)
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
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: propTypes.string.isRequired,
  username: propTypes.string.isRequired
}

module.exports = PlayerPreview
