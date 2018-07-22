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


import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
//import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
//import WebViewBridge from 'react-native-webview-bridge';
//import libraries

import React from 'react'
import { createSwitchNavigator, createBottomTabNavigator,createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

// import the different screens
import Loading from './screens/login/Loading'
import SignUp from './screens/login/SignUp'
import Login from './screens/login/Login'
import Main from './screens/login/Main'
import Schools from './screens/Schools'
import Experiences from './screens/Experiences'
import Verify from './screens/me/Verify'
import Experiences_show from './screens/me/Experiences_show'
import Experiences_edit from './screens/me/Experiences_edit'
import Web_editor from './screens/me/Web_editor'
import Experiences_edit_HTML from './screens/me/Experiences_edit_HTML'
import Experiences_show_HTML from './screens/me/Experiences_show_HTML'
import markDownEditor from './screens/me/markDownEditor'
import Profile from './screens/me/Profile'
import contactList from './screens/me/contactList'
import me_Main from './screens/me/me_Main'
import otherUserMain from './screens/experience/otherUserMain'
import otherUserExp from './screens/experience/otherUserExp'
import otherUserProfile from './screens/experience/otherUserProfile'
import chat from './screens/experience/chat'
// create our app's navigation stack



const me_control = createStackNavigator(
  {
  me_Main,
  Experiences_show,
  Experiences_edit,
  Experiences_edit_HTML,
  Experiences_show_HTML,
  Profile,
  markDownEditor,
  Verify,
  Web_editor,
  contactList,
  otherUserMain,
  otherUserExp,
  otherUserProfile,
  chat
  }
)
//for me
const Apps = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    me_control:{screen: me_control}
  },
  {
    initialRouteName: 'Loading'
  }
)

const experience_control = createStackNavigator(
  {
    Experiences,
    otherUserExp,
    otherUserProfile,
    otherUserMain,
    chat,
    login2:{screen: Apps}
  }
)

//tab
export const App = createBottomTabNavigator({
  Schools: {screen: Schools},
  Experiences: {screen: experience_control},
  Me: {screen: Apps},
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Schools') {
        iconName = `ios-list-box${focused ? '' : ''}`;
      } else if (routeName === 'Experiences') {
        iconName = `ios-chatboxes${focused ? '' : ''}`;
      } else if (routeName === 'Me') {
        iconName = `ios-contact${focused ? '' : ''}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    labelStyle: {fontSize: 13,},
  },
  animationEnabled: false,
  swipeEnabled: false,
}
);

export default App
