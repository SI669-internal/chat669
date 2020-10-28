import React from 'react';
import { TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { peopleStyles, colors } from './Styles';

export class PeopleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [
        { 
          displayName: 'Mark Newman',
          key: 'mwnewman@umich.edu'
        },
        {
          displayName: 'Pants McKinley',
          key: 'pants@mckinley.com'
        },
        {
          displayName: 'Jane Doe',
          key: 'janedoe@janedoe.org'
        }
      ]
    }
  }

  render() {
    return (
      <View style={peopleStyles.container}>
        <View style={peopleStyles.peopleListContainer}>
          <FlatList
            ItemSeparatorComponent={()=>{
              return (
                <View style={peopleStyles.separator}/>
              );
            }}
            data={this.state.people}
            renderItem={({item})=> {
              return (
                <TouchableOpacity 
                  style={peopleStyles.personRow}
                  onPress={()=> {
                    this.props.navigation.navigate('Chat');
                  }}
                >
                  <Text style={peopleStyles.personText}>{item.displayName}</Text>
                  <Ionicons name="ios-arrow-dropright" size={24} color="black"/>                
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    )
  }
}