import React from 'react';
import {
  StyleSheet, Text, View, Alert, Platform, TouchableHighlight,
  TextInput, Image, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity, 
  ImageBackground,KeyboardAvoidingView
} from 'react-native';
import firebase from './firebase_config';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Main from './navigation'
import {Button, AppNavigator} from 'react-native-paper'



class SignupLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      showLogin: true,
      isLoggedIn: false,
    };
    this.loginSuccess = this.loginSuccess.bind(this);
  }

  toggleShowLogin(){
    this.setState({
      showLogin: true
    })
  }

  toggleShowSignup(){
    this.setState({
      showLogin: false
    })
  }

  doLogin(){
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then( () => {
      console.log("login successful");
      // this.props.loginCB();
      this.loginSuccess();
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
      console.log(error.message);
      alert(error.message);
      // ...
    })
  }

  doSignup(){
    // https://firebase.google.com/docs/auth/web/start

    // check if the two password fields match
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if (password === confirmPassword){
      // do signup
      firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then( () => {
        console.log("created new user successful");
        this.toggleShowLogin(); // show login page
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      });
    }
    else {
      alert("Password do not match !!!");
    }
  }

  showSignup() {
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View>
        <View style={styles.group}>
          <Text style={styles.title}>Username</Text>
          <TextInput style={styles.input}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}/>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Password</Text>
          <TextInput style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            />
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Confirm Password</Text>
          <TextInput style={styles.input} 
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            />
        </View>
        <View style={{flexDirection: 'row',justifyContent:'center'}} >
            <Button mode="contained" icon="login"
              onPress={() => { this.toggleShowLogin() }}>
              back
            </Button><Button></Button>
            <Button mode="contained"
              onPress={() => { this.doSignup(); }}>
              Signup
            </Button>
          </View>
        </View>
        </KeyboardAvoidingView>
    );
  }

  showLogin() {
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View >
        <View style={styles.group}>
          <Text style={styles.title}>Username</Text>
          <TextInput style={styles.input}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}/>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Password</Text>
          <TextInput style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            />
      </View>
        <View style={{flexDirection: 'row',justifyContent:'center'}}>
            <Button mode="contained" 
              onPress={() => { this.toggleShowSignup(); }}>
              Signup
            </Button><Button></Button>
            <Button mode="contained" icon="login"
              onPress={() => { this.doLogin() }}>
              Login
            </Button>
        </View>
        </View>
      </KeyboardAvoidingView>
    );
  }


  loginSuccess() {
    this.setState({
      isLoggedIn: true,
      showLogin : false
    })
  }

  render() {
    if (this.state.isLoggedIn){
      return <Main/>
    }
    else{
      return (
        <ImageBackground source={require('./images/bg.jpg')} 
        style={styles.backgroundImage}> 
        <View style={styles.containerLogin}>
            {!this.state.isLoggedIn? (this.state.showLogin ? this.showLogin() : this.showSignup()):null}
        </View>
        </ImageBackground> 
      );
    }
  }
}



export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SignupLogin />
    </PaperProvider>
  )
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: 'black',
  },
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  containerLogin: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    justifyContent:'center',
    
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,

    
  },
  title: {
    padding: 10,
  },
  group: {
    marginBottom: 10,
    
  },
  input: {
    padding: 10,
    height: 50,
    fontSize: 20,
    backgroundColor: "whitesmoke",
    borderColor:'#FF8C00',
    borderRadius:10,
    borderWidth: 1
    
  },
  title: {
    fontSize: 25,
    color:'#FF8C00',
    fontWeight:'bold',
  
    
  },
  center: {
    alignItems: 'center'
  },
  signupText: {
    fontSize: 20,
    color: 'blue'
  }
  
});
