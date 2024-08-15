import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';

const {PFregular} = AppTheme.fonts;
const {greyPrimary} = AppTheme.colors;

const BranchDropDown = ({setShowDropDown, changeBranch}) => {
  const selectAndClose = (branch) => {
    setShowDropDown(false);
    changeBranch(branch);
  };

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity onPress={() => selectAndClose('Nishat Johar Town')}>
        <Text style={styles.branchTxt}>Nishat Johar Town </Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity onPress={() => selectAndClose('Nishat Gulberg')}>
        <Text style={styles.branchTxt}>Nishat Gulberg</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
};

export default BranchDropDown;

const styles = StyleSheet.create({
  branchTxt: {
    fontFamily: PFregular,
    fontSize: RFValue(17),
  },
  divider: {
    marginVertical: RFValue(10),
    height: 1,
    backgroundColor: greyPrimary,
  },

  contentContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: RFValue(18),
    paddingVertical: RFValue(10),
    //borderBottomWidth: 1,
    borderBottomColor: greyPrimary,
  },
});
