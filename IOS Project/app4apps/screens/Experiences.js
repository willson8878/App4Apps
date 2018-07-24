import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, TextInput, ListView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';
//import HBRichTextEditor from 'react-native-richtext-editor';
//import HBToolbar from 'react-native-richtext-editor/HBToolbar';

//var HBRichTextEditor = require('react-native-richtext-editor');
//var HBToolbar = require('react-native-richtext-editor/HBToolbar');
//import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';

export default class Experiences extends Component {
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
      result:['none']
    };
  }

  static navigationOptions = {
    title: 'Experiences',
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
      var data=fetch('https://app4apps-c2117.firebaseio.com/users.json')
                .then(response=>response.json())
                .then((json)=>{
                  this.setState({jsondata:json})
                  //console.log(json)
                  var thisStr=JSON.stringify(json)
                  //console.log(thisStr)
                  //console.log(typeof(thisStr))
                  arr=[]
                  result=[]
                  for (const v in json){
                    result.push([v,json[v]['exp']['expTitle'],json[v]['profile']['name']])
                    //console.log(v)
                    //console.log(json[v]['exp']['expDoc'])

                    for (const v1 in json[v]){
                      if (v1=='exp'){
                        //console.log(json[v][v1]['expTitle'])
                        arr.push(json[v][v1]['expTitle'])
                      }
                     }
                  }
                  //console.log(result)
                  this.setState({data:arr,result:result});

                })
    }



  // render(){
  //   return (
  //     <View>
  //     <FlatList
  //       style = {styles.list }
  //       data={this.state.data}
  //
  //       renderItem={({ item }) =>
  //         <ListItem
  //           title={`${item}` }
  //           containerStyle={{ borderBottomWidth: 0 }}
  //           rightIcon={{name: 'chevron-right' }}
  //           onPress={this.navigateToUser}
  //         />
  //       }
  //       ItemSeparatorComponent={this.renderSeparator}
  //
  //
  //     />
  //     </View>
  //   );
  // }


  render(){
    return (
      <View>
      <FlatList
        style = {styles.list }
        data={this.state.result}

        renderItem={({ item }) =>
        <View style={styles.list}>
          <ListItem
            title={`${item[1]}` }
            containerStyle={{ borderBottomWidth: 0 }}
            rightIcon={{name: 'chevron-right' }}
            onPress={()=>this.navigateToUser(item[0],item[2])}
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
    backgroundColor: '#ffffff',
    paddingTop: 40
  },
  richText: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  searchButt:{
    marginTop:10,
    marginLeft:2
  },
  dropDown:{
  },
  list: {
    paddingTop: 2
  },
});
