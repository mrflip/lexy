import * as React               from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,
}                               from '@react-navigation/drawer'
import { Button, Input, Icon, ListItem,
}                     from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation }        from '@react-navigation/native'
//
import BeeScreen                from '../screens/BeeScreen'
import BeeListScreen            from '../screens/BeeListScreen'
import AboutScreen              from '../screens/AboutScreen'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();

const Bees = ['H/AICRGL', 'M/BNORAL', 'M/OUFNRL', ]

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
      <Button
        title="New Bee"
        icon={<Icon name="add-circle-outline" />}
        onPress={() => Bees.push('L/AEIMNP') }
      />
    </DrawerContentScrollView>
  );
}

const FooDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={CustomDrawerContent}
    default="Home"
  >
    <Drawer.Screen name="Home" component={BeeListScreen} />
    {
      Bees.map((letters) => (
        <Drawer.Screen key={letters} name={letters} component={BeeScreen} options={{ letters: letters, bob: 7 }} />
      ))
    }
    <Drawer.Screen name="About" component={AboutScreen} />
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
