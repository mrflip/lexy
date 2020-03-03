import * as React   from 'react'
import { StyleSheet, View, FlatList, SafeAreaView,
}                   from 'react-native'
import { Button, ListItem, Text,
}                   from 'react-native-elements'
import { useQuery } from '@apollo/client'
//
import Bee          from '../lib/Bee'
import Ops          from '../graphql/Ops'
import NewBee       from '../components/NewBee'

const BeeListScreen = ({ navigation }) => {
  const { loading, error, data, fetchMore } = useQuery(Ops.bee_list_qy);
  if (loading) return <Text>Loading...</Text>;
  if (error)   return renderError(error);
  if (!data)   return <Text>No Data</Text>;
  const bees = data.bee_list.bees.map((obj) => Bee.from(obj))
  // console.log(data, bees)
  return (
    <SafeAreaView style={styles.container}>
      <NewBee />
      <FlatList
        style        ={styles.wordList}
        keyExtractor ={(word, idx) => (idx.toString())}
        data         ={bees}
        renderItem   ={(info) => beeListItem({ ...info, navigation })}
      />
      <Button title="more" onPress={fetcher(data, fetchMore)} />
    </SafeAreaView>
  )
}

const renderError = (error) => {
  console.log("Error in ListBees", JSON.stringify(error));
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>
          Error:
          {JSON.stringify(error)}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const navToBee = (bee, event, navigation) => {
  navigation.push("Bee", { letters: bee.letters })
}

const beeListItem = ({ item, navigation }) => (
  <ListItem
    title={item.dispLtrs}
    onPress={(event) => navToBee(item, event, navigation)}
  />
)

const fetcher = (data, fetchMore) => (() => {
  if (!data.bee_list.cursor) { return }
  fetchMore({
    variables: {
      cursor: data.bee_list.cursor,
    },
    updateQuery: (prev, { fetchMoreResult, ...rest }) => {
      console.log('uq', 'prev', prev, 'more', fetchMoreResult, 'rest', rest)
      if (!fetchMoreResult) return prev;
      const ret = ({
        ...fetchMoreResult,
        bee_list: {
          ...fetchMoreResult.bee_list,
          bees: [
            ...prev.bee_list.bees,
            ...fetchMoreResult.bee_list.bees,
          ],
        },
      })
      // console.log(ret)
      return ret
    },
  })
})

export default BeeListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wordList: {
    width: '100%',
  },
})
