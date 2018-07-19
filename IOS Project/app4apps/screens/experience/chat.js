import React, { Component } from 'react';
import { Text, View, TextInput} from 'react-native';
import { Input, Button, Header,SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat'

export default class chat extends Component {
  state = {
    messages: [],
    myuid= null,
    currentUser: null,
    uid:this.props.navigation.getParam('thisUID','fGaeYIYQ6Z1PWFOPT4GGPiEvqe2'),
    name:this.props.navigation.getParam('thisName','None')
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var id1_userID=firebase.auth().currentUser.uid;
    var id2_userID=this.state.uid;
    this.setState({myuid:userID});
    this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        })
  }

  dofirebase=()=>{
    firebase
      .database()
      .ref('users/'+this.state.uid+'/exp')
      .update({
        ['expTitle']:this.state.htmlTitle,
        ['expDoc']:this.state.htmlDoc
      });
    firebase
      .database()
      .ref('users/'+this.state.uid+'/exp')
      .update({
        ['expTitle']:this.state.htmlTitle,
        ['expDoc']:this.state.htmlDoc
      });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),

    }))
    console.log(this.state.messages)
    console.log(messages)


  }


  render(){
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }

}
