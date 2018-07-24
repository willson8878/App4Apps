import React, { Component } from 'react';
import { Text, View,StyleSheet, TextInput, WebView, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar} from 'react-native-elements';
import firebase from 'firebase';

export default class Profile extends Component {
  static navigationOptions = {
    title: 'my profile',
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
  };
  state = { currentUser: null, uid:null, data:null, name:null, nationality:null }

  updateProfile=()=>{
    var userID=firebase.auth().currentUser.uid;
    var this_name=this.state.name
    postData={
      name:' ',
      nationality:' '
    }
    postData.name=this_name
    postData.nationality=this.state.nationality
    var updates={}
    updates['users/'+userID+'/profile/']=postData
    firebase.database()
            .ref()
            .update(updates)
            .then(()=>{Alert.alert('succeed')})

  }



  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var userID=firebase.auth().currentUser.uid;
    this.setState({uid:userID});
    var database=firebase.database();
    var fet=database.ref('users/'+userID)
                     .once('value')
                     .then((snapshot)=>{
                       this.setState({data:snapshot.val()});
                      })
                     .catch((error)=>{console.log(error);
                      });
  }



  render(){
    const { currentUser } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>name</Text>
        <View style={styles.input}>
        <Input
          placeholder={this.state.data && this.state.data.profile.name}
          autoCapitalize="none"
          style={styles.pinInputStyle}
          onChangeText={txt => this.setState({name:txt})}
          value={this.state.name}
        />
        </View>
        <Text style={styles.text}>nationality</Text>
        <View style={styles.input}>
        <Input
          placeholder={this.state.data && this.state.data.profile.nationality}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={txt => this.setState({nationality:txt})}
          value={this.state.nationality}
        />
        </View>
        <Button
          style={styles.button}
          raised
          title="Submit"
          buttonStyle = {{
            backgroundColor: 'tomato'
          }}
          onPress={this.updateProfile} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
    padding:5,
  },
  input:{
    alignItems: 'center',
  },
  text:{
    fontFamily: 'Iowan Old Style',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'left',
    paddingLeft:20
  },
  button: {
    marginTop: 50,
  },
  pinInputStyle:{
  },
})
