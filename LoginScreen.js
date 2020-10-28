import React from 'react';
import { TextInput, Text, View, 
  Image, TouchableOpacity, KeyboardAvoidingView} 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loginStyles } from './Styles';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'login'
    }
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={loginStyles.container}
        behavior={"height"}
        keyboardVerticalOffset={10}>
        <View style={loginStyles.topView}>
          <Image 
            source={require('./assets/logo.png')}
            style={loginStyles.logoImage}
          />
        </View>
        <View style={loginStyles.middleView}>
          <View style={loginStyles.inputRow}>
            <Text 
              style={loginStyles.inputLabel}
            >Email:</Text>
            <TextInput
              style={loginStyles.inputText}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              autoCompleteType='email'
              textContentType='emailAddress'
            />
          </View>
          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>Display Name:</Text>
              <TextInput
                style={loginStyles.inputText}
                autoCapitalize='none'
                autoCorrect={false}
              />
            </View>
          ):(
            <View/>
          )}
          <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>Password:</Text>
            <TextInput
              style={loginStyles.inputText}
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='password'
          />
          </View>
          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>Re-enter Password:</Text>
              <TextInput
                style={loginStyles.inputText}
                autoCapitalize='none'
                autoCorrect={false}
                textContentType='password'  
              />
            </View>
          ):(
            <View/>
          )}
        </View>
        {this.state.mode === 'login' ? (

          <View style={loginStyles.bottomView}>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={()=>{
                this.setState({mode: 'create'})
              }}
              >
              <Text style={loginStyles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={()=>{
                this.props.navigation.navigate("People");
              }}
              >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

        ):(

          <View style={loginStyles.bottomView}>

            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={()=>{
                this.setState({mode: 'login'})
              }}
              >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={()=>{
                this.props.navigation.navigate("People");
              }}
              >
              <Text style={loginStyles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    )
  }
}