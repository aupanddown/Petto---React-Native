import * as React from 'react';
import { Text, View,TouchableOpacity,ImageBackground,StyleSheet,Alert} from 'react-native';
import { Button,Appbar,Card,Title,Paragraph, TextInput } from 'react-native-paper'
import { Directions } from 'react-native-gesture-handler';

export default class EntrustScreen extends React.Component{
    constructor(props){
        super(props);
        const petto_data  = props.navigation.state.params;
        console.log(petto_data);
        this.state = {
          petto_data: petto_data,
        };
      }
    
    render(){
        var petto_data = this.state.petto_data
        return (
            <ImageBackground source={require('../images/bg3.jpg')} 
              style={styles.backgroundImage}> 
          <View> 
            <Appbar.Header>
            <Appbar.BackAction
               onPress={() => this.props.navigation.navigate('DetailsScreen')}
            />
            <Appbar.Content
              title="Pet's Hotel"/>
          </Appbar.Header>
          <Card.Content>
          </Card.Content>
          <Card.Cover source={{ uri: petto_data.image }} />  
          <Text style={{backgroundColor:'whitesmoke'}}></Text>

            <View style={{justifyContent:'center'}}>
              <View style={{backgroundColor:'whitesmoke',
              borderColor:'whitesmoke',alignItems:'center',
              borderRadius:10,
              borderWidth: 1}}>
              <Title style={{fontSize: 30,color:'#1E90FF',
                fontWeight:'bold'}}>🎀{petto_data.name}🎀</Title>
              </View>
              <View style={{backgroundColor:'whitesmoke',
              borderColor:'whitesmoke',
              borderRadius:10,
              borderWidth: 1}}><Text></Text> 
              
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 20,fontWeight:'bold'}}>📞 Phone: </Text>
                <Text style={{fontSize: 20,color:'#D2691E',fontWeight:'bold'}}>{petto_data.phone} </Text>
              </View>

              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 20,fontWeight:'bold'}}> 🏡 District: </Text>
                <Text style={{fontSize: 20,color:'#D2691E',fontWeight:'bold'}}>{petto_data.district}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 20,fontWeight:'bold'}}>💞 Type:  </Text>
                <Text style={{fontSize: 20,color:'#D2691E',fontWeight:'bold'}}>{petto_data.type}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 20,fontWeight:'bold'}}>📅 Open day: </Text>
                <Text style={{fontSize: 20,color:'#D2691E',fontWeight:'bold'}}>{petto_data.openday}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 20,fontWeight:'bold'}}> ⌚ Open Time: </Text>
                <Text style={{fontSize: 20,color:'#D2691E',fontWeight:'bold'}}>{petto_data.opentime}</Text>
              </View>
              </View>
            </View>

          <View style={{ justifyContent:'flex-end',bottom:-200}}>
            <View style={{ flex: 0, flexDirection:'row',justifyContent:'center'}}>
              <Button mode="contained" 
                onPress={() => {this.props.navigation.navigate('ConfirmScreen');
                Alert.alert("Please fill in your pet's information")}}>
                  Go to Confirm
              </Button>  
            </View>
            </View>
            </View>
            </ImageBackground> 
            
          );
        }
}


const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
    },
  });
    