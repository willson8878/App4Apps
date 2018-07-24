import React, { Component } from 'react';
import { Text, View,StyleSheet, TextInput, WebView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar } from 'react-native-elements';
import firebase from 'firebase';
import { MarkdownEditor } from 'react-native-markdown-editor';
import { MarkdownView } from 'react-native-markdown-view'
//import WebViewBridge from 'react-native-webview-bridge';
//mport HBRichTextEditor from 'react-native-richtext-editor/HBRichTextEditor';

export default class Profile extends Component {
  state = { currentUser: null, markDown:null, uid:null, data:null }
  static navigationOptions = {
    title: 'Web editor',
  };



  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var userID=firebase.auth().currentUser.uid;
  }



  render(){
    const { currentUser,markDown } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <WebView
        source={{uri: 'https://app4apps-c2117.firebaseapp.com/'}}
        style={{marginTop: 20}}
      />
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
