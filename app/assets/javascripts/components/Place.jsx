var Place = React.createClass({
  render: function() {
    return (
      <li className="place">
        {this.props.children}
      </li>
    );
  }
});

var PlaceList = React.createClass({
  render: function() {
    var placeNodes = this.props.data.map(function (places) {
      return (
        <Place placeNameAlpha={places.placeNameAlpha}>
          {places.placeName}
        </Place>
      );
    });
    return (
      <ul className="placeList">
        {placeNodes}
      </ul>
    );
  }
});

var PlaceBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="placeBox">
        <PlaceList data={this.state.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <PlaceBox url="/places" pollInterval={10000}/>,
  document.getElementById('menu-content')
);
