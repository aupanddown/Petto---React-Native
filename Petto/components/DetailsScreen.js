import * as React from 'react';
import { View,StyleSheet,ScrollView } from 'react-native';
import { Card,Bot } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation, Text,Appbar,Button,
  Title,Paragraph,Avatar,Headline,Image,LeftContent
  } from 'react-native-paper';
import firebase from '../firebase_config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Drawer } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import EntrustScreen from './EntrustScreen';



var itm=[];

function PettoHome(props){
  return(
    <Card.Content>
    <TouchableOpacity onPress={()=>props.link()}>
    <View key={props.key}>
    <Card.Cover source={{ uri: props.image }} />
    <Text style={{fontSize: 25,
      color:'#1E90FF',
      fontWeight:'bold'}}>
    🎀 {props.name} 🎀  </Text>
    <Text style={{fontSize: 20,
      color:'#FF8C00',
      fontWeight:'bold'
      }}>
    📞: {props.phone}  🏡: {props.district}</Text>
    <Text></Text>
    </View>
    </TouchableOpacity>
    </Card.Content>
  )
}

export default class DetailsScreen extends React.Component{
  constructor(props){
    super(props);
    this.state=({
      items: []
    });
  }
  componentDidMount(){
    firebase.database().ref('petto').on('value',(snap)=>{
      let items=[];
      snap.forEach((child)=>{
        items.push({
          image: child.val().image,
          name: child.val().name,
          phone: child.val().phone,
          district: child.val().district,
          type:child.val().type,
          opentime:child.val().opentime,
          openday:child.val().openday
        });
      });
      itm=items;
      this.setState({items:items});
    });
  }

  // <TouchableHighlight onPress={()=>{
  //   props.navigation.navigate('Details',{
  //     res_data: props.res_data,
  //     changeState: props.changeState
  //   });
  // }} underlayColor="white">
  
  render () {
    return (
      <React.Fragment>
      <SafeAreaView>
        <ScrollView >    
            <Card >
              {
                this.state.items.map((u, i) => {
                  return (
                    <PettoHome
                      key={i}
                      image={u.image}
                      name={u.name}
                      phone={u.phone}
                      district={u.district}
                      type={u.type}
                      opentime={u.opentime}
                      openday={u.openday}
                      link={()=>this.props.navigation.navigate('EntrustScreen',
                      {
                        key:i,
                        image:u.image,
                        name:u.name,
                        phone:u.phone,
                        district:u.district,
                        type:u.type,
                        opentime:u.opentime,
                        openday:u.openday
                      }
                      )}
                    />
                  );
                })
              }   
            </Card>
        </ScrollView>
  </SafeAreaView>
  <Appbar style={{position:'absolute',left:0,right:0,bottom:0}}>
      <Appbar.Content title="✨Welcome to Petto✨" style={{alignItems:'center'}}/>
      <Appbar.Action icon="folder" onPress={() => this.props.navigation.navigate('ProfileScreen')} style={{position:'absolute',right:0}}  /> 
      <Appbar.Action icon="map" onPress={() => this.props.navigation.navigate('Maps')} style={{position:'absolute',left:0}}  /> 
      </Appbar>
</React.Fragment>
    );
  }
}



  const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },

  row: { flexDirection: 'row' },
  image: { width: 200, height: 300 },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },

  title: {
    fontSize: 20,
    padding: 10
  },

  group: {
    marginTop: 20
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 20,
    borderWidth: 1
  },
  buttonText: {
    fontSize: 30
  },
  input: {
    padding: 10,
    height: 40,
    borderWidth: 1
  },
  title: {
    fontSize: 20
  },
  center: {
    alignItems: 'center'
  },
  signupText: {
    fontSize: 20,
    color: 'blue'
  },
  pickerStyle:{
    fontSize: 20,
    color:'white',
  },
});