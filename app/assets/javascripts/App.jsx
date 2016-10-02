//import React from 'react';
//import ReactDOM from 'react-dom';
//import { createStore } from 'redux';
//import { Provider, connect } from 'react-redux';

/* Storeの実装 */

// 初期state変数（initialState）の作成
const initialState = {
  places: [],
  place: '',
  images: []
};
// Action名の定義
const ACTION_PLACES = 'PLACES';
const ACTION_PLACE = 'PLACE';
const ACTION_IMAGES = 'IMAGES';

// createStore（）メソッドを使ってStoreの作成
const store = Redux.applyMiddleware(ReduxThunk.default)(Redux.createStore)(reducer);
store.subscribe(() => console.log(store.getState()))

/* Actionの実装 */

// Action Creators
function places(value) {
  return {
    type: ACTION_PLACES,
    value
  };
}

function fetchPlaces() {
  return fetch("/places");
}

function getPlacesAsync() {
  return dispatch => {
    return fetchPlaces()
      .then(response => response.json())
      .then(json => dispatch(places(json)));
  };
}

function fetchPlace(id) {
  return fetch("/place/" + id);
}

function getPlaceAsync(id) {
  return dispatch => {
    return fetchPlace(id)
      .then(response => response.json())
      .then(json => dispatch(images(json)));
  }
}

function place(value) {
  // Action
  return {
    type: ACTION_PLACE,
    value,
  }
}

function images(value) {
  // Action
  return {
    type: ACTION_IMAGES,
    value
  }
}

// Reducer (複数可)
function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_PLACE:
      return Object.assign({}, state, {
        place: action.value,
      });
    case ACTION_PLACES:
      return Object.assign({}, state, {
        places: action.value,
      });
    case ACTION_IMAGES:
      return Object.assign({}, state, {
        images: action.value,
      });
    default:
      return state;
  }
}

// View (Container Components)
var HomeContainer = React.createClass({
  render: function() {
    return (
      <div>
        <DisplayImages data={this.props.images}/>
        <Places onLoad={this.props.onLoad} data={this.props.places} handleClick={this.props.onClick} place={this.props.place}/>
      </div>)
  }
});

// View (Presentational Components)
var Places = React.createClass({
  loadPlacesFromServer: function() {
    this.props.onLoad();
  },
  componentDidMount: function() {
    this.loadPlacesFromServer();
  },
  render: function() {
    var handleClick = this.props.handleClick;
    var placeNodes = this.props.data.map(function (places) {
      return (
        <Place id={places.id} placeName={places.placeName} onClickPlaceName={handleClick}>
        </Place>
      );
    });
    return (
      <div className="menu">
        <ul className="placeList">
          {placeNodes}
        </ul>
      </div>
    );
  }
});

// View (Presentational Components)
var Place = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.onClickPlaceName(this.props.id);
    return;
  },
  render: function() {
    return (
      <li className="place">
        <a href="#" onClick={this.handleClick}>{this.props.placeName}</a>
      </li>
    );
  }
});

// View (Presentational Components)
var DisplayImages = React.createClass({
  render: function() {
    var imageNodes = this.props.data.map(function (images) {
      return (
        <img src={images.mediumUrl}></img>
      );
    });
    return (
      <div className="main">{imageNodes}</div>
    );
  }
});

// Connect to Redux
const mapStateToProps = (state) => {
  return {
    places: state.places,
    place: state.place,
    images: state.images
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (value) => {
      dispatch(getPlaceAsync(value));
    },
    onLoad: () => {
      dispatch(getPlacesAsync());
    }
  };
};

const TokyoContainer = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

// Rendering
ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <TokyoContainer />
  </ReactRedux.Provider>,
  document.getElementById("content")
);
