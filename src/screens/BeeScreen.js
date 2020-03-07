import * as React     from 'react';
import { StyleSheet, Text, View, SafeAreaView,
}                     from 'react-native';
import { useQuery, useMutation,
}                     from '@apollo/client'
import _              from 'lodash'
//
import WordLists      from '../components/WordLists'
import GuessInput     from '../components/GuessInput'
import Ops            from '../graphql/Ops'
import Bee            from '../lib/Bee'
import { Dicts }      from '../lib/Dicts'

const BeeScreenComp = ({ bee }) => {
  const [beePutMu] = useMutation(Ops.bee_put_mu)

  const delGuess = (word) => {
    bee.delGuess(word)
    beePutMu({ variables: bee.serialize() })
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <WordLists delGuess={delGuess} guesses={bee.guessesByScore()} nogos={bee.nogos} />
      <GuessInput bee={bee} />
      <View style={styles.guessBox}>
        <Text>
          {bee.summary('scr')}
        </Text>
        <Text>
          {bee.summary('nyt')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const renderError = (error) => {
  // console.log("Error in ListBees", JSON.stringify(error));
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

const BeeScreen = ({ navigation, route }) => {
  const { params = {} } = route
  const { letters } = params
  //
  const { loading, error, data } = useQuery(Ops.bee_get_qy, {
    variables: { letters }, pollInterval: 5000 });
  if (loading)               return <Text>Loading...</Text>;
  if (error)                 return renderError(error);
  if (!data)                 return <Text>No Data</Text>;
  if (!data.bee_get.success) return renderError(data.bee_get.message);
  //
  const bee = Bee.from(data.bee_get.bee)
  navigation.setOptions({ title: bee.dispLtrs })
  // console.log(bee.serialize().guesses)
  return (
    <View style={styles.container}>
      <BeeScreenComp bee={bee} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:      'center',
    width: '100%',
  },
});

export default BeeScreen
