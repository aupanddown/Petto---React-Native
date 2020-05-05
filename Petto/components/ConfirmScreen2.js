import * as React from 'react';
import { Text, View,StyleSheet,TextInput,YellowBox,Image,ImageBackground,KeyboardAvoidingView, Alert } from 'react-native';
import {Picker} from 'native-base'
import { Button,Appbar } from 'react-native-paper'
import GoodtogoScreen from './GoodtogoScreen'
import firebase from '../firebase_config';
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ScrollView } from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
  'componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.',
  ''
])


export default class ConfirmScreen extends React.Component {
  constructor(props){
      super(props);
      this.database = firebase.database();
      this.state = {
        Name: '',
        Age: '',
        Sex: '',
        Type: '',
        Date:'',
        Image:'',


        chosenDate: new Date()
      };
      
      this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
      this.setState({ chosenDate: newDate });
    }

    selectPicture = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        aspect: 1,
        allowsEditing: true,
      });
      if (!cancelled) this.setState({ image: uri });
    };
  
    takePicture = async () => {
      await Permissions.askAsync(Permissions.CAMERA);
      const { cancelled, uri } = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });
      this.setState({ image: uri });
    };

    writeDB(name,age,sex,type,date){
      console.log("writing db")
     name = this.state.Name;
     age = this.state.Age;
     console.log(age);
     sex = this.state.Sex;
     type = this.state.Type;
     date = this.state.Date;
      
      this.database.ref('mypetto/').push({
        name: name,
        age: age,
        sex: sex,
        type: type,
        date: date
      });
     
    }
  
  
    showScreen() {
      return (
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => this.props.navigation.navigate('EntrustScreen')} />
      <Appbar.Content title="Pet's Information"/>
     </Appbar.Header>
     </View>
        <ScrollView>
        <View style={styles.containerLogin}>
          <View style={styles.group}>
            <Text style={styles.title}>Name</Text>
            <TextInput style={styles.input}
              placeholder="Pet's name"
              value={this.state.Name}
              onChangeText={(Name) => this.setState({Name})}/>
          </View>
          <View style={styles.group}>
            <Text style={styles.title}>Age</Text>
          <View style={styles.pickerStyle2}>
            <RNPickerSelect 
            onValueChange={(value) => this.setState({Age: value})}
            items={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
                { label: '13', value: '13' },
                { label: '14', value: '14' },
                { label: '15', value: '15' },
                { label: '16', value: '16' },
                { label: '17', value: '17' },
                { label: '18', value: '18' },
                { label: '19', value: '19' },
                { label: '20', value: '20' },

            ]}
        />
        </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.title}>Sex</Text>
            <View style={styles.pickerStyle2}>
            <RNPickerSelect 
            onValueChange={(value) => this.setState({Sex: value})}
            items={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
            ]}
        /> 
        </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.title}>Type</Text>
              <Picker style={styles.pickerStyle}  
                        placeholder={"Select your pet's type"}
                        selectedValue={this.state.Type}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({Type: itemValue, choosenIndex: itemPosition})}  
                    > 
                    <Picker.Item label="Dog" value="Dog" />  
                    <Picker.Item label="Cat" value="Cat" />  
                    <Picker.Item label="Rabbit" value="Rabbit" />  
                    <Picker.Item label="Hamster" value="Hamster" />  
                    <Picker.Item label="Sugar Glider" value="Sugar Glider" />  
                </Picker>  
          <Button></Button>
            <View style={{ backgroundColor: 'white', marginHorizontal: 100 }}>
            <DatePicker date={this.state.Date} showIcon={true} placeholder="Pick a date" mode="date" format="DD-MM-YYYY"  confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  position:'absolute',
                  borderWidth: 0,
                  height: 50,
                  width: 170,
                  right: 0,
                  
                },
                dateText: {
                  marginTop: 5,
                  color: 'white',
                  fontSize: 18,
                  marginLeft: 50,
                },
                placeholderText: {
                  marginTop: 5,
                 marginLeft: 50,
                  color: 'white',
                  fontSize: 18,
                  
                }
              }
              }
              onDateChange={(date) => { this.setState({ Date: date }) }} placeholderTextColor="white" underlineColorAndroid={'rgba(0,0,0,0)'} style={{ height: 50, width: 170, paddingLeft: 15, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.4)' }}></DatePicker>
          </View>
          </View>  


          <View style={styles.group}>
            <Text style={styles.title}>Please Upload your Pet's Image📷</Text>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        <View style={styles.row}>
          <Button mode="contained" color= "whitesmoke" 
          onPress={this.selectPicture}>Gallery</Button><Button></Button>
          <Button mode="contained" color= "whitesmoke"
          onPress={this.takePicture}>Camera</Button>
        </View>
        </View>
          </View>
          <View style={styles.center}>
            <View style={styles.group}>
            </View>
            <View style={styles.group}>

              <Button mode="contained"
               onPress={() => {this.writeDB();this.props.navigation.navigate('GoodtogoScreen');
               Alert.alert('Thanks for choosing us! We will call you as soon as possible...')}}>
                Confirm
              </Button>
            </View>
          </View>
        </View>
       </ScrollView>
       </KeyboardAvoidingView>
      );
    }
  
  
    render() {
        return (
          <ImageBackground source={require('../images/bg3.jpg')} 
          style={styles.backgroundImage}> 
              {this.showScreen()}
          </ImageBackground>
        );
      }
    
} 

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
      borderWidth: 1,
      
    },
    title: {
      fontSize: 20,
      color:'#FF8C00',
      fontWeight:'bold',
      textShadowColor: 'white',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 1
      
    },
    center: {
      alignItems: 'center'
    },
  row: { flexDirection: 'row' },
  image: { width: 300, height: 200 },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  pickerStyle:{
    backgroundColor:'white',
    borderColor:'#FF8C00',
    borderRadius:10,
    borderWidth: 1,
    width:200,
    height:50
  },
  pickerStyle2:{
    borderColor:'#FF8C00',
    borderRadius:10,
    borderWidth: 1,
    backgroundColor:'white',
    width:110,
    height:30
  }
});

