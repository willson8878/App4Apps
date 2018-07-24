import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet} from 'react-native';
import { Input, Button, Header,SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';

export default class otherUserExp extends Component {

  state = { currentUser: null,
            data:null,
            uid:this.props.navigation.getParam('thisUID','fGaeYIYQ6Z1PWFOPT4GGPiEvqe2'),
            name:this.props.navigation.getParam('thisName','None')
          }
  static navigationOptions = (navigation) => {
    return{
      title: `${navigation.navigation.state.params.thisName}'s profile`,
      headerStyle: {
        backgroundColor: 'tomato',
      },
      headerTintColor: '#fff',
      }
    }

  componentDidMount() {
    var userID=this.state.uid
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
    return (
      <View>
        <Text style={styles.text}>
        name:
        </Text>

        <Text style={styles.text}>
        {this.state.data && this.state.data.profile.name}
        </Text>

        <Text style={styles.text}>
        nationality:
        </Text>

        <Text style={styles.text}>
        {this.state.data && this.state.data.profile.nationality}
        </Text>

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
  text:{
    fontFamily: 'Iowan Old Style',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'left',
    paddingLeft:20
  }
})
