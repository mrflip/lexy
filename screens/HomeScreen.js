import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,
         FlatList,
} from 'react-native';
import { Button, Input, Icon, ListItem
}                     from 'react-native-elements'
import FormInput      from '../components/FormInput'
import Layout         from '../constants/Layout'
import Dict from '../data/wl_us.json';
const  DictSet = new Set();
for (let wd of Dict) DictSet.add(wd);

const LetterButton = ({letter, handler}) => (
  <Button
    title={letter}
    onPress={() => handler(letter)}
    style={styles.letterButton}
  />
)

class HomeScreen extends React.Component {
  state = {
    letters: 'MAOBLNR',
    entry: '',
    words: [],
    valid: false
  }

  elements = {
  }

  addLetter(letter, ...rest) {
    console.log('hi', this.state, letter, rest)
    const newVal = this.state.entry + letter
    this.setState(({ entry, valid }) => ({
      entry: newVal,
      valid: DictSet.has(newVal),
    }))
  }

  clearEntry = () => this.setState(({ entry }) => ({ entry: '' }))

  addEntry = () => {
    this.setState(({ entry, words }) => {
      words.push(entry)
      return({
        words,
        entry: '',
      })
    })
  }

  wordListItem = ({item}) => {
    console.log(item);
    // return( <ListItem title={item}/> )
    return(
      <Text
        style={styles.wordListItem}
      >
        {item}
      </Text>
    )
  }
  
  render() {
    const { letters, entry, words, valid } = this.state
    return (
      <View style={styles.container}>
        <FlatList style={styles.wordList}
                  keyExtractor={(word, idx) => (idx.toString())}
                  data={words}
                  renderItem={this.wordListItem}
        />
        <Input
          style={styles.lettersInput}
          value={letters}
          onChangeText={(text) => this.setState({letters: text}) }
        />
        <View style={styles.entryBox}>
          <Icon
            name="cancel"
            style={styles.clearEntry}
            onPress={() => this.clearEntry()}
          />
          <Text style={[styles.entryText, (valid ? styles.entryValid : styles.entryBad)]}
                ref={(el) => (this.elements['entry'] = el)}
          >
            {entry}
          </Text>
          <Icon
            name="check"
            style={styles.clearEntry}
            onPress={this.addEntry}
          />
        </View>
        <View style={styles.buttonRow}>
          <LetterButton letter={letters[0]} handler={(ll) => this.addLetter(ll)} />
          <LetterButton letter={letters[1]} handler={(ll) => this.addLetter(ll)} />
          <LetterButton letter={letters[2]} handler={(ll) => this.addLetter(ll)} />
          <LetterButton letter={letters[3]} handler={(ll) => this.addLetter(ll)} />
          <LetterButton letter={letters[4]} handler={(ll) => this.addLetter(ll)} />
          <LetterButton letter={letters[5]} handler={(ll) => this.addLetter(ll)} />
          <LetterButton letter={letters[6]} handler={(ll) => this.addLetter(ll)} />
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
  entryValid: {
    backgroundColor: '#cceecc',
  },
  entryBad: {
    backgroundColor: '#eecccc',
  },
  entryBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    margin:  10,
  },
  clearEntry: {
    alignSelf: 'flex-end',
  },
  letterButton: {
    padding: 5,
    margin: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  wordList: {
    width: '100%',
  },
  wordListItem: {
    padding: 5,
  }
});

export default HomeScreen
