import React from 'react';
import { TextInput, Text, View, 
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { chatStyles, colors } from './Styles';

export class ChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.self = {
      displayName: 'Mark',
      email: 'mwnewman@umich.edu'
    };
    this.other = {
      displayName: 'Jane',
      email: 'jane@doe.org'
    }

    this.state = {
      messages: [
        {
          text: "Hello",
          timestamp: '' + Date.now(),
          author: this.self,
          key: 'msg1'
        },
        {
          text: "Goodbye",
          timestamp: '' + (Date.now() + 1),
          author: this.other,
          key: 'msg2'
        }
      ],
      inputText: ''
    }
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({title: this.other.displayName});
  }

  onMessageSend = () => {
    let now = Date.now();
    let message = {
      text: this.state.inputText,
      timestamp: '' + Date.now(),
      author: this.self,
      key: this.self.email + '_' + now
    }
    this.state.messages.push(message);
    this.setState({
      messages: this.state.messages,
      inputText: ''
    });
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={chatStyles.container}
        behavior={"height"}
        keyboardVerticalOffset={100}>
        <View style={chatStyles.messageListContainer}>
          <FlatList
            data={this.state.messages}
            ref={(ref) => {this.flatListRef = ref}}
            onContentSizeChange={() => {
              if (this.flatListRef) {
                this.flatListRef.scrollToEnd();
              }
            }}
            renderItem={({item})=>{
              return (
                <View style={item.author === this.self ? 
                  chatStyles.chatTextSelfContainer :
                  chatStyles.chatTextOtherContainer
                }>
                  <Text style={item.author === this.self ? 
                    chatStyles.chatTextSelf :
                    chatStyles.chatTextOther
                  }>{item.text}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={chatStyles.inputContainer}>
          <View style={chatStyles.inputRow}>
            <TextInput 
              style={chatStyles.inputBox}
              value={this.state.inputText}
              returnKeyType={'send'}
              onChangeText={(text) => {
                this.setState({inputText: text})
              }}
              onSubmitEditing={this.onMessageSend}/>
            <Ionicons 
              name='md-send' 
              size={36}
              color={colors.primary}
              onPress={this.onMessageSend}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}