//import React from 'react';
//import ReactDOM from 'react-dom';
//import { createStore } from 'redux';
//import { Provider, connect } from 'react-redux';

/* Storeの実装 */

// 初期state変数（initialState）の作成
const initialState = {
  places: [],
  place: '',
  images: ''
};

// createStore（）メソッドを使ってStoreの作成
const store = Redux.createStore(reducer, initialState, Redux.applyMiddleware(ReduxThunk.default.withExtraArgument));

/* Actionの実装 */

// Action名の定義
const ACTION_PLACES = 'PLACES';
const ACTION_PLACE = 'PLACE';
const ACTION_IMAGES = 'IMAGES';

// Action Creators
function places(value) {
  // Action
  return {
    type: ACTION_PLACES,
    value,
  };
}

function getPlacesAsync() {
  return dispatch => {
    fetch(`/places`, (response) => {
      if(response.status == 200){
        dispatch(places(response.json)); // Use a normal function to set the received state
      } else {
        dispatch();
      }
    }
  );};
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
    value,
  }
}

// Reducer (複数可)
function reducer(state, action) {
  switch (action.type) {
    case 'PLACE':
      return Object.assign({}, state, {
        place: action.value,
      });
    case 'ACTION_PLACES':
      return Object.assign({}, state, {
        places: action.value,
      });
    case 'ACTION_IMAGES':
      return Object.assign({}, state, {
        images: action.value,
      });
    default:
      return state;
  }
}

// Connect to Redux
function mapStateToProps(state) {
  return {
    places: state.places,
    place: state.place,
    images: state.images
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onClick(value) {
      dispatch(images(value));
    },
    onLoad() {
      dispatch(getPlacesAsync());
    }
  };
}

// View (Container Components)
var HomeContainer = React.createClass({
  render: function() {
    return (
      <div>
  //      <DisplayImages handleClick={this.props.onClick} />
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

// View (Presentational Components)
var Place = React.createClass({
  // このクリックをActionとかでなんとかしないといけない
  handleClick: function(e) {
    e.preventDefault();
    this.props.handleClick(this.props.id);
    return;
  },
  render: function() {
    return (
      <li className="place">
        <link
          onClick={(event) => this.handleClick(event)}
          value={this.props.placeName}
          name={this.props.id}>
        </link>
      </li>
    );
  }
});

// View (Presentational Components)
var DisplayImages = React.createClass({
  render: function() {
    return (
      <div>{this.props.data}</div>
    );
  }
});

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
