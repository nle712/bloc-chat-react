import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super (props);
    this.state = {
       rooms: []
     };
     this.roomsRef = this.props.firebase.database().ref('Rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
     });
  }

  render() {
    return (
      <div>
      Room List
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
