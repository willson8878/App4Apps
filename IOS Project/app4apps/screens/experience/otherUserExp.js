import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet} from 'react-native';
import { Input, Button, Header,SearchBar, ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';

export default class otherUserExp extends Component {

  state = { currentUser: null,
            data:null,
            uid:this.props.navigation.getParam('thisUID','fGaeYIYQ6Z1PWFOPT4GGPiEvqe2'),
            name:this.props.navigation.getParam('thisName','None')
          }

  static navigationOptions = (navigation) => {
    return{
      title: `${navigation.navigation.state.params.thisName}'s Experience`,
      headerStyle: {
        backgroundColor: 'tomato',
      },
      headerTintColor: '#fff',
    }
  }

  constructor(props) {
    super(props);
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  componentDidMount() {
    var userID=this.state.uid
    var database=firebase.database();
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
              enableOnChange={ false }
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
