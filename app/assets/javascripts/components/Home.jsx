var Menu = React.createClass({
  handleClickPlaceNameonMenu: function(id) {
    this.props.setImages(id);
  },
  render: function() {
    return (
      <div className="menu">
        <PlaceBox url="/places" pollInterval={10000} onClickPlaceNameMenu={this.handleClickPlaceNameonMenu}/>
      </div>
    );
  }
});

var Main = React.createClass({
  render: function() {
    return(
      <main className="main">
        <ImageBox selectedplaceId={this.props.placeId}/>
      </main>
    );
  }
})

var Home = React.createClass({
  getInitialState: function() {
    return {placeId: ''};
  },
  setImages: function(id) {
    this.setState({placeId: id});
  },
  render: function() {
    return (
      <div>
      <Main placeId={this.state.placeId}/>
      <Menu />
      </div>
    );
  }
});

ReactDOM.render(
  <Home />
  ,document.getElementById('content')
);
