import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { SwitchNavigator, createBottomTabNavigator } from 'react-navigation'

export default class Me extends Component {

    render(){
        return (
          <View style = {
            {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
            }
        }>
          <Text style={{fontSize: 30}}>Me Page</Text>
        </View>
        );
      }
}
