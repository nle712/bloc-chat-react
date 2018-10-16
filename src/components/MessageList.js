import React, { Component } from 'react';



class MessgeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: []
    }
    this.messageRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messageRef.on('child_added' , (snapshot) => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message)});
    })
  }

  componentWillReceiveProps(nextProps) {
    this.displayMessages(nextProps.currentRoom);
  }

  createMessage(newMessage) {
    this.messageRef.push({
      content: newMessage,
      createdAt: Date.now(),
      roomId: this.props.currentRoom,
      username: this.props.user
    });
      this.setState({ newMessage: ' '});
  }

  displayMessages(currentRoom) {
    this.setState({newMessage: this.state.messages.filter(message => message.roomId === currentRoom.key)});
  }

  handleChange(e){
    this.setState({ newMessage: e.target.value })
  }

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
            this.state.messages.map( message  =>
              <li key={message.key}>
                <div>{message.username}</div>
                <div>{message.content}</div>
                <div>{message.sentAt}</div>
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
