const React = require('react')

class Popular extends React.Component {
  render () {
    const languages = ['All', 'Javascript', 'Python', 'clojure', 'Haskell']
    return (
      <ul className='languages'>
        {languages.map(function (lang) {
          return (
            <li key={lang}>
              {lang}
            </li>)
        }, this)}
      </ul>
    )
  }
}

module.exports = Popular
