import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
  constructor(props) {
    super (props);
    this.state = {
      currentRoom: null,
      displayName:'',
      username:''
    };
  }

  setActiveRoom(room) {
    this.setState({currentRoom: room});
  }

  setUser(user){
    if(user) {
      this.setState({username: user.email, displayName: user.displayName})
    } else {
      this.setState({username:'', displayName:''})
    };
  }

  render() {
    return (
      <section className="App">
        <header className="App-header">
          <h1>My Chat Rooms</h1>
        </header>
        <div className="roomlist">
          <RoomList
            firebase={firebase}
            currentRoom={this.state.currentRoom}
            setActiveRoom={this.setActiveRoom.bind(this)}
          />
        </div>
        <div className="messagelist">
          <MessageList
            firebase={firebase}
            currentRoom={this.state.currentRoom}
            currentMesages={this.state.currentMesages}
            username={this.state.username}
          />
        </div>
        <div className="user">
          <User
            firebase={firebase}
            displayName={this.state.displayName}
            setUser={this.setUser.bind(this)}
          />
        </div>
      </section>
    );
  }
}

export default App;
