'use strict';
var CatalogItemNameSearchProviderViewModel = require('../ViewModels/CatalogItemNameSearchProviderViewModel.js');
var SearchBox = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
    var search = new CatalogItemNameSearchProviderViewModel(this.props);
    console.log(search.search(event.target.value));
  },

  render: function() {
    var value = this.state.value;
    return (
      <form className="search-data-form relative">
      <label htmlFor="search" className="hide"> Type keyword to search </label>
      <i className="fa fa-search"></i>
      <input id="search" type="text" name="search" value={value} onChange={this.handleChange} className="search__field field" placeholder="Search"/>
      </form>
    );
  }
});
module.exports = SearchBox;