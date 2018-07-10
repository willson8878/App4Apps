import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar } from 'react-native-elements';
import firebase from 'firebase';
//import HBRichTextEditor from 'react-native-richtext-editor';
//import HBToolbar from 'react-native-richtext-editor/HBToolbar';

//var HBRichTextEditor = require('react-native-richtext-editor');
//var HBToolbar = require('react-native-richtext-editor/HBToolbar');
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';

export default class Experiences extends Component {
  state = { currentUser: null, htmlDoc:null, uid:null, data:null,htmlTitle:null }
  static navigationOptions = {
    title: 'test',
  };

  constructor(props) {
  super(props);
  this.getHTML = this.getHTML.bind(this);
  this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  markDownSubmit= () =>{
    //var userID=firebase.auth().currentUser.uid;
    const titleHtml =this.richtext.getTitleHtml();
    const contentHtml =this.richtext.getContentHtml();
    firebase
      .database()
      .ref('UID/'+this.state.uid)
      .update({
        ['expDoc2']:contentHtml
      });
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var userID=firebase.auth().currentUser.uid;
    this.setState({uid:userID});
    var fet=firebase.database().ref('UID/'+userID)
                     .once('value')
                     .then((snapshot)=>{
                       this.setState({data:snapshot.val(),htmlTitle:snapshot.val()['expTitle'],htmlDoc:snapshot.val()['expDoc2']});
                      })
                     .catch((error)=>{console.log(error);
                      });

  }

  render(){
    return (
      <View style={styles.container}>
          <RichTextEditor
              enableOnChange={ true }
              ref={(r)=>this.richtext = r}
              style={styles.richText}
              initialTitleHTML={this.state.htmlTitle}
              initialContentHTML={this.state.htmlDoc}
              editorInitializedCallback={() => this.onEditorInitialized()}
          />
          <RichTextToolbar
            getEditor={() => this.richtext}
          />
          <Button
             raised
             title="save and submit"
             buttonStyle = {{
               backgroundColor: 'tomato'
              }}
              onPress={this.markDownSubmit}
              />
      </View>
      //<View>
      // <HBRichTextEditor>
      // </HBRichTextEditor>
      // <HBToolbar />
      // </View>

    );
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }

  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
    //alert(titleHtml + ' ' + contentHtml)
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: 40
  },
  richText: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
