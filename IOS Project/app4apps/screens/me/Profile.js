import React, { Component } from 'react';
import { Text, View,StyleSheet, TextInput, WebView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar } from 'react-native-elements';
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
      <View>
        <Text>
          My profile page
        </Text>

        <Input
          placeholder={this.state.data && this.state.data.profile.name}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={txt => this.setState({name:txt})}
          value={this.state.name}
        />
        <Input
          placeholder={this.state.data && this.state.data.profile.nationality}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={txt => this.setState({nationality:txt})}
          value={this.state.nationality}
        />
        <Button
          raised
          title="update my profile"
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
    justifyContent: 'center',
    alignItems: 'center'
  }
})
