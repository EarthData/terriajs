'use strict';
var DataCatalogGroup = require('./DataCatalogGroup.jsx');
var DataPreview = require('./DataPreview.jsx');
var SearchBox = require('./SearchBox.jsx');
var when = require('terriajs-cesium/Source/ThirdParty/when');

var DataCatalog = React.createClass({
  getInitialState: function() {
    return {
      openId: '',
      previewed: undefined
    };
  },

  handleChildClick: function (i, obj) {
    var that = this;
    obj.props.group.isOpen = !obj.state.isOpen;
    obj.setState({
      isOpen : !obj.state.isOpen
    });

    if(obj.state.isOpen === false){
      when(obj.props.group.load()).then(function() {
        that.setState({
          openId : i
        });
      });
    }
  },

  componentWillMount: function(){
    var that = this;
    previewUpdate.addEventListener(function(_previewed){
      that.setState({
        previewed: _previewed
      });
    });
  },

  render: function(){
    var terria = this.props.terria;
    var dataCatalog = terria.catalog.group.items;
    return (
      <div className="panel-content clearfix">
      <div className="search-data col col-5">
      <SearchBox terria = {terria}/>
      <ul className = 'list-reset'>
      {dataCatalog.map(function(group, i) {
        return (<DataCatalogGroup onClick={this.handleChildClick.bind(this, i)} group={group} items={group.items} isLoading={group.isLoading} key={i} />);
      }, this)}
      </ul>
      </div>
      <div className="search-preview preview col col-7 block">
        <DataPreview previewed={this.state.previewed} />
      </div>
      </div>
      ) ;
  }
});

module.exports = DataCatalog;