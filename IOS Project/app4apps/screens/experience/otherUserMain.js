import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import { Icon, Input, Button, Header,SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';

export default class otherUserMain extends Component {

  state = { currentUser: null,
            myuid: null,
            data: null,
            uid:this.props.navigation.getParam('thisUID','fGaeYIYQ6Z1PWFOPT4GGPiEvqe2'),
            name:this.props.navigation.getParam('thisName','None')
          }


  static navigationOptions = (navigation) => {
    return{
      title: `${navigation.navigation.state.params.thisName}'s space`,
      headerStyle: {
        backgroundColor: 'tomato',
      },
      headerTintColor: '#fff',
    }
  }

  navigateToUserExp=(uid,name)=>{
    //console.log(uid)
    this.props.navigation.navigate('otherUserExp',{
      thisUID:uid,
      thisName:name
    })
  }

  navigateToUserProfile=(uid,name)=>{
    //console.log(uid)
    this.props.navigation.navigate('otherUserProfile',{
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

  addContactList=(uid,name)=>{

    var fet=firebase.database().ref('users/'+this.state.myuid+'/contactList')
                     .once('value')
                     .then((snapshot)=>{
                       //this.setState({data:snapshot.val()});
                       var mydata=snapshot.val()
                       if (mydata[0]['name']=='none'){
                         mydata[0]['name']=name
                         mydata[0]['uid']=uid
                       }else{
                         var sign=true
                         mydata.forEach((thisUID)=>{
                           if (thisUID['uid']==uid){
                             sign = false
                           }
                         })
                         var post={name:null,uid:null}
                         post.name=name
                         post.uid=uid
                         if (sign){mydata.push(post)}
                       }

                       firebase
                        .database()
                        .ref()
                        .update({
                          ['users/'+this.state.myuid+'/contactList']:mydata
                        })

                      })
                     .catch((error)=>{console.log(error);
                      });

    // firebase
    //   .database()
    //   .ref('users/'+this.state.myuid+'/contactList')
    //   .update({
    //     [this.state.uid]:messages,
    //   });
    Alert.alert('successful')
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var id1_userID=firebase.auth().currentUser.uid;
    this.setState({myuid:id1_userID});
    var userID=this.state.uid;
    //console.log(this.state.uid)
    var database=firebase.database();
    var fet=database.ref('users/'+userID)
                     .once('value')
                     .then((snapshot)=>{
                       this.setState({data:snapshot.val()});
                      })
                     .catch((error)=>{console.log(error);
                      });
    }



  render(){
    //const thisUID=this.props.navigation.getParam('thisUID','fGaeYIYQ6Z1PWFOPT4GGPiEvqe2')
    return (
      <View style={styles.main_view}>

        <View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Icon name='face' size={50}/>
            </View>
            <View>
              <Text style={{fontSize:20}}>
                {this.state.data && this.state.data.profile.name}
              </Text>

            </View>
          </View>

          <View>
            <Button
            buttonStyle = {{
              backgroundColor: 'tomato'
            }}
            title="profile"
            onPress={() => this.navigateToUserProfile(this.state.uid,this.state.name)} />
          </View>

          <View>
            <Button
              buttonStyle = {{
                backgroundColor: 'tomato'
              }}
              title="show experience (HTML)"
              onPress={() => this.navigateToUserExp(this.state.uid,this.state.name)} />
          </View>

          <View>
            <Button
              buttonStyle = {{
                backgroundColor: 'tomato'
              }}
              title="chat with him/her"
              onPress={() => this.navigateToUserChat(this.state.uid,this.state.name)} />
          </View>

        </View>

        <View>
          <Button
          buttonStyle = {{
            backgroundColor: 'tomato'
          }}
          title="add to my contact list"
          onPress={()=>this.addContactList(this.state.uid,this.state.name)} />
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
