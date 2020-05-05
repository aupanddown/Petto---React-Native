import * as React from 'react';
import { Text, View,StyleSheet,ImageBackground } from 'react-native';
import { Appbar,Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';


function GoodtogoScreen({ navigation }) {
    return (
      <ImageBackground source={require('../images/bg2.jpg')} 
        style={styles.backgroundImage}> 
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.navigate('ConfirmScreen')}/>
        <Appbar.Content title="Complete"/>
     </Appbar.Header>
     <SafeAreaView>
      <View style={{marginTop:550}}>
     <View style={{flexDirection: 'row',justifyContent:'center'}}>
        <Button mode="contained" color= "whitesmoke" 
          onPress={() => navigation.navigate('ConfirmScreen2')}>
           More?
        </Button>
      <Button></Button>
        <Button mode="contained" color= "orange"
          onPress={() => navigation.navigate('DetailsScreen')}>
           back to Home Screen
        </Button>
        </View>
        </View>
      </SafeAreaView>
      </ImageBackground>
    );
  }
  
  export default GoodtogoScreen

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
    },
  });