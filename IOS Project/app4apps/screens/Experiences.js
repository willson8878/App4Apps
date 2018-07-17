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
      jsondata:null
    };
  }


    componentDidMount() {
      var data=fetch('https://app4apps-c2117.firebaseio.com/users.json')
                .then(response=>response.json())
                .then((json)=>{
                  this.setState({jsondata:json})
                  console.log(json)
                  var thisStr=JSON.stringify(json)
                  console.log(thisStr)
                  //var arr=thisStr.split(',')
                  //console.log(arr)
                  //console.log(typeof(arr))
                  arr=[]
                  for (const v in json){
                    for (const v1 in json[v]){
                      if (v1=='exp'){
                        console.log(json[v][v1]['expTitle'])
                        arr.push(json[v][v1]['expTitle'])
                      }
                     }
                  }

                  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                  var tmp=ds.cloneWithRows(arr)
                  console.log(tmp)
                  console.log(this.state.dataSource)
                  this.setState({data:arr});
                  //{this.state.data && this.state.data[0].name}
                })
    }



  render(){
    return (
      <View>
      <Header
        centerComponent={{ text: 'EXPERIENCES', style: { color: '#fff' },  fontSize: 10}}
        backgroundColor = 'tomato' />
      <FlatList
        style = {styles.list }
        data={this.state.data}

        renderItem={({ item }) =>
          <ListItem
            title={`${item}` }
            containerStyle={{ borderBottomWidth: 0 }}
            rightIcon={{name: 'chevron-right' }}
            onpress={()=>{console.log('click')}}
          />
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
  list: {
    marginBottom: 190,
  },
  searchButt:{
    marginTop:10,
    marginLeft:2
  },
  dropDown:{
  }
});
