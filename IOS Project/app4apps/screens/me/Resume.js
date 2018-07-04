import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar } from 'react-native-elements';
import firebase from 'firebase';
//mport HBRichTextEditor from 'react-native-richtext-editor/HBRichTextEditor';

export default class Experiences_edit extends Component {
  state = { currentUser: null }
  handleLogout = () => {
    // TODO: Firebase stuff...
    //const { email, password } = this.state;
    // const config={
    //       apiKey: "AIzaSyAGQKdIZv-AmRP2MJi2kjVs5ZHIlpaDIA8",
    //       authDomain: "app4apps-c2117.firebaseapp.com",
    //       databaseURL: "https://app4apps-c2117.firebaseio.com",
    //       projectId: "app4apps-c2117",
    //       storageBucket: "app4apps-c2117.appspot.com",
    //       messagingSenderId: "838478544202"
    //     };
    // firebase.initializeApp(config);
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
  }

  componentDidMount() {
    // const config={
    //       apiKey: "AIzaSyAGQKdIZv-AmRP2MJi2kjVs5ZHIlpaDIA8",
    //       authDomain: "app4apps-c2117.firebaseapp.com",
    //       databaseURL: "https://app4apps-c2117.firebaseio.com",
    //       projectId: "app4apps-c2117",
    //       storageBucket: "app4apps-c2117.appspot.com",
    //       messagingSenderId: "838478544202"
    //     };
    // firebase.initializeApp(config);
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }


  render(){
    const { currentUser } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Header
        centerComponent={{ text: 'Resume', style: { color: '#fff' },  fontSize: 10}}
        backgroundColor = 'tomato'
      />
      <Text>
        Hi {currentUser && currentUser.email}!
      </Text>
      <Button title="Logout" onPress={this.handleLogout} />

      <Button title="Main" onPress={() => this.props.navigation.navigate('Main')} />
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
