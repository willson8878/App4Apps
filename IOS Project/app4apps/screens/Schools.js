import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Picker } from 'react-native';
import { SearchBar, Header,List, ListItem, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

export default class Schools extends Component {
  
  state = {
    data: [],
    school_name: '',
    statesList: [
      {value: "AL"},
      {value: "AK"}, 
      {value: "AZ"}, 
      {value: "AR"}, 
      {value: "CA"}, 
      {value: "CO"}, 
      {value: "CT"}, 
      {value: "DE"}, 
      {value: "FL"}, 
      {value: "GA"}, 
      {value: "HI"}, 
      {value: "ID"}, 
      {value: "IL"}, 
      {value: "IN"}, 
      {value: "A"}, 
      {value: "KS"}, 
      {value: "KY"}, 
      {value: "LA"}, 
      {value: "ME"}, 
      {value: "MD"}, 
      {value: "MA"}, 
      {value: "MI"}, 
      {value: "MN"}, 
      {value: "MS"}, 
      {value: "MO"}, 
      {value: "MT"}, 
      {value: "NE"}, 
      {value: "NH"}, 
      {value: "NJ"}, 
      {value: "NM"}, 
      {value: "NY"}, 
      {value: "NC"}, 
      {value: "ND"}, 
      {value: "OH"}, 
      {value: "OK"}, 
      {value: "OR"}, 
      {value: "PA"}, 
      {value: "RI"}, 
      {value: "SC"}, 
      {value: "SD"}, 
      {value: "TN"}, 
      {value: "TX"}, 
      {value: "UT"}, 
      {value: "VT"}, 
      {value: "VA"}, 
      {value: "WA"}, 
      {value: "WV"}, 
      {value: "WI"}, 
      {value: "WY"}
      ],
    state_name:'',
    programs:[{value: 'One-year',},{value: 'Two-year',}, {value: 'Three-year',},{value: 'Four-year',}],
    school_programs:'',
    api_key: '&api_key=VRGlS5cNlBYHjSeT1grp2yEK3b5mPqNMsltPcYit',
    output: '&_fields=id,school.name,school.state,school.city,school.degrees_awarded.predominant'
  }

  school_prog(){

    if (this.state.school_programs == 'One-year'){
      return '&school.degrees_awarded.predominant=0';
    }
    if (this.state.school_programs == 'Two-year'){
      return '&school.degrees_awarded.predominant=1';
    }
    if (this.state.school_programs == 'Three-year'){
      return '&school.degrees_awarded.predominant=2';
    }
    if (this.state.school_programs == 'Four-year'){
      return '&school.degrees_awarded.predominant=3';
    }
    return '';
  }

  school_name(){
    if (this.state.school_name != ''){
      console.log("&school.name=" + this.state.school_name.replace(' ', '%20'));
      return "&school.name=" + this.state.school_name.replace(' ', '%20');
    }
    return '';
  }

  state_name(){
    if (this.state.state_name != "") {
      return "&school.state=" + this.state.state_name;
    }
    return '';
  }


  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    response = await fetch("https://api.data.gov/ed/collegescorecard/v1/schools.json?"
                          +this.school_name()
                          +this.state_name()
                          +this.school_prog()
                          +this.state.output
                          +this.state.api_key);
    const json = await response.json();
    this.setState({ data: json.results });
  };
  
  renderSeparator = () => {
    return (
      <View
        style={{height: 1,  backgroundColor: "#CED0CE",}}
      />
    );
  };

  
  render(){
      return (
        <View>
        <Header
          centerComponent={{ text: 'SCHOOLS', style: { color: '#fff' },  fontSize: 10}}
          backgroundColor = 'tomato' />

        <SearchBar
          round
          lightTheme
          placeholder='School Name'
          Icon={{ type: 'font-awesome', name: 'search' } }
          onChangeText={school_name => this.setState({ school_name })}
          />

        <View 
        style={{ flexDirection: 'row'}}
        >
          <View style={{ width: 120, marginLeft: 10}}>
          <Dropdown
              style = {styles.dropDown}
              label='Select a state'
              itemCount = {10}
              animationDuration={100}
              data={this.state.statesList}
              onChangeText={state_name => this.setState({ state_name })}
            />
          </View>

          <View style={{ width: 170, marginLeft: 10}}>
            <Dropdown
              style = {styles.dropDown}
              label='Choose a program'
              itemCount = {10}
              animationDuration={100}
              data={this.state.programs}
              onChangeText={school_programs => this.setState({ school_programs })}
            />
          </View>

          <View >
          <Button 
              style = {styles.searchButt}
              raised
              buttonStyle = {{
                backgroundColor: 'tomato'
              }}
              icon={{name: 'search', size: 50}}
              title='' 
              onPress = {this.fetchData}
            />
          </View>

        </View>
      

        <FlatList
          style = {styles.list }
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            <ListItem
            title={`${item['school.name']}` }
            subtitle={"Location: "+`${item['school.city']}` +", " +  `${item['school.state']}`}
            containerStyle={{ borderBottomWidth: 0 }}
            rightIcon={{name: 'chevron-right' }}
            
            />
          }
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />

          
      </View>
      );
  }
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 190,
  },
  searchButt:{
    marginTop:10,
    marginLeft:2
  },
  dropDown:{
  }
})