import React, { Component } from 'react';
import { Text, View, TextInput} from 'react-native';
import { Input, Button, Header,SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat'

export default class chat extends Component {
  state = {
    messages: [],

    myuid: null,
    currentUser: null,
    uid:this.props.navigation.getParam('thisUID','fGaeYIYQ6Z1PWFOPT4GGPiEvqe2'),
    name:this.props.navigation.getParam('thisName','None')
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var id1_userID=firebase.auth().currentUser.uid;
    var id2_userID=this.state.uid;
    this.setState({myuid:id1_userID});
    // this.setState({
    //       messages: [
    //         {
    //           _id: 2,
    //           text: 'Hello developer001',
    //           createdAt: new Date(),
    //           user: {
    //             _id: 2,
    //             name: 'React Native',
    //             avatar: 'https://placeimg.com/140/140/any',
    //           },
    //         },
    //         {
    //           _id: 1,
    //           text: 'Hello developer002',
    //           createdAt: new Date(),
    //           user: {
    //             _id: 2,
    //             name: 'React Native',
    //             avatar: 'https://placeimg.com/140/140/any',
    //           },
    //         },
    //       ],
    //     })

    this.getMessages(id1_userID,id2_userID)
  }

  getMessages=(myID,chatID)=>{
    var fet=firebase.database().ref('users/'+myID+'/chat')
                     .once('value')
                     .then((snapshot)=>{

                       var correct_messages=[]
                       var rev_messages=snapshot.val()[chatID]
                       // for (i in rev_messages){
                       //   correct_messages.push(rev_messages[rev_messages.length-i-1])
                       // }
                       var correct_messages=rev_messages.sort((a,b)=> (new Date(b.createdAt))-(new Date(a.createdAt)))
                       //var correct_messages=rev_messages
                       this.setState({data:snapshot.val(),
                                      messages: correct_messages
                                    });
                      //console.log(typeof(new Date(correct_messages[0].createdAt)))
                      //console.log((new Date(correct_messages[0].createdAt))-(new Date(correct_messages[1].createdAt)))
                      //console.log(snapshot.val()[chatID])
                      //console.log(correct_messages)
                      })
                     .catch((error)=>{console.log(error);
                      });
  }

  dofirebase=(messages)=>{

    firebase
      .database()
      .ref('users/'+this.state.myuid+'/chat')
      .update({
        [this.state.uid]:messages,
      });

    var messages1=[]
    messages.forEach((message)=>{
      messages1.push(JSON.parse(JSON.stringify(message)))
    })


    messages1.forEach((message)=>{
      if (message.user._id==1){
        message.user._id=2
      }
      else
      {
        message.user._id=1
      }
    })
    console.log(messages1)

    if (this.state.myuid != this.state.uid){
      firebase
        .database()
        .ref('users/'+this.state.uid+'/chat')
        .update({
          [this.state.myuid]:messages1,
        });
    }
    // firebase
    //   .database()
    //   .ref('users/'+this.state.uid+'/exp')
    //   .update({
    //     ['expTitle']:this.state.htmlTitle,
    //     ['expDoc']:this.state.htmlDoc
    //   });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),

    }))
    console.log(this.state.messages.length)
    uploadMessages=[]
    //this.state.messages.forEach((message)=>uploadMessages.push(message))
    for (message in this.state.messages){
      uploadMessages.push(this.state.messages[message])
    }
    uploadMessages.push(messages[0])
    this.dofirebase(uploadMessages)
    console.log(uploadMessages)
    //console.log(messages)


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
