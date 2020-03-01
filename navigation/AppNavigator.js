import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { Header, Button, Icon, // SearchBar,
}                        from 'react-native-elements';
import DrawerNavigator from './DrawerNavigator'
import BeeListScreen            from '../screens/BeeListScreen'
import BeeScreen                from '../screens/BeeScreen'


const Stack = createStackNavigator();

/* 
 * const DrawerButton = () => {
 *   const navigation = useNavigation();
 *   return (
 *     <Button
 *       type="clear"
 *       icon={<Icon name="menu" />}
 *       onPress={() => { navigation.toggleDrawer(); }}
 *     />
 *   );
 * }
 * 
 * export const NavHeader = ({ title, scene }) => (
 *   // rightComponent={<SearchBar />}
 *   // leftComponent={<DrawerButton />}
 *   <Header
 *     placement="left"
 *     centerComponent={{ text: scene.descriptor.options.title, style: { color: '#fff' } }}
 *   />
 * );
 *  */

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={BeeListScreen}
    />
    <Stack.Screen
      name="Bee"
      component={BeeScreen}
      options={({ route }) => ({ title: route.params.letters })}
    />
  </Stack.Navigator>
)

export default AppNavigator
