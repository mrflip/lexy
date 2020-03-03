import React, { useState } from 'react'
import { StyleSheet, View,
}                          from 'react-native'
import { Button, Input, Icon,
}                          from 'react-native-elements'
import { useMutation,
}                          from '@apollo/client';
import { Formik }          from 'formik'
import * as Yup            from 'yup'
//
import Bee                 from '../lib/Bee'
import Ops                 from '../graphql/Ops'

const validationSchema = Yup.object().shape({
  letters: Yup
    .string()
    .label('Letters')
    .min(7, "Enter 7 letters")
    .matches(/^([a-zA-Z][^a-zA-Z]*){7}$/, "Enter 7 letters"),
})

const addBeePlz = (addBeeMu, entry) => {
  addBeeMu({ variables: { letters: entry } })
}


const NewBee = () => {
  const [entry, setEntry]  = useState('')
  const [addBeeMu] = useMutation(Ops.bee_put_mu, {
    update: (cache, { data: { bee_put, ...restDat } }) => {
      console.log('bp', bee_put, 'rest', restDat)
      const { bee_list: { bees } } = cache.readQuery({ query: Ops.bee_list_qy })
      console.log('bp', bees)
      cache.writeQuery({
        query: Ops.bee_list_qy,
        data:  { bee_list: { bees: bees.concat([bee_put.bee]) } },
      })
    },
  })

  //
  return (
    <View style={styles.container}>
      <Input
        containerStyle   ={styles.lettersInput}
        value            ={entry}
        placeholder      ="New Letters; Main Letter First"
        autoCapitalize   = "none"
        autoCorrect      = {false}
        autoCompleteType = "off"
        onChangeText     ={(text) => setEntry(Bee.normalize(text).toUpperCase())}
      />
      <Button
        title            =" New Bee"
        icon             ={<Icon name="add-circle-outline" />}
        onPress          ={() => { addBeePlz(addBeeMu, entry); setEntry('') }}
        style            ={styles.newBeeBtn}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: 'center',
    flexDirection:   'row',
  },
  lettersInput: {
    flex: 1,
  },
  newBeeBtn: {
    flex: 10,
  },
})

export default NewBee
