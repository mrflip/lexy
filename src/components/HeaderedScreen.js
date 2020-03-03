import React             from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, SafeAreaView,
}                        from 'react-native';
import { Header, Button, Icon, // SearchBar,
}                        from 'react-native-elements';

const HeaderedScreen = ({ title, children, style }) => (
  <SafeAreaView style={[style, styles.container]}>
    <NavHeader title={title} />
    {children}
  </SafeAreaView>
);

const DrawerButton = () => {
  const navigation = useNavigation();
  return (
    <Button
      type="clear"
      icon={<Icon name="menu" />}
      onPress={() => { navigation.toggleDrawer(); }}
    />
  );
}


export const NavHeader = ({ title }) => (
  // rightComponent={<SearchBar />}
  <Header
    placement="left"
    leftComponent={<DrawerButton />}
    centerComponent={{ text: title, style: { color: '#fff' } }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HeaderedScreen;
