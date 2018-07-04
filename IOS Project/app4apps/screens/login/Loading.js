// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase';

export default class Loading extends React.Component {
  componentDidMount(){
    const config={
          apiKey: "AIzaSyAGQKdIZv-AmRP2MJi2kjVs5ZHIlpaDIA8",
          authDomain: "app4apps-c2117.firebaseapp.com",
          databaseURL: "https://app4apps-c2117.firebaseio.com",
          projectId: "app4apps-c2117",
          storageBucket: "app4apps-c2117.appspot.com",
          messagingSenderId: "838478544202"
        };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user=>{
      this.props.navigation.navigate(user? 'me_Main' : 'Login')
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
