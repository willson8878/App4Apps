import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar, Header } from 'react-native-elements';



export default class Schools extends Component {
    render(){
        return (
          <View>
          <Header
            centerComponent={{ text: 'SCHOOLS', style: { color: '#fff' },  fontSize: 10}}
            backgroundColor = 'tomato' />
          <SearchBar
            lightTheme
            round
            // onChangeText={someMethod}
            // onClearText={someMethod}  
            placeholder='School Name' />
        </View>
        );
      }
}

// const styles = StyleSheet.create({
//   header: {

//   }
// })