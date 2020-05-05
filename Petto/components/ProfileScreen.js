import * as React from 'react';
import { Text, View,StyleSheet,TextInput,YellowBox,Image,KeyboardAvoidingView,ImageBackground } from 'react-native';
import {Card} from 'native-base'
import { Button,Appbar,Surface } from 'react-native-paper'
import firebase from '../firebase_config';
import { ScrollView } from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';


var profilescr = [];

export default class ProfileScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        profilesc: [],
        Name: '',
        Age: '',
        Sex: '',
        Type: '',
        // Image:undefined,
      };     
    }
    componentDidMount(){
      firebase.database().ref('mypetto').on('value',(snap)=>{
        let items=[];
        snap.forEach((child)=>{
          items.push({
            Name: child.val().name,
            Age: child.val().age,
            Sex: child.val().sex,
            Type: child.val().type,
          });
        });
        profilescr=items;
        this.setState({profilesc:items});
      });
    }
  
    showScreen() {
      return (
      <React.Fragment>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => this.props.navigation.navigate('DetailsScreen')} />
          <Appbar.Content title="My Entrust"/>
        </Appbar.Header>
     <ScrollView>
        <SafeAreaView>
          {
                this.state.profilesc.map((u, i) => {
                  return (
                    <React.Fragment>
                    <View style={{alignItems:'center',}}>
                    <Text style={{fontSize: 25,color:'#9400D3',textShadowColor: 'black',
                      textShadowOffset: {width: -0.5, height: 0.5},textShadowRadius: 1}}>My pet</Text>
                    </View><Text></Text>
                    <View key={i}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 20,textShadowColor: 'black',
                      textShadowOffset: {width: -0.5, height: 0.5},textShadowRadius: 1}}>💖Name:    </Text>
                        <Text style={{fontSize: 20,color:'#000080',fontWeight:'bold',textShadowColor: 'white',
                      textShadowOffset: {width: -0.5, height: 0.5},textShadowRadius: 1}}>{u.Name}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 20,textShadowColor: 'black',
                      textShadowOffset: {width: -0.5, height: 0.5},textShadowRadius: 1}}>🧮Age:    </Text>
                        <Text style={{fontSize: 20,color:'#000080',fontWeight:'bold',textShadowColor: 'white',
                      textShadowOffset: {width: 1, height: 0.5},textShadowRadius: 1}}>{u.Age}</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'flex-end',top:-45}}>
                      <Text style={{fontSize: 20,color:'#000080',fontWeight:'bold',textShadowColor: 'white',
                      textShadowOffset: {width: 1, height: 0.5},textShadowRadius: 1}}>{u.Sex}</Text>
                        <Text style={{fontSize: 20,textShadowColor: 'black',
                      textShadowOffset: {width: -0.5, height: 0.5},textShadowRadius: 1}}>    :Sex🎭 </Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'flex-end',top:-45}}>
                        <Text style={{fontSize: 20,color:'#000080',fontWeight:'bold',textShadowColor: 'white',
                        textShadowOffset: {width: 1, height: 0.5},textShadowRadius: 1}}>{u.Type}</Text>
                        <Text style={{fontSize: 20,textShadowColor: 'black',
                      textShadowOffset: {width: -0.5, height: 0.5},textShadowRadius: 1}}>    :Type🎨 </Text>
                      </View>
                      <Text></Text>
                      </View>
                      </React.Fragment>
                  );
                })
            } 
        {/* <View style={styles.containerLogin}>
          <View style={styles.group}>
            <Text style={styles.title}>Name</Text>
            <TextInput style={styles.input} value={this.state.profilesc.name}/>
          </View>
          <View style={styles.group}>
            <Text style={styles.title}>Age</Text>
            <TextInput style={styles.input} value={this.state.profilesc.age}/>
        </View>
          <View style={styles.group}>
            <Text style={styles.title}>Sex</Text>
            <TextInput style={styles.input} value={this.state.profilesc.sex}/>
        </View>
          <View style={styles.group}>
            <Text style={styles.title}>Type</Text>
            <TextInput style={styles.input} value={this.state.profilesc.type}/>
          </View>   */}
          {/* <View style={styles.group}>
            <Text style={styles.title}> Pet's Image📷</Text>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        </View>
          </View> */}
        {/* </View> */}
        </SafeAreaView>
       </ScrollView>
      </React.Fragment>
      );
    }
  
  
    render() {
        return (
          <ImageBackground source={require('../images/bg5.jpg')} 
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
    backgroundColor: "white",
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
image: { width: 400, height: 300 },
button: {
  padding: 13,
  margin: 15,
  backgroundColor: '#dddddd',
},

});
