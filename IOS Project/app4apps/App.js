//
// import React, { Component } from 'react';
// import { View, Text, Button, StyleSheet, TextInput} from 'react-native';
// import { createStackNavigator } from 'react-navigation';
// import firebase from 'firebase';
//
// //screen of login
// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Login',
//   };
//
//   constructor(props) {
//       super(props);
//       this.state = { text1: '    ',text2: '    ',emailAccount: 'b '};
//     }
//   componentDidMount(){
//     const config={
//       apiKey: "AIzaSyAGQKdIZv-AmRP2MJi2kjVs5ZHIlpaDIA8",
//       authDomain: "app4apps-c2117.firebaseapp.com",
//       databaseURL: "https://app4apps-c2117.firebaseio.com",
//       projectId: "app4apps-c2117",
//       storageBucket: "app4apps-c2117.appspot.com",
//       messagingSenderId: "838478544202"
//     };
//     firebase.initializeApp(config);
//     var database=firebase.database();
//     var data=database.ref('Users/1/experience doc')
//                      .once('value')
//                      .then((snapshot)=>{
//                        console.log(snapshot.val())
//                        this.setState({emailAccount:snapshot.val()});
//                      })
//                      .catch((error)=>{console.log(error);
//                      });
//   }
//
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View style={styles.container}>
//       <Text>{this.state.emailAccount}</Text>
//         <Text>account</Text>
//
//         <TextInput
//                 style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//                 placehloder="name"
//                 onChangeText={(text1) => this.setState({text1})}
//                 value={this.state.text}
//               />
//
//         <Text>password</Text>
//
//         <TextInput
//                 style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//                 placehloder="name"
//                 onChangeText={(text2) => this.setState({text2})}
//                 value={this.state.text}
//               />
//
//         <Button
//           title="login"
//           onPress={() =>
//             navigate('Profile', { name: 'Jane' })
//           }
//         />
//
//         <Button
//           title="register"
//           onPress={() =>
//             navigate('Profile', { name: 'Jane' })
//           }
//         />
//
//         <Button
//           title="pass this step"
//           onPress={() =>
//             navigate('MainScreen', { name: 'Jane' })
//           }
//         />
//       </View>
//
//     );
//   }
// }
//
// class ProfileScreen extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>ProfileScreen</Text>
//       </View>
//     );
//   }
// }
//
// //initiall screen with three bottom bar
// class MainScreen extends Component{
//   // static navigationOptions = {
//   //   title: 'main',
//   // };
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>MainScreen</Text>
//       </View>
//     );
//   }
//
// }
//
// export default createStackNavigator({
//   Home: {
//     screen: HomeScreen
//   },
//   Profile:{
//     screen: ProfileScreen
//   },
//   MainScreen:{
//     screen: MainScreen
//   }
// });
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     padding:10,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   TextInput: {
//     height:40,
//   },
// });

import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'
// import the different screens
import Loading from './src_js/Loading'
import SignUp from './src_js/SignUp'
import Login from './src_js/Login'
import Main from './src_js/Main'
// create our app's navigation stack
const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App
