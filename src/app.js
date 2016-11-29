const React = require('react')
const fetch = require('isomorphic-fetch') //already in react scripts no nneed to npm i

const App = React.createClass({
  getInitialState: function() {
    return {
      search: '',
      results: {
        Search: []
      },
      error: null
    };
  },
  handleChange(e) {
    this.setState({search: e.target.value})
  },
  handleSubmit(e) {
    e.preventDefault()
    fetch('https://www.omdbapi.com/?r=json&s=' + this.state.search)
      .then(res => res.json())
      .then(results => results.Search
        ? this.setState({results})
        : this.setState({error: results.error}))
      .catch(error => this.setState({error: { Error: 'server not found'}}))
  },
  render() {
    return (
      <div>
        <h1>Movie Poster Search</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.search}
            onChange={this.handleChange}
            type="text" />
          <button className="">Submit</button>
          <hr />
        </form>
        {this.state.results.Search.length}
        {this.state.error ? <div className="error">{this.state.error.message}</div> : null}
        {this.state.results.Search.length > 0 ?
          <div>Search results: {this.state.results.Search.length}</div>
          : null
        }
        {
          this.state.results.Search.map(item =>
          <img key={item.imdbID} src={item.Poster} />)
        }
      </div>
    )
  }
})

module.exports = App
