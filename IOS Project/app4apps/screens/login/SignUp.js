// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Input, Button } from 'react-native-elements';

import firebase from 'firebase';

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }
handleSignUp = () => {
  // TODO: Firebase stuff...
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
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
}
render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.text_SignUp}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Input
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          value={this.state.email}
        />
        <Input
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          style={styles.butt_login}
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text_SignUp:{
    fontFamily: 'Iowan Old Style',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 100
  },
  butt_login: {
    marginBottom: 150,    
  }
})
