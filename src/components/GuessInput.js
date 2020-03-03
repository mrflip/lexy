import React, { useState } from 'react'
import { StyleSheet, View,
}                          from 'react-native'
import { Button, Input, Icon,
}                          from 'react-native-elements'
import { Formik }          from 'formik'
import * as Yup            from 'yup'
//
import Layout         from '../lib/Layout'

const LetterButton = ({ letter, handler }) => (
  <Button
    title={letter}
    onPress={() => handler(letter)}
    style={styles.letterButton}
  />
)

const GuessInput = ({ bee, addToBee }) => {
  const [entry, setEntry] = useState('')

  const addLetter  = (letter) => setEntry(entry + letter)
  const delLetter  = ()       => setEntry(entry.substring(0, entry.length - 1))
  const clearEntry = ()       => setEntry('')

  const addGuess = () => {
    addToBee(entry)
    clearEntry()
  }

  return (
    <View style={styles.container}>
      <Input
        style={[styles.entryText]}
        autoCapitalize  = "none"
        autoCorrect     = {false}
        autoCompleteType = "off"
        value={entry}
        leftIcon={(
          <View style={styles.entryBox}>
            <Icon name="backspace" iconStyle={styles.entryIcon} onPress={delLetter} />
            <Icon name="cancel"    iconStyle={styles.entryIcon} onPress={clearEntry} />
          </View>
        )}
        onChangeText={(text) => setEntry(bee.normEntry(text))}
        rightIcon={(
          <Icon name="check" iconStyle={styles.entryIcon} onPress={addGuess} />
        )}
        onSubmitEditing ={addGuess}
      />

      <View style={styles.buttonRow}>
        {
          bee.larry.map((ltr) => (
            <LetterButton key={ltr} letter={ltr} handler={addLetter} />))
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:          '100%',
    alignItems:     'center',
  },
  //
  entryBox: {
    flexDirection:  'row',
    justifyContent: 'flex-start',
  },
  entryText: {
    fontSize:       20,
    flex:           4,
  },
  entryIcon: {
    marginLeft:     2,
    marginRight:    2,
  },
  letterButton: {
    padding:        5,
    margin:         5,
    width:          Layout.window.width / 9,
  },
  buttonRow: {
    flexDirection:  'row',
    justifyContent: 'space-around',
    width:          '80%',
  },
})

export default GuessInput
