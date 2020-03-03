import * as React     from 'react';
import { StyleSheet, Text, View, SafeAreaView,
}                     from 'react-native';
import { useQuery } from '@apollo/client'
//
import WordLists      from '../components/WordLists'
import GuessInput     from '../components/GuessInput'
import Ops            from '../graphql/Ops'
import Bee            from '../lib/Bee'

class BeeScreenComp extends React.Component {
  constructor(props) {
    super(props)
    const { bee } = props
    this.state = {
      guesses: bee.guesses,
      gbs:     bee.guessesByScore(),
      nogos:   bee.nogos,
      bee,
    }
  }

  render() {
    const { bee, guesses, nogos, gbs } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <WordLists delGuess={this.delGuess} guesses={gbs} nogos={nogos} />
        <GuessInput bee={bee} addToBee={this.addGuess} />
        <View style={styles.guessBox}>
          <Text>
            {`Score: ${bee.totScore()} Words: ${guesses.length} ${JSON.stringify(bee.wordHist())}`}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  addGuess = (word) => {
    this.setState(({ bee }) => {
      if (bee.hasWord(word)) { return ({}); }
      bee.addGuess(word)
      return ({
        guesses: bee.guesses,
        gbs:     bee.guessesByScore(),
        nogos:   bee.nogos,
      })
    })
  }

  delGuess = (word) => {
    this.setState(({ bee }) => {
      bee.delGuess(word)
      return ({
        guesses: bee.guesses,
        gbs:     bee.guessesByScore(),
        nogos:   bee.nogos,
      })
    })
  }
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

const BeeScreen = ({ route }) => {
  const { params = {} } = route
  const { letters } = params
  const { loading, error, data } = useQuery(Ops.bee_get_qy, { variables: { letters } });
  if (loading) return <Text>Loading...</Text>;
  if (error)   return renderError(error);
  if (!data)   return <Text>No Data</Text>;
  const bee = Bee.from(data.bee_get)
  console.log(data, bee)
  return (
    <BeeScreenComp bee={bee} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:      'center',
  },
});

export default BeeScreen
