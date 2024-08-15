import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {changeBranch} from '../store/actions/AppActions';

const {PFregular} = AppTheme.fonts;
const {greyPrimary} = AppTheme.colors;

const HotelBottomSheet = (props) => {
  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        onPress={() => {
          props.changeBranch('Nishat Johar Town');
          props.refer.current.snapTo(1);
        }}>
        <Text style={styles.branchTxt}>Nishat Johar Town </Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        onPress={() => {
          props.changeBranch('Nishat Gulberg');
          props.refer.current.snapTo(1);
        }}>
        <Text style={styles.branchTxt}>Nishat Gulberg</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {changeBranch};

export default connect(mapStateToProps, mapDispatchToProps)(HotelBottomSheet);

const styles = StyleSheet.create({
  branchTxt: {
    fontFamily: PFregular,
    fontSize: RFValue(20),
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
    height: RFPercentage(18),
  },
});
