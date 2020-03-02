import * as React     from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, SectionList,
}                     from 'react-native';
import { Button, Input, Icon, Divider,
}                     from 'react-native-elements'
//
import Layout         from '../constants/Layout'
import HeaderedScreen from '../components/HeaderedScreen'
import Bee            from '../lib/Bee'


const LetterButton = ({ letter, handler }) => (
  <Button
    title={letter}
    onPress={() => handler(letter)}
    style={styles.letterButton}
  />
)

const initialLetters =  'MAOBLNR'

class BeeScreen extends React.Component {
  constructor(props) {
    super(props)
    const { route  } = props
    const { name, params = {} } = route
    this.state = {
      entry:   '',
      guesses: [],
      gbs:     [],
      nogos:   [],
      bee:     new Bee(params.letters),
    }
    // console.log(this.state, 'nav', navigation, navigation.options, 'vals', props)
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

  validStyle = (guess) => {
    if (!guess.valid)  return styles.entryBad
    if (guess.nogo)    return styles.nogo
    if (guess.isPan)   return styles.entryPangram
    return styles.entryValid
  }

  wordListItem = ({ item }) => {
    const guess = item
    console.log('wli', guess)
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

  newNav = (navigation) => {
    navigation.navigate('NEWBEE', { foo: 'bar', letters: 'C/AIHRLV' })
  }

  render() {
    const { bee, entry, guesses, nogos, gbs } = this.state
    console.log('gbs', gbs)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wordListBox}>
          <SectionList
            style={[styles.wordList, styles.wordListLeft]}
            keyExtractor={(guess, idx) => (guess.word)}
            sections={gbs}
            renderItem={this.wordListItem}
            ListEmptyComponent={(<Text>Make a Guess</Text>)}
            renderSectionHeader={({ section, ...rest }) => {
              console.log('rsh', section, rest)
              return (<Text style={styles.wordListHeader}>{section.title}</Text>)
            }}
          />
          <FlatList
            style={[styles.wordList, styles.wordListRight]}
            keyExtractor={(word, idx) => (idx.toString())}
            data={nogos}
            renderItem={this.wordListItem}
          />
        </View>
        
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
      </SafeAreaView>
    );
  }
}

BeeScreen.navigationOptions = {
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
  entryText: {
    fontSize: 20,
    width: "60%",
    flex: 4,
  },
  wordListBox: {
    width: '100%',
    flex:   6,
    flexDirection: 'row',
  },
  wordList: {
    width: '100%',
    flex: 1,
  },
  wordListLeft: {
    backgroundColor: '#fff',
  },
  wordListRight: {
    backgroundColor: '#eee',
  },
  wordListItemBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  wordListHeader: {
    fontSize: 20,
    backgroundColor: '#eee',
    textAlign: 'center',
    padding:  2,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default BeeScreen
