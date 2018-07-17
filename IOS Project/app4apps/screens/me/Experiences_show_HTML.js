import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, TextInput} from 'react-native';
import { Input, Button, Header,SearchBar, Icon } from 'react-native-elements';
import firebase from 'firebase';
//import HBRichTextEditor from 'react-native-richtext-editor';
//import HBToolbar from 'react-native-richtext-editor/HBToolbar';

//var HBRichTextEditor = require('react-native-richtext-editor');
//var HBToolbar = require('react-native-richtext-editor/HBToolbar');
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';

export default class Experiences extends Component {
  state = { currentUser: null, htmlDoc:null, uid:null, data:null,htmlTitle:null,like:0,dislike:0}
  static navigationOptions = {
    title: 'Experiences',
  };

  constructor(props) {
  super(props);
  this.getHTML = this.getHTML.bind(this);
  this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  markDownSubmit=() =>{
    //var userID=firebase.auth().currentUser.uid;
    const titleHtml =this.richtext.getTitleHtml();
    const contentHtml =this.richtext.getContentHtml();
    titleHtml.then(text=>{this.setState({htmlTitle:text});this.dofirebase()})
    contentHtml.then(text=>{this.setState({htmlDoc:text});this.dofirebase()})
    //this.getText()
    // firebase
    //   .database()
    //   .ref('UID/'+this.state.uid)
    //   .update({
    //     //['expDoc2']:this.state.htmlDoc
    //     ['expTitle']:this.state.htmlTitle,
    //     ['expDoc2']:this.state.htmlDoc
    //   });
    //console.log(contentHtml)
  }

  dofirebase=()=>{
    firebase
      .database()
      .ref('users/'+this.state.uid+'/exp')
      .update({
        //['expDoc2']:this.state.htmlDoc
        ['expTitle']:this.state.htmlTitle,
        ['expDoc']:this.state.htmlDoc
      });
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var userID=firebase.auth().currentUser.uid;
    this.setState({uid:userID});
    var fet=firebase.database().ref('users/'+userID+'/exp')
                     .once('value')
                     .then((snapshot)=>{
                       this.setState({data:snapshot.val(),
                                      htmlTitle:snapshot.val()['expTitle'],
                                      htmlDoc:snapshot.val()['expDoc'],
                                      like:snapshot.val()['expLike'],
                                      dislike:snapshot.val()['expDislike']
                                    });
                      })
                     .catch((error)=>{console.log(error);
                      });


  }

  render(){
    return (
      <View style={styles.container}>
          <RichTextEditor
              enableOnChange={ true }
              hideTitle={false}
              ref={(r)=>this.richtext = r}
              style={styles.richText}
              initialTitleHTML={this.state.htmlTitle}
              initialContentHTML={this.state.htmlDoc}
              OnChange={text => this.setState({htmlDoc:text})}
              editorInitializedCallback={() => this.onEditorInitialized()}
          />
          <View style={{flexDirection: 'row'}}>
          <View>
            <Text>         </Text>
          </View>
            <View>
              <Icon name='mood' size={50}/>
            </View>
            <View>
              <Text style={{fontSize:40}}>: {this.state.like}</Text>
            </View>
            <View>
              <Text>                             </Text>
            </View>
            <View>
              <Icon name='close' size={50}/>
            </View>
            <View>
              <Text style={{fontSize:40}}>:{this.state.dislike}</Text>
            </View>
          </View>
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
