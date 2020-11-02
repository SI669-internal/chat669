import firebase from 'firebase';
import '@firebase/firestore';
import { firebaseConfig } from './Secrets';

class DataModel {
  constructor() {
    if (firebase.apps.length === 0) { // aka !firebase.apps.length
      firebase.initializeApp(firebaseConfig);
    }
    this.usersRef = firebase.firestore().collection('users');
    this.chatsRef = firebase.firestore().collection('chats');
    this.users = [];
    this.chats = [];
    this.asyncInit();
  }

  asyncInit = async () => {
    this.loadUsers();
    this.loadChats();
    //this.subscribeToChats();
  }

  loadUsers = async () => {
    let querySnap = await this.usersRef.get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.users.push(data);
    });
//    console.log("Got users:", this.users);
  }

  getUsers = () => {
    return this.users;
  }

  createUser = async (email, pass, dispName) => {
    // assemble the data structure
    let newUser = {
      email: email,
      password: pass,
      displayName: dispName
    }

    // add the data to Firebase (user collection)
    let newUserDocRef = await this.usersRef.add(newUser);

    // get the new Firebase ID and save it as the local "key"
    let key = newUserDocRef.id;
    newUser.key = key;
    this.users.push(newUser);
    return newUser;
  }

  getUserForID = (id) => {
    for (let user of this.users) {
      if (user.key === id) {
        return user;
      }
    }
    // will return undefined. No haiku this time...
  }

  loadChats = async () => {
    let querySnap = await this.chatsRef.get();
    querySnap.forEach(async qDocSnap => {
      let data = qDocSnap.data();
      let thisChat = {
        key: qDocSnap.id,
        participants: [],
        messages: []
      }
      for (let userID of data.participants) {
        let user = this.getUserForID(userID);
        thisChat.participants.push(user);
      }

      let messageRef = qDocSnap.ref.collection("messages");
      let messagesQSnap = await messageRef.get();
      messagesQSnap.forEach(qDocSnap => {
        let messageData = qDocSnap.data();
        messageData.author = this.getUserForID(messageData.author);
        messageData.key = qDocSnap.id;
        thisChat.messages.push(messageData);
      });
      this.chats.push(thisChat);
    });
  }

  getOrCreateChat = async (user1, user2) => {

    // look for this chat in the existing data model 'chats' array
    // if it's here, we know it's already in Firebase
    for (let chat of this.chats) {
      // we need to use user keys to look for a match
      // and we need to check for each user in each position
      if (( chat.participants[0].key === user1.key && 
            chat.participants[1].key === user2.key) ||
          ( chat.participants[0].key === user2.key &&
            chat.participants[1].key === user1.key)){
        console.log("found chat for", user1.email, user2.email);
        return chat; // if found, return it and we're done
      }
    }

    console.log("creating new chat for", user1.email, user2.email);
    // chat not found, gotta create it. Create an object for the FB doc
    let newChatDocData = { participants: [user1.key, user2.key] };
    // add it to firebase
    let newChatDocRef = await this.chatsRef.add(newChatDocData);
    // create a local chat object with full-fledged user objects (not just keys)
    let newChat = {
      participants: [user1, user2],
      key: newChatDocRef.id, // use the Firebase ID
      messages: []
    }
    // add it to the data model's chats, then return it
    this.chats.push(newChat);
    return newChat;
  }

  getChatForID = (id) => {
    for (let chat of this.chats) {
      if (chat.key === id) {
        return chat;
      }
    }
    // the chat was not found
    // should throw an error prob'ly
    // return undefined
    // [[almost accidental haiku]]
  }

  addChatMessage = async (chatID, message) => {
    // get a ref to this chat's messages collection. OK if it doesn't exist
    let messagesRef = this.chatsRef.doc(chatID).collection('messages');

    // change author object to just ID for pushing to Firebase, 
    let fbMessageObject = {
      text: message.text,
      timestamp: message.timestamp,
      author: message.author.key,
    }

    // add this message to the collection. It'll exist now!
    let messageDocRef = await messagesRef.add(fbMessageObject);

    // update the local copy of the message with the correct key
    message.key = messageDocRef.id;

    // get the local copy of the chat
    let theChat = this.getChatForID(chatID);
    console.log('in addChatMessge, theChat is', theChat);
    // if this is the first message, create the messages array
    if (!theChat.messages) {
      theChat.messages = [];
    }
    // add this message to the array, then return it
    theChat.messages.push(message);
    return message;
  }
}



let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}