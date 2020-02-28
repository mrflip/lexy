import * as React from 'react';
import { StyleSheet, Text, View, FlatList,
}                 from 'react-native';
import { Button, Input, Icon,
}                 from 'react-native-elements'
import Layout     from '../constants/Layout'
import DictSet    from '../lib/DictSet'
import Guess      from '../lib/Guess'
import Bee        from '../lib/Bee'


const LetterButton = ({ letter, handler }) => (
  <Button
    title={letter}
    onPress={() => handler(letter)}
    style={styles.letterButton}
  />
)

const initialLetters =  'MAOBLNR'

class HomeScreen extends React.Component {
  state = {
    entry: '',
    guesses: [],
    bee:   new Bee(initialLetters),
  }

  elements = {
  }

  addLetter(letter) {
    this.setState(({ entry }) => ({
      entry: (entry + letter),
    }))
  }

  delLetter = () => {
    this.setState(({ entry }) => {
      const newVal = entry.substring(0, entry.length - 1)
      return ({
        entry: newVal,
      })
    })
  }

  clearEntry = () => this.setState(() => ({ entry: '' }))

  addGuess = () => {
    this.setState(({ entry, bee }) => {
      if (bee.hasWord(entry)) return ({ entry: '' })
      bee.addGuess(entry)
      return ({
        guesses: bee.guesses,
        entry: '',
      })
    })
  }

  delEntry = (word) => {
    this.setState(({ bee }) => {
      bee.delGuess(word)
      return ({ guesses: bee.guesses })
    })
  }

  validStyle = (guess) => {
    if (!guess.valid) return styles.entryBad
    if (guess.isPan)   return styles.entryPangram
    return styles.entryValid
  }

  wordListItem = ({ item }) => {
    const guess = item
    return (
      <View style={styles.wordListItemBox}>
        <Text style={styles.wordListInfo}>{guess.score}</Text>
        <Text style={[styles.wordListItem, this.validStyle(guess)]}>
          {guess.word}
        </Text>
        <Icon
          name="cancel"
          style={styles.clearEntry}
          onPress={() => this.delEntry(guess.word)}
        />
      </View>
    )
  }

  render() {
    const { bee, entry, guesses } = this.state
    return (
      <View style={styles.container}>

        <Input
          style={styles.lettersInput}
          value={bee.letters}
          onChangeText={(text) => {
            const newbee = new Bee(text)
            this.setState({
              bee: newbee,
            })
          }}
        />

        <Text>
          {bee.dispLtrs}
        </Text>

        <FlatList
          style={styles.wordList}
          keyExtractor={(word, idx) => (idx.toString())}
          data={guesses}
          renderItem={this.wordListItem}
        />

        <View style={styles.entryBox}>
          <Icon
            name="cancel"
            iconStyle={styles.entryIcon}
            onPress={this.clearEntry}
          />
          <Icon
            name="backspace"
            iconStyle={styles.entryIcon}
            onPress={this.delLetter}
          />
          <Text style={[styles.entryText]} ref={this.elements.entry}>
            {entry}
          </Text>
          <Icon
            name="check"
            iconStyle={styles.entryIcon}
            onPress={this.addGuess}
          />
        </View>

        <View style={styles.buttonRow}>
          {
            bee.larry.map((ltr) => (
              <LetterButton letter={ltr} handler={(ll) => this.addLetter(ll)} />))
          }
        </View>

        <View style={styles.wordListItemBox}>
          <Text>
            Tot:
            {bee.totScore()}
          </Text>
          <Text>
            Words:
            {guesses.length}
          </Text>
          <Text>
            {JSON.stringify(bee.wordHist())}
          </Text>
        </View>

      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: (
    <Text>Hi</Text>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  lettersInput: {
    fontSize: 20,
  },
  entryText: {
    fontSize: 20,
    flex: 4,
  },
  wordListItemBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  wordListItem: {
    fontSize: 20,
    flex:     9,
    padding:  2,
  },
  wordListInfo: {
    fontSize:     20,
    padding:      2,
    marginRight: 5,
    flex: 1,
  },
  entryValid: {
    backgroundColor: '#cceecc',
  },
  entryBad: {
    backgroundColor: '#eecccc',
  },
  entryPangram: {
    backgroundColor: '#ddddff',
  },
  entryBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    margin:  10,
  },
  entryIcon: {
    marginLeft:  2,
    marginRight: 2,
  },
  letterButton: {
    padding: 5,
    margin: 5,
    width: Layout.window.width/9,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  wordList: {
    width: '100%',
  },
});

export default HomeScreen
