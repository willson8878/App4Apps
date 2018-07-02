// Login.js
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

<Input  placeholder='BASIC INPUT'/>


export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    // TODO: Firebase stuff...
    const { email, password } = this.state;
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
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      
      <View style={styles.container}>
        <Text style = {styles.text_login}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Input
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
        />
        
        <Button 
          raised 
          title="Login" 
          buttonStyle = {{
            backgroundColor: 'tomato'
          }}
          onPress={this.handleLogin} />
        <Button 
          raised
          style={styles.butt_signup}
          buttonStyle = {{
            backgroundColor: 'tomato'
          }}
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
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
  text_login:{
    fontFamily: 'Iowan Old Style',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 100
  },
  butt_signup: {
    marginBottom: 150,    
  }
})
