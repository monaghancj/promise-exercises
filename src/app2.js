const React = require('react')
const fetch = require('isomorphic-fetch') //already in react scripts no nneed to npm i

const App2 = React.createClass({
  getInitialState: function() {
    return {
      search: '',
      results: []
    }
  },
  handleChange(e) {
    this.setState({search: e.target.value})
  },
  handleSubmit(e) {
    e.preventDefault()
    const url = 'https://youtube-search-example-salmxnykzc.now.sh/?code=codeisfun&q='
    fetch(url + this.state.search)
      .then( res => res.json() )
      .then( results => this.setState({results}) )
      .catch(error => this.setState({error: { Error: 'server not found'}}))

  },
  render() {
    return (
      <div>
        <h1 className="washed-red">You<span className="red">Tube</span> Search</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="br3 h2 mr2"
            type="text"
            value={this.state.search}
            onChange={this.handleChange}
          />
        <button className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-light-red">Submit</button>
        </form>
        <hr />
        {this.state.results.map( item =>
          <div className="ba b--light-red mb1 br4 pa3">
            <a href={item.link} target="_blank" className="no-underline">
              <h3 className="washed-red">{item.title}</h3>
              <img className="" src={item.thumbnails.default.url} />
            </a>
          </div>
        )}
      </div>
    )
  }
})

module.exports = App2
