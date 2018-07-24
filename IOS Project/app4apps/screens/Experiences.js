import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, TextInput, ListView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar, ListItem } from 'react-native-elements';
import firebase from 'firebase';
import { InstantSearch } from 'react-instantsearch-native';
import {   connectSearchBox ,connectInfiniteHits } from 'react-instantsearch-native';
import { withNavigation } from 'react-navigation';

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
    // console.log(uid)
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

  render(){
    return (
      <View>

      <InstantSearch
          appId="1WT5B2KKV8"
          apiKey="c8aa603392f7ef683fa3ae0e83b32dc8"
          indexName="app4apps_firebase" >
           <SearchBox />
          <Hits/>
      
      </InstantSearch>


      </View>
    );
  }

}

const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {
  /* if there are still results, you can
  call the refine function to load more */
  const onEndReached = function() {
    if (hasMore) {
      refine();
    }
  };

  return (
    <FlatList
      data={hits}
      onEndReached={onEndReached}
      style = {styles.list }
      keyExtractor={(item, index) => item.objectID}
      renderItem={({ item }) => {
        return(
        <ListItem
          title={`${item.exp.expTitle}` }
          subtitle={"Auther: "+`${item.profile.name}`}
          containerStyle={{ borderBottomWidth: 0 }}
          rightIcon={{name: 'chevron-right' }}
          onPress={()=>this.navigateToUser(item.objectID,item.profile.name)}
        />
      );
      }}
      ItemSeparatorComponent={this.renderSeparator}
    
    />
  );
});


const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {

  const styles = {
    height: 60,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    flex: 1,
  };

  return (

    <SearchBar
    round
    lightTheme
    placeholder='Search a key word...'
    Icon={{ type: 'font-awesome', name: 'search' } }
    onChangeText={text => refine(text)}
    value={currentRefinement}
    />
  );
});

renderSeparator = () => {
  return (
    <View
      style={{height: 1,  backgroundColor: "#CED0CE",}}
    />
  );
};

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

