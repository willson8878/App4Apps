import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar } from 'react-native-elements';
import firebase from 'firebase';
import { MarkdownView } from 'react-native-markdown-view'
//mport HBRichTextEditor from 'react-native-richtext-editor/HBRichTextEditor';

export default class Experiences_show extends Component {
  static navigationOptions = {
    title: 'experience',
  };
  state = { currentUser: null, data:null, uid:null}
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
  }

  componentDidMount() {

    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var userID=firebase.auth().currentUser.uid;
    var database=firebase.database();
    var fet=database.ref('UID/'+userID)
                     .once('value')
                     .then((snapshot)=>{
                       this.setState({data:snapshot.val(),uid:userID});
                      })
                     .catch((error)=>{console.log(error);
                      });
  }


  render(){
    const { currentUser } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex:1}}>
        {
        // <View>
        //
        //   <Text style={styles.baseText}>
        //     {this.state.data && this.state.data['experience doc']}
        //     </Text>
        // </View>
        }

        <MarkdownView>
          {this.state.data && this.state.data['experience doc']}
        </MarkdownView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  baseText: {
    fontSize: 24,
    fontFamily: 'Cochin'
  }
})
