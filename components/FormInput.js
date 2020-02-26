import React                from 'react'
import { Input }            from 'react-native-elements'
import { StyleSheet, View,
}                           from 'react-native'
import { Ionicons }         from '@expo/vector-icons'
//
import Colors               from '../constants/Colors'

const inputIcons = {
  email:    'ios-mail',
  password: 'ios-lock',
  pw: 'ios-home',
  pw3: 'ios-home',
}

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  errors,
  touched,
  values,
  formElements,
  handleBlur,
  handleChange,
  nextInput,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      leftIcon               = {
        <Ionicons name={inputIcons[name] || "none"} size={28} color={iconColor || Colors.inputIconColor} />
      }
      ref                    = {(input) => (formElements[name] = input)} // eslint-disable-line
      leftIconContainerStyle = {styles.iconStyle}
      placeholderTextColor   = "grey"
      name                   = {name}
      placeholder            = {placeholder}
      style                  = {styles.input}
      value                  = {values[name]}
      onBlur                 = {handleBlur(name)}
      onChangeText           = {handleChange(name)}
      returnKeyType          = {returnKeyType || "next"}
      errorMessage           = {touched[name] && errors[name]}
      enablesReturnKeyAutomatically
    />
  </View>
)

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15,
  },
  iconStyle: {
    marginRight: 10,
  },
})

export default FormInput
