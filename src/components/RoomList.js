import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super (props);
    this.state = {
       rooms: [],
       newRoomName:""
     };
     this.roomsRef = this.props.firebase.database().ref('Rooms');
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
     });
  }


  handleChange(event) {
    this.setState({newRoomName: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.newRoomName);
    event.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Room Name:
            <input type="text" name="name" value={this.state.newRoomName}
            onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Create" />
        </form>
        <h3>Room List</h3>
        {
          this.state.rooms.map((room, index) => {
            return (
              <div key={index}>
                {room.name}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default RoomList;
