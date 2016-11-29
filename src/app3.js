const React = require('react')
const axios = require('axios')

const App3 = React.createClass({
  getInitialState: function() {
    return {
      search: '',
      results: [],
      type: 'artist',
      error: null
    }
  },
  handleChange(e){
    this.setState({search: e.target.value, results: []})
  },
  handleSubmit(e){
    e.preventDefault()
    const url = 'https://spotify-search-example-loebhfepjn.now.sh/?type=' + this.state.type + '&query='
    axios.get(url + this.state.search)
      .then(results => {
        this.setState({results: results.data[this.state.type + 's']['items']})
      })
      .catch(error => this.setState({error}) )
  },
  handleTypeChange(e) {
    this.setState({type: e.target.value, search: '', results: []})
  },
  render() {
    return (
      <div>
        <h1> <span className="light-green">Axios</span> Search </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="br3 h2 mr1 mb1"
            value={this.state.search}
            onChange={this.handleChange}
          />
        <br />
          <select
            className="mr1 h2"
            onChange={this.handleTypeChange}
            value={this.state.type}>
            <option>artist</option>
            <option>album</option>
            <option>playlist</option>
          </select>

          <button
            className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-light-green">
            Submit
          </button>
        </form>
        <hr />
        {this.state.results.map(item =>
          <div>
            <h3>{item.name}</h3>
            <img key={item.id} src={item.images.length > 0
                  ? item.images[0].url
                  : 'https://www.fillmurray.com/200/300'}
            />
            <hr />
          </div>
        )}
        {this.state.error ? <h3>{this.state.error.message}</h3> : null}
      </div>
    )
  }
})

module.exports = App3
