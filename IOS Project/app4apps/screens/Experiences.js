import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Header,SearchBar } from 'react-native-elements';

export default class Experiences extends Component {
  render(){
    return (
      <View>
      <Header
        centerComponent={{ text: 'EXP & QA', style: { color: '#fff' },  fontSize: 10}}
        backgroundColor = 'tomato'
      />
      
    </View>
    );
  }
}