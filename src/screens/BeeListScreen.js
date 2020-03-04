import * as React   from 'react'
import { StyleSheet, View, FlatList, SafeAreaView,
}                   from 'react-native'
import { Button, ListItem, Text,
}                   from 'react-native-elements'
import { useQuery, useMutation,
}                   from '@apollo/client'
//
import Bee          from '../lib/Bee'
import Ops          from '../graphql/Ops'
import NewBee       from '../components/NewBee'

const BeeListScreen = ({ navigation }) => {
  const { loading, error, data, fetchMore } = useQuery(Ops.bee_list_ids_qy);
  if (loading) return <Text>Loading...</Text>;
  if (error)   return renderError(error);
  if (!data)   return <Text>No Data</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <NewBee />
      <FlatList
        style        ={styles.wordList}
        keyExtractor ={(letters, idx) => (letters+idx)}
        data         ={data.bee_list.bees}
        renderItem   ={({item}) => <BeeListItem item={item} navigation={navigation} />}
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

const BeeListItem = ({ item, navigation }) => {
  const bee = Bee.from(item)

  const [delBeeMu] = useMutation(Ops.bee_del_mu, {
    update: (cache, { data: { bee_del: { dead_bee } } }) => {
      const old_data = cache.readQuery({ query: Ops.bee_list_ids_qy })
      const { bee_list: { bees } } = old_data
      const new_bees = bees.filter((bb) => (bb.letters !== bee.letters))
      const new_data = {
        ...old_data,
        bee_list: { ...old_data.bee_list, bees: new_bees }
      }
      cache.writeQuery({
        query: Ops.bee_list_ids_qy,
        data:  new_data,
      })
    }
  })
  
  const beeDelPlz = () => delBeeMu({ variables: { letters: bee.letters } })
  
  return (
    <ListItem
      title={bee.dispLtrs}
      onPress={(event) => navToBee(bee, event, navigation)}
      rightIcon={{ name: 'cancel', onPress: beeDelPlz, color: '#dcc' }}
    />
  )
}

const navToBee = (bee, event, navigation) => {
  navigation.push("Bee", { title: bee.letters, letters: bee.letters })
}

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
