import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import {connect} from 'react-redux';
import {Themes} from '../store/utils/branchData';

const {PFregular} = AppTheme.fonts;

const SubHeaderBox = ({text, date = false, guests = false, ...props}) => {
  return (
    <View style={{...styles.box, backgroundColor: Themes[props.app.branch]}}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(SubHeaderBox);

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    height: RFValue(35), 
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: RFValue(10),
    // paddingTop: RFValue(7),
    borderRadius: RFValue(5),
    marginHorizontal: RFValue(3),
  },

  text: {
    color: '#fff',
    // backgroundColor: 'red',
    fontFamily: PFregular,
    fontSize: RFValue(14),
    // paddingBottom: Platform==='ios'? RFValue(7) : RFValue(0),
  },
});
