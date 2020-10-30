import React from 'react';
import { TextInput, Text, View, 
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { chatStyles, colors } from './Styles';
import { getDataModel } from './DataModel';

export class ChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.self = this.props.route.params.currentUser;
    this.other = this.props.route.params.otherUser;
    this.dataModel = getDataModel();

    this.state = {
      messages: [],
      inputText: ''
    }
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({title: this.other.displayName});
    this.loadChat();
  }

  loadChat = async() => {
    this.chat = await this.dataModel.getOrCreateChat(this.self, this.other);
    console.log(this.chat);
  }

  onMessageSend = () => {
    let now = Date.now();
    let messageData = {
      text: this.state.inputText,
      timestamp: Date.now(),
      author: this.self,
    }
    //  await this.dataModel.addChatMessage(this.chat.key, messageData);

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