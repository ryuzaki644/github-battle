const React = require('react')

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  updateLanguage (lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang
      }
    })
  }

  render () {
    const languages = ['All', 'Javascript', 'Python', 'clojure', 'Haskell']
    return (
      <ul className='languages'>
        {languages.map(function (lang) {
          return (
            <li
              style={lang === this.state.selectedLanguage ? {color: 'teal'} : null}
              onClick={this.updateLanguage.bind(null, lang)}
              key={lang}>
              {lang}
            </li>)
        }, this)}
      </ul>
    )
  }
}

module.exports = Popular
