import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import PrimaryButton from './PrimaryButton';

import PrimaryInputField from '../components/PrimaryInputField';
import SimpleButton from '../components/SimpleButton';

import {Formik} from 'formik';
import * as yup from 'yup';

import {login} from '../store/actions/AppActions';
import {connect} from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';

const {PFregular, OSregular} = AppTheme.fonts;
const {greyPrimary, greySecondary} = AppTheme.colors;
let count;

const SimpleBottomSheet = ({refer, ...props}) => {
  return (
    <BottomSheet
      ref={refer}
      initialSnap={0}
      snapPoints={[AppTheme.metrics.deviceHeight * 0.5, 0]}
      renderHeader={() => (
        <Text style={{backgroundColor: 'red'}}>This is header</Text>
      )}
      onOpenStart={() => refer.current.snapTo(0)}
      onCloseEnd={() => refer.current.snapTo(1)}
      renderContent={() => (
        <View style={styles.container}>
          <Text>This is simple bottom sheet</Text>
          {/* add function in which setTotalGuests, setGuestsInfo and snapTo(1) is called. remove useEffect */}
        </View>
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleBottomSheet);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  Heading: {
    fontFamily: PFregular,
    fontSize: RFValue(25),
    marginBottom: RFValue(20),
    paddingHorizontal: RFValue(15),
    textAlign: 'center',
  },
  text: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    marginLeft: RFValue(18),
  },
  button: {
    marginTop: RFValue(16),
  },
});
