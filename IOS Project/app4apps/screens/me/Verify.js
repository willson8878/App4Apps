import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import {Icon} from 'react-native-elements';
import { Input, Button, Header,SearchBar } from 'react-native-elements';
import firebase from 'firebase';
//mport HBRichTextEditor from 'react-native-richtext-editor/HBRichTextEditor';

export default class Experiences_edit extends Component {
  static navigationOptions = {
    title: 'Verification',
  };
  state = { currentUser: null, data:null, uid:null, verified:null}
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
  }

  verification=()=>{
    // var actionCodeSettings = {
    //   url: 'https://www.example.com/?email=' + firebase.auth().currentUser.email,
    //   iOS: {
    //     bundleId: 'com.example.ios'
    //   },
    //   android: {
    //     packageName: 'com.example.android',
    //     installApp: true,
    //     minimumVersion: '12'
    //   },
    //   handleCodeInApp: true
    // };

    // firebase
    //   .auth()
    //   .currentUser
    //   .sendEmailVerification()
    //   .then(()=>this.setState({verified:"not edu mail"}),function(){})

      this.setState({verified:"not edu mail"})
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var userID=firebase.auth().currentUser.uid;
    this.setState({uid:userID});
    var database=firebase.database();
    var fet=database.ref('UID/'+userID)
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
      <View style={styles.main_view}>

        <View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Icon name='face' size={50}/>
            </View>
            <View>
              <Text style={{fontSize:20}}>
                {this.state.data && this.state.data.name}
              </Text>

            </View>
          </View>


          <Text style={{fontSize:20}}>
            {this.state.currentUser && this.state.currentUser.uid}
            {'\n'}
            {this.state.currentUser && this.state.currentUser.email}
            {'\n'}
            {this.state.currentUser && this.state.currentUser.isAnonymous}
            {'\n'}
            {this.state.currentUser && this.state.currentUser.displayName}
            {'\n'}
            {this.state.currentUser && this.state.currentUser.isEmailVerified}
            {'\n'}
            {this.state.verified}
          </Text>

          <View>
            <Button
            buttonStyle = {{
              backgroundColor: 'tomato'
            }}
            title="Send email to verify"
            onPress={this.verification} />
          </View>

          <View>
          <Text style={{fontSize:40}}> not verified </Text>
          </View>
        </View>


        <View>
          <Button
          buttonStyle = {{
            backgroundColor: 'tomato'
          }}
          title="Logout"
          onPress={this.handleLogout} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:10,
  },
  userIcon: {
    justifyContent: 'center'
  },
  main_view:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button:{
    backgroundColor: "rgba(92, 1,1, 1)",
    width: 300,
    height: 30,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
})
