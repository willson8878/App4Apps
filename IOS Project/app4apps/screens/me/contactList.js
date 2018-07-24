import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, TextInput, ListView, FlatList, Alert, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';
//import Swipeable from 'react-native-swipeable';

export default class ContactList extends Component {
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
      result:null
    };
  }

  static navigationOptions = {
    title: 'Contact list',
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

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var userID=firebase.auth().currentUser.uid;
    this.setState({uid:userID});
    var database=firebase.database();
    var a='a'
    var b='b'
    var fet=database.ref('users/'+userID+'/contactList')
                     .once('value')
                     .then((snapshot)=>{
                       this.setState({result:snapshot.val()});
                       var list=snapshot.val()
                       var result=[]
                       if (list[0]['name']=='none'){
                         result=null
                         this.setState({result})
                         Alert.alert('no info')
                         //pass
                       }
                       else{
                         for (var v in list){
                           //Alert.alert(v)
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
        data={this.state.result}

        renderItem={({ item }) =>
        <View style={styles.list}>
          <ListItem
            roundAvatar
            leftAvatar={<Image  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/app4apps-c2117.appspot.com/o/profile_images%2Favatar.jpeg?alt=media&token=04c5e227-8efa-4bf5-a48d-fe7e6c29e7ee' }}
                          style={{width: 40, height: 40}}
            />}
            title={`${item['name']}` }
            containerStyle={{ borderBottomWidth: 0 }}
            rightIcon={{name: 'chevron-right' }}
            onPress={()=>this.navigateToUser(item['uid'],item['name'])}
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
