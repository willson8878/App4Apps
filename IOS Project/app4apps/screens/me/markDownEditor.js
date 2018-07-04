import React, { Component } from 'react';
import { Text, View,StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar } from 'react-native-elements';
import firebase from 'firebase';
import { MarkdownEditor } from 'react-native-markdown-editor';
import { MarkdownView } from 'react-native-markdown-view'
//mport HBRichTextEditor from 'react-native-richtext-editor/HBRichTextEditor';

export default class Experiences_edit extends Component {
  state = { currentUser: null, markDown:null, uid:null, data:null }
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
  }

  markDownSubmit= () =>{
    //var userID=firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref('UID/'+this.state.uid)
      .update({
        ['experience doc']:this.state.markDown
      });
  }

  // getOriginText= () =>{
  // }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var userID=firebase.auth().currentUser.uid;
    this.setState({uid:userID});
    var fet=firebase.database().ref('UID/'+userID)
                     .once('value')
                     .then((snapshot)=>{
                       this.setState({data:snapshot.val(),markDown:snapshot.val()['experience doc']});
                      })
                     .catch((error)=>{console.log(error);
                      });
  }


  render(){
    const { currentUser,markDown } = this.state;
    const { navigate } = this.props.navigation;
    return (
    //   <View>
    //   <Header
    //     centerComponent={{ text: 'Resume', style: { color: '#fff' },  fontSize: 10}}
    //     backgroundColor = 'tomato'
    //   />
    //   <Text>
    //     Hi {currentUser && currentUser.email}!
    //   </Text>
    //   <Button title="Logout" onPress={this.handleLogout} />
    //
    //   <Button title="Main" onPress={() => this.props.navigation.navigate('Main')} />
    // </View>
    <View style={{flex:0.7}}>
    <MarkdownEditor onMarkdownChange={(markDown) => this.setState({markDown})}/>
      <View>

      <TextInput
          style={{height: 40}}
          value={this.state.markDown}
          onChangeText={text => this.setState({markDown:text})}
        />

      <MarkdownView>
        {this.state.markDown}
      </MarkdownView>

      <Button
         raised
         title="save and submit"
         buttonStyle = {{
           backgroundColor: 'tomato'
          }}
          onPress={this.markDownSubmit}
          />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
