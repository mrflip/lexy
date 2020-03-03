import * as React     from 'react';
import { StyleSheet, Text, View, SafeAreaView,
}                     from 'react-native';
import { Button, Input, Icon,
}                     from 'react-native-elements'
//
import Layout         from '../lib/Layout'
import WordLists      from '../components/WordLists'

const LetterButton = ({ letter, handler }) => (
  <Button
    title={letter}
    onPress={() => handler(letter)}
    style={styles.letterButton}
  />
)

class BeeScreen extends React.Component {
  constructor(props) {
    super(props)
    const { route  }      = props
    const { params = {} } = route
    const { bee } = params
    this.state = {
      entry:   '',
      guesses: bee.guesses,
      gbs:     bee.guessesByScore(),
      nogos:   bee.nogos,
      bee,
    }
    console.log('bscr', this.state, params)
  }

  elements = {
  }

  render() {
    const { bee, entry, guesses, nogos, gbs } = this.state
    console.log('gbs', gbs)
    return (
      <SafeAreaView style={styles.container}>
        <WordLists delEntry={this.delEntry} guesses={gbs} nogos={nogos} />
        <Input
          style={[styles.entryText]}
          ref={(inp) => { this.elements.entry = inp }}
          autoCapitalize  = "none"
          autoCorrect     = {false}
          autoCompleteType = "off"
          value={entry}
          leftIcon={(
            <View style={styles.entryBox}>
              <Icon name="backspace" iconStyle={styles.entryIcon} onPress={this.delLetter} />
              <Icon name="cancel" iconStyle={styles.entryIcon} onPress={this.clearEntry} />
            </View>
          )}
          rightIcon={(
            <Icon name="check" iconStyle={styles.entryIcon} onPress={this.addGuess} />
          )}
          onChangeText={(text) => this.setState({ entry: bee.normEntry(text) })}
          onSubmitEditing ={this.addGuess}
        />

        <View style={styles.buttonRow}>
          {
            bee.larry.map((ltr) => (
              <LetterButton key={ltr} letter={ltr} handler={(ll) => this.addLetter(ll)} />))
          }
        </View>

        <View style={styles.guessBox}>
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
      </SafeAreaView>
    );
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

  clearEntry = () => (
    this.setState(() => ({ entry: '' }))
  )

  addGuess = () => {
    this.setState(({ entry, bee }) => {
      if (bee.hasWord(entry)) return ({ entry: '' })
      bee.addGuess(entry)
      return ({
        guesses: bee.guesses,
        gbs:     bee.guessesByScore(),
        nogos:   bee.nogos,
        entry: '',
      })
    })
    this.elements.entry.focus()
  }

  delEntry = (word) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:      'center',
  },
  entryText: {
    fontSize: 20,
    width: "60%",
    flex: 4,
  },
  //
  entryBox: {
    flexDirection:   'row',
    justifyContent:  'flex-start',
  },
  entryIcon: {
    marginLeft:  2,
    marginRight: 2,
  },
  letterButton: {
    padding: 5,
    margin: 5,
    width: Layout.window.width / 9,
  },
  buttonRow: {
    flexDirection:   'row',
    justifyContent:  'space-around',
    width:           '80%',
  },
});

export default BeeScreen
