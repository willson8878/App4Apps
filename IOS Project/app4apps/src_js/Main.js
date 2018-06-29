// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from 'firebase';

export default class Main extends React.Component {
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

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button title="Logout" onPress={this.handleLogout} />
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
