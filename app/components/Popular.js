const React = require('react')

class Popular extends React.Component {
  render () {
    const languages = ['All', 'Javascript', 'Python', 'clojure', 'Haskell']
    return (
      <ul>
        {languages.map(function (lang) {
          return (
            <li>
              {lang}
            </li>)
        })}
      </ul>
    )
  }
}

module.exports = Popular
