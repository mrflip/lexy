import * as React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,
} from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
//
import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();

const Bees = ['H/AICRGL', 'M/BNORAL']

const CustomDrawerContent = (props) => {
  const { navigation } = props
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      { Bees.map((letters) => (
        <DrawerItem
          label={letters}
          key={letters}
          onPress={() => {
            console.log('nav', letters)
            navigation.navigate('NEWBEE', { letters: letters })
          }}
        />
      ))
      }
    </DrawerContentScrollView>
  );
}

const FooDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={CustomDrawerContent}
  >
    {
      ['NEWBEE'].map((letters) => (
        <Drawer.Screen key={letters} name={letters} component={HomeScreen} options={{ letters: letters, bob: 7 }} />
      ))
    }
    <Drawer.Screen name="About" component={LinksScreen} />
  </Drawer.Navigator>
);

const DrawerNavigator = () => (
  <Stack.Navigator
  headerMode="none"
  options={{ headerShown: false, headerMode: 'none' }}
  >
  <Stack.Screen
  name="Root"
  component={FooDrawerNavigator}
  />
</Stack.Navigator>

)

export default DrawerNavigator
