import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import {Icon} from 'react-native-elements';
import { Input, Button, Header,SearchBar } from 'react-native-elements';
import firebase from 'firebase';
//mport HBRichTextEditor from 'react-native-richtext-editor/HBRichTextEditor';

export default class Experiences_edit extends Component {
  static navigationOptions = {
    title: 'me',
  };
  state = { currentUser: null, data:null, uid:null }
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
                User: {currentUser && currentUser.email}
              </Text>
            </View>
          </View>

          <View>
            <Text style={{fontSize:20}}>
              UID: {this.state.uid}
            </Text>
          </View>

          <View>
            <Button title="show experience" onPress={() => this.props.navigation.navigate('Experiences_show')} />
          </View>
          <View>
            <Button title="edit experience" onPress={() => this.props.navigation.navigate('Experiences_edit')} />
          </View>
          <View>
            <Button title="my Q&A" onPress={() => this.props.navigation.navigate('Experiences_show')} />
          </View>
        </View>


        <View>
          <Button title="Logout" onPress={this.handleLogout} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userIcon: {
    justifyContent: 'center'
  },
  main_view:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
})
