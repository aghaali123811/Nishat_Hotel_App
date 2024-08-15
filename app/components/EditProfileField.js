import React,{forwardRef,useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import { connect } from 'react-redux';
import { Themes } from '../store/utils/branchData';
import Routes from '../navigations/Routes';
import * as Animatable from 'react-native-animatable';
const { greyPrimary, greySecondary, dark } = AppTheme.colors;
const { OSsemiBold, OSregular } = AppTheme.fonts;

const EditProfileField = ({
  editable,
  keyboardType,
  autoCapitalize,
  touched,
  error,
  onChangeText,
  onBlur,
  value,
  secureTextEntry,
  placeholder,
  onChange,
  multiline = false,
  maxLength = 999,
  returnKeyType,
  onSubmit,
  pointerEvents,
  label
}, ref) => {

  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.label}>{label}</Text>
        <>
          <TextInput
            autoCapitalize={autoCapitalize}
            editable={editable}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            multiline={multiline}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onChangeText={onChangeText}
            placeholder={placeholder}
            maxLength={maxLength}
            onSubmitEditing={onSubmit}
            blurOnSubmit={true}
            // placeholderTextColor={focused ? '#000' : undefined}
            onBlur={() => {
              onBlur();
              setFocused(true);
            }}
            secureTextEntry={secureTextEntry}
            style={styles.inputField}
            placeholderTextColor='grey'
            ref={ref}
            pointerEvents={pointerEvents}
          />
          {touched && error && (
            <Animatable.Text animation="bounceIn" style={styles.error}>
              {error}
            </Animatable.Text>
          )}
        </>
      </View>
    </View>
  );
};

// export default EditProfileField;
export default forwardRef(EditProfileField);
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: RFValue(16),
    backgroundColor: 'white',
    borderBottomColor: greyPrimary,
    borderBottomWidth: 1,
  },

  label: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    width: '30%',
    color: greySecondary,
  },

  inputField: {
    color: dark,
    fontSize: RFValue(16),
    fontFamily: OSregular,
  },
  error: {
    color: 'darkred',
    marginTop: '0%',
    fontSize: RFValue(12),
  },
});
