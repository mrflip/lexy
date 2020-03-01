import * as React     from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView,
}                     from 'react-native';
import { Button, Input, Icon, ListItem,
}                     from 'react-native-elements'
//
import { useNavigation } from '@react-navigation/native'
import HeaderedScreen from '../components/HeaderedScreen'
import Bee            from '../lib/Bee'

class BeeListScreen extends React.Component {
    /* constructor(props) {
     *   super(props)
     *   const { route, navigation } = props
     *   const { name, params = {} } = route
     *   this.state = {
     *     entry: '',
     *   }
     *   console.log(this.state, 'nav', navigation, navigation.options, 'vals', props)
     * }
     */

    state = {
      bees: [
        'M/OUFNRL', 'C/AILRVH',
      ],
      entry: '',
    }

    navToBee = (item, event, navigation) => {
      navigation.push("Bee", { letters: item })
    }

    beeListItem = ({ item, navigation, ...rest }) => {
      console.log('item', item, rest)
      return (
        <ListItem
          title={item}
          onPress={(event) => this.navToBee(item, event, navigation)}
        />
      )
    }

    addBee = (entry) => (
      this.setState(({ bees }) => ({
        bees: (bees.concat(entry)),
      }))
    )

    render() {
      const { bees, entry } = this.state
      const { navigation } = this.props
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            style={styles.wordList}
            keyExtractor={(word, idx) => (idx.toString())}
            data={bees}
            renderItem={(info) => this.beeListItem({ ...info, navigation })}
          />
          <Input
            value={entry}
            onChangeText={(text) => this.setState({
              entry: Bee.normalize(text).toUpperCase()
            })}
          />
          <Button
            title="New Bee"
            icon={<Icon name="add-circle-outline" />}
            onPress={() => this.addBee(entry)}
          />
        </SafeAreaView>
      )
  }
}

export default BeeListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  wordListItemBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  wordList: {
    width: '100%',
  },
})
