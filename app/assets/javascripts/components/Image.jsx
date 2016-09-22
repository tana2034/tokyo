var Image = React.createClass({
  render: function() {
    return (
      <li className="flickrImage">
        {this.props.children}
      </li>
    );
  }
});

var ImageList = React.createClass({
  render: function() {
    var ImageNodes = this.props.data.map(function (images) {
      return (
        <Image url={images.url}>
          {images.url}
        </Image>
      );
    });
    return (
      <ul className="imageList">
        {ImageNodes}
      </ul>
    );
  }
});

var ImageBox = React.createClass({
  setId: function() {
    if (!this.props.selectedplaceId) {
      return;
    }
    var url = "/place/" + this.props.selectedplaceId;
    this.loadImagesFromServer(url);
  }
  ,loadImagesFromServer: function(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(imagedata) {
        this.setState({imagedata: imagedata});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {imagedata: []};
  },
  render: function() {
    this.setId();
    return (
      <div className="imageBox">
        <ImageList data={this.state.imagedata} />
      </div>
    );
  }
});
