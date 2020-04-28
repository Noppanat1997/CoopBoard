import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { connect } from "react-redux";
import Messages from './chat/Messages';
import InfoBar from './chat/InfoBar';
import Input from './chat/Input';

import '../css/chat/Chat.css';

let socket;

const ChatBox = (props) => {
  const [name, setName] = useState(props.stateFromStore.user.displayName);
  //FIXME boardname
  const [room, setRoom] = useState('CoopBoard');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [state, setState] = useState({
    isShow: false
  });
  const ENDPOINT = 'https://mychatserve12.herokuapp.com';

  useEffect(() => {

    socket = io(ENDPOINT);

    setRoom(room);
    setName(props.stateFromStore.user.displayName)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }


  const toggleHandler = () => {
    setState({
      ...state,
      isShow: !state.isShow
    })
  }

  return (
    // <div className="outerContainer">
    <div className={!state.isShow ? 'my-chat-window' : 'my-chat-window-active'} style={{ "position": "absolute", "zIndex": "8" }}>
      {state.isShow ?
        <div className="my-container">
          <InfoBar room={room} users={users} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        : null
      }
      {/* <TextContainer users={users}/> */}
      <div
        className={(!state.isShow ? 'my-button' : 'my-button-active')}
        onClick={toggleHandler}
      >

      </div>
    </div>
    // </div>
  );
}
const mapStateToProps = (state) => {
  return {
    stateFromStore: state,
  };
};
export default connect(mapStateToProps, null)(ChatBox);
