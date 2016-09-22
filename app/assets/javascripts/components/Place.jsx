var Place = React.createClass({
  getInitialState: function() {
    return {selectedId: ''};
  },
  handleClick: function(e) {
    e.preventDefault();
    this.setState({selectedId: e.target.name});
    this.props.onClickPlaceName({selectedId: this.state.selectId});
  },
  render: function() {
    return (
      <li className="place">
        <input
          type="button"
          onClick={this.handleClick}
          value={this.props.placeName}
          name={this.props.id}>
        </input>
      </li>
    );
  }
});

var PlaceList = React.createClass({
  handleClickPlaceName: function(selectedId) {
    this.props.onClickPlaceNameBox(selectedId);
  },
  render: function() {
    var placeNodes = this.props.data.map(function (places) {
      return (
        <Place id={places.id} placeName={places.placeName} onClickPlaceName={this.handleClickPlaceName}>
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
  handleClickPlaceNameOnBox: function(id) {
    this.props.onClickPlaceNameMenu(id);
  },
  render: function() {
    return (
      <div className="placeBox">
        <PlaceList data={this.state.data} onClickPlaceNameBox={this.handleClickPlaceNameOnBox} />
      </div>
    );
  }
});
