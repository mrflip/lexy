import * as React   from 'react';
import { StyleSheet, View, FlatList, SafeAreaView,
}                   from 'react-native';
import { Button, Input, Icon, ListItem, Text,
}                   from 'react-native-elements'
import { useQuery } from '@apollo/client';
import gql          from 'graphql-tag';
//
import Bee          from '../lib/Bee'

const BEE_LIST_Q = gql`
  query blist($cursor: String) {
    bee_list(limit: 2, cursor: $cursor) {
      bees {
        letters, datestr, guesses, nogos
      }
      cursor
    }
  }
`

class BeeListScreenComp extends React.Component {
  state = {
    bees: [
      'M/OUFNRL', 'C/AILRVH',
    ],
    entry: '',
  }

  navToBee = (bee, event, navigation) => {
    navigation.push("Bee", { letters: bee.letters, bee: bee })
  }

  beeListItem = ({ item, navigation }) => (
    <ListItem
      title={item.dispLtrs}
      onPress={(event) => this.navToBee(item, event, navigation)}
    />
  )

  addBee = (entry) => (
    this.setState(({ bees }) => ({
      bees: (bees.concat(entry)),
    }))
  )

  render() {
    const { bees, entry } = this.state
    const { navigation, db_bees } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.wordList}
          keyExtractor={(word, idx) => (idx.toString())}
          data={db_bees}
          renderItem={(info) => this.beeListItem({ ...info, navigation })}
        />
        <Input
          value={entry}
          onChangeText={(text) => this.setState({
            entry: Bee.normalize(text).toUpperCase(),
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

const renderError = (error) => {
  console.log("Error in ListBees", JSON.stringify(error));
  return (
    <SafeAreaView>
      <View>
        <Text>
          Error:
          {JSON.stringify(error)}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const fetcher = (data, fetchMore) => {
  return (() => fetchMore({
    variables: {
      cursor: data.bee_list.cursor,
    },
    updateQuery: (prev, { fetchMoreResult, ...rest }) => {
      console.log('uq', 'prev', prev, 'more', fetchMoreResult, 'rest', rest)
      if (!fetchMoreResult) return prev;
      return ({
        ...fetchMoreResult,
        bees: {
          ...fetchMoreResult.bees,
          ...prev.bees,
        },
      })
    }
  })
  )
}

const BeeListScreen = ({ navigation }) => {
  const { loading, error, data, fetchMore } = useQuery(BEE_LIST_Q);
  if (loading) return <Text>Loading...</Text>;
  if (error)   return renderError(error);
  if (!data)   return <Text>No Data</Text>;
  const db_bees = data.bee_list.bees.map((obj) => Bee.from(obj))
  console.log(data, db_bees)
  return (
    <View style={{flex: 1}}>
      <BeeListScreenComp db_bees={db_bees} navigation={navigation} />
      <Button title="more" onPress={fetcher(data, fetchMore)} />
    </View>
  )
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
