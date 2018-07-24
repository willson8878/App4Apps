import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {Icon} from 'react-native-elements';
import { Input, Button, Header,SearchBar } from 'react-native-elements';
import firebase from 'firebase';
//mport HBRichTextEditor from 'react-native-richtext-editor/HBRichTextEditor';

export default class Experiences_edit extends Component {
  static navigationOptions = {
    title: 'me',
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
  };

  state = { currentUser: null, data:null, uid:null}
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
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

  // componentWillMount() {
  //   const { currentUser } = firebase.auth()
  //   this.setState({ currentUser })
  //   var userID=firebase.auth().currentUser.uid;
  //   this.setState({uid:userID});
  //   var database=firebase.database();
  //   var fet=database.ref('users/'+userID)
  //                    .once('value')
  //                    .then((snapshot)=>{
  //                      this.setState({data:snapshot.val()});
  //                     })
  //                    .catch((error)=>{console.log(error);
  //                     });
  // }


  render(){
    const { currentUser } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main_view}>

        <View >
          <View style={{flexDirection: 'row',padding:20}}>
            <View>
              <Image  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/app4apps-c2117.appspot.com/o/profile_images%2Favatar.jpeg?alt=media&token=04c5e227-8efa-4bf5-a48d-fe7e6c29e7ee' }}
                            style={{width: 40, height: 40}}
              />
            </View>
            <View>
              <Text style={{fontSize:30, paddingLeft:20}}>
                {this.state.data && this.state.data.profile.name}
              </Text>

            </View>
          </View>

          <View style={{paddingBottom:30}}>
            <Button
            buttonStyle = {{
              backgroundColor: 'tomato'
            }}
            title="verify account"
            onPress={() => this.props.navigation.navigate('Verify')} />
          </View>

          <View style={styles.list}>
            <Button
            buttonStyle = {{
              backgroundColor: 'tomato'
            }}
            title="my profile"
            onPress={() => this.props.navigation.navigate('Profile')} />
          </View>
          <View style={{paddingBottom:30}}>
            <Button
            buttonStyle = {{
              backgroundColor: 'tomato'
            }}
            title="my experience"
            onPress={() => this.props.navigation.navigate('Experiences_edit_HTML')} />
          </View>


          {
          // <View style={styles.list}>
          //   <Button
          //       buttonStyle = {{
          //         backgroundColor: 'tomato'
          //       }}
          //       title="show experience (dep!)"
          //       onPress={() => this.props.navigation.navigate('Experiences_show')} />
          // </View>
          // <View style={styles.list}>
          //   <Button
          //     buttonStyle = {{
          //       backgroundColor: 'tomato'
          //     }}
          //     title="edit experience (dep!)"
          //     onPress={() => this.props.navigation.navigate('markDownEditor')} />
          // </View>
          // <View style={styles.list}>
          //   <Button
          //     buttonStyle = {{
          //       backgroundColor: 'tomato'
          //     }}
          //     title="show experience (HTML)"
          //     onPress={() => this.props.navigation.navigate('Experiences_show_HTML')} />
          // </View>
          // <View style={styles.list}>
          //   <Button
          //     buttonStyle = {{
          //       backgroundColor: 'tomato'
          //     }}
          //     title="WebView"
          //     onPress={() => this.props.navigation.navigate('Web_editor')} />
          // </View>
        }

          <View style={styles.list}>
            <Button
              buttonStyle = {{
                backgroundColor: 'tomato'
              }}
              title="ContactList"
              onPress={() => this.props.navigation.navigate('contactList')} />
          </View>
          <View style={styles.list}>
            <Button
              buttonStyle = {{
                backgroundColor: 'tomato'
              }}
              title="messageBox"
              onPress={() => this.props.navigation.navigate('messageBox')} />
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
  },
  list:{
    paddingBottom:2
  }
})
