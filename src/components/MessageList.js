import React, { Component } from 'react';

class MessgeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: [], // What does a message object look like? {content: String, CreatedAt: timestamp, roomId: String, username: String}
      thisChatRoomsMessages: [], // This one is just a filtered version of allMessages based on the roomId and this current room
      newMessage: "" // This is the ever changing text of what a user types into the input field
    }
    this.messageRef = this.props.firebase.database().ref('messages');
    this.getMessagesForThisChatRoom = this.getMessagesForThisChatRoom.bind(this);
  }

  // This is creating an event listener for our instance firebase, that when a child message is added to FB
  // It is appending... concating that new messages to allMessages
  componentDidMount() {
    this.messageRef.on('child_added' , (snapshot) => {
      const message = snapshot.val();
      message.key = snapshot.key; // This is attaching the snapshot UUID to our message object for unique identifying purposes of our li key in react
      this.setState({ allMessages: this.state.allMessages.concat(message)});
    });
  }

  // When the currentRoom props change, we are calling displayMessages with the new currentRoom
  // componentWillReceiveProps(nextProps) {
  //   const currentRoom = nextProps.currentRoom;
  //   if (this.props.currentRoom !== currentRoom) {
  //     this.displayMessages(currentRoom);
  //   }
  // }

  // When we create a new message we are adding the message, timestamp, current room and username
  // and then we are setting the state of new message to a blank string, in order to clear the input box
  /*
  * This is a method that takes a message string, we are pushing a message object to the "messageRef" FB.
  * This object contains, content which is the message string, createdAt timestamp, the currentRoomId and the username
  * of the person publishing the message. We are then setting the state of newMessage to an empty String
  * In order to clear the message input box.
  */
  createMessage(newMessage) {
    console.log(this.props.currentRoom);
    this.messageRef.push({
      content: newMessage,
      createdAt: Date.now(),
      roomId: this.props.currentRoom.key,
      username: this.props.username
    });
      this.setState({ newMessage: ''});
  }

  /*
  * This method is taking a current room
  * It looks at all messages, and filters them down where the messages roomId is the same as the currentRooms Id
  * And returns this filtered list
  */
  getMessagesForThisChatRoom(currentRoom) {
    return this.state.allMessages.filter(message => message.roomId === currentRoom.key);
  }

  // This is a method that takes an event
  // It sets the state of newMessage to the events target value (Which is what the event text is what the user types)
  handleChange(e){
    this.setState({ newMessage: e.target.value })
  }

  // This is a method that takes an events
  // It prevents default form behavior (Refreshing or redirecting)
  // It calls createMessage with the current states newMessage
  handleSubmit(e){
    e.preventDefault();
    this.createMessage(this.state.newMessage)
  }

  render() {
    return(
      <section>
        <h2 className="current-room-name">{this.props.currentRoom ? this.props.currentRoom.name : ''}</h2>
        <div className="messagelist">
        <form className="newMessage" onSubmit={(e) => {this.handleSubmit(e)}}>
          <label>
            Create New Message :
            <input type="text" value={this.state.newMessage} onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
          <ul>
          {
            this.getMessagesForThisChatRoom(this.props.currentRoom).map(message  =>
              <li key={message.key}>
                <div>{message.username}</div>
                <div>{message.content}</div>
                <div>{message.createdAt}</div>
              </li>
            )
          }
          </ul>
        </div>
      </section>
    )
  }
}

export default MessgeList;
