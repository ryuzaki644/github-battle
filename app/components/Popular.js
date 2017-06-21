const React = require('react')
const propTypes = require('prop-types')

class SelectLanguage extends React.Component {
  render () {
    const languages = ['All', 'Javascript', 'Python', 'clojure', 'Haskell']
    return (
      <ul className='languages'>
        {languages.map(function (lang) {
          return (
            <li
              style={lang === this.props.selectedLanguage ? {color: 'teal'} : null}
              onClick={this.props.onSelect.bind(null, lang)}
              key={lang}>
              {lang}
            </li>)
        }, this)}
      </ul>
    )
  }
}

SelectLanguage.propTypes = {
  selectedLanguage: propTypes.string.isRequired,
  onSelect: propTypes.func.isRequired
}
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
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
      </div>
    )
  }
}

module.exports = Popular
