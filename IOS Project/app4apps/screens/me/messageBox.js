import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, TextInput, Alert, ListView, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar, ListItem, List, Avatar } from 'react-native-elements';
import firebase from 'firebase';
//import Swipeable from 'react-native-swipeable';

export default class messageBox extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      currentUser: null,
      data:ds.cloneWithRows(['none']),
      datashow:null,
      uid:null,
      jsondata:['row 1', 'row 2'],
      result:null,
      messageUser:null
    };
  }

  static navigationOptions = {
    title: 'Message Box',
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
  };

  navigateToUser=(uid,name)=>{
    //console.log(uid)
    this.props.navigation.navigate('otherUserMain',{
      thisUID:uid,
      thisName:name
    })
  }

  navigateToUserChat=(uid,name)=>{
    //console.log(uid)
    this.props.navigation.navigate('chat',{
      thisUID:uid,
      thisName:name
    })
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var userID=firebase.auth().currentUser.uid;
    this.setState({uid:userID});
    var database=firebase.database();

    var fet=database.ref('users/')
                     .once('value')
                     .then((snapshot)=>{
                       //console.log(snapshot.val())
                       for (v in snapshot.val()){
                         if (v==userID){
                           allChat=snapshot.val()[v]['chat']
                           users=[]
                           for (v in allChat){
                             users.push(v)
                           }
                           names=[]
                           messageUser=[]
                           //console.log(users)
                           for (v in users){
                             user=users[v]
                             //console.log(snapshot.val()[user]['profile']['name'])
                             messageUser.push([user,snapshot.val()[user]['profile']['name']])
                           }
                           this.setState({messageUser:messageUser})
                           //console.log(messageUser)

                         }
                       }
                      })
                     .catch((error)=>{console.log(error);
                      });

  }



  render(){
    return (
      <View style={styles.container}>

      <FlatList
        style = {styles.list }
        data={this.state.messageUser}

        renderItem={({ item }) =>
        <View style={styles.list}>
          <ListItem
            roundAvatar
            leftAvatar={<Image  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/app4apps-c2117.appspot.com/o/profile_images%2Favatar.jpeg?alt=media&token=04c5e227-8efa-4bf5-a48d-fe7e6c29e7ee' }}
                            style={{width: 40, height: 40}}
            />}
            title={`${item[1]}`}
            containerStyle={{ borderBottomWidth: 0 }}
            rightIcon={{name: 'chevron-right' }}
            onPress={()=>this.navigateToUserChat(item[0],item[1])}
          />
        </View>
        }

        ItemSeparatorComponent={this.renderSeparator}


      />

      </View>
    );
  }





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

  },
  list: {
    paddingTop: 2
  },

});
