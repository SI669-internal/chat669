import React from 'react';
import { TextInput, Text, View, 
  Image, 
  Button} 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loginStyles } from './Styles';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={loginStyles.container}>
        <View style={loginStyles.topView}>
          <Image 
            source={require('./assets/logo.png')}
            style={loginStyles.logoImage}
          />
        </View>
        <View style={loginStyles.middleView}>
          <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>Email:</Text>
            <TextInput
              style={loginStyles.inputText}
            />
          </View>
          <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>Password:</Text>
            <TextInput
              style={loginStyles.inputText}
            />
          </View>
        </View>
        <View style={loginStyles.bottomView}>
          <View style={loginStyles.buttonContainer}>
            <Button
              title="Login"
              onPress={()=>{
                this.props.navigation.navigate("People");
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}