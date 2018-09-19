import React, { Component } from 'react';
import RoomList from './components/RoomList';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCbjg1d3g8U-cZ9Y04Ri73HX9KyA22O7qs",
  authDomain: "bloc-chat-react-e6f8f.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-e6f8f.firebaseio.com",
  projectId: "bloc-chat-react-e6f8f",
  storageBucket: "bloc-chat-react-e6f8f.appspot.com",
  messagingSenderId: "868908428907"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
