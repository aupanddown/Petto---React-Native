import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import DetailsScreen from '../components/DetailsScreen'
import EntrustScreen from '../components/EntrustScreen'
import ConfirmScreen from '../components/ConfirmScreen'
import ConfirmScreen2 from '../components/ConfirmScreen2'
import GoodtogoScreen from '../components/GoodtogoScreen'
import ProfileScreen from '../components/ProfileScreen'
import Maps from '../components/Maps'


const StackNavigator = createStackNavigator(
  {
    DetailsScreen: {
      screen: DetailsScreen
    },
    EntrustScreen: {
      screen: EntrustScreen
    },
    ConfirmScreen: {
      screen: ConfirmScreen
    },
    ConfirmScreen2: {
      screen: ConfirmScreen2
    },
    GoodtogoScreen: {
      screen: GoodtogoScreen
    },
    ProfileScreen: {
      screen: ProfileScreen
    },
    Maps: {
      screen: Maps
    },
  },
  {
    initialRouteName: 'DetailsScreen',
    headerMode: 'none',
    mode: 'modal'
  }
)


export default createAppContainer(StackNavigator)