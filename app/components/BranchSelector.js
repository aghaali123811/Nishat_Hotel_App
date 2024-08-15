import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import BranchDropDown from './BranchDropDown';
import {connect, useDispatch} from 'react-redux';
import {changeBranch} from '../store/actions/AppActions';

const {OSsemiBold} = AppTheme.fonts;

const BranchSelector = (props) => {
  // const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.branchSelector}
        onPress={() => setShowDropDown(!showDropDown)}>
        <Text style={{fontFamily: OSsemiBold}}>{props.app.branch}</Text>
        <Image
          source={require('../assets/cdown_black.png')}
          style={{transform: [{rotate: showDropDown ? '180deg' : '0deg'}]}}
        />
      </TouchableOpacity>

      {showDropDown && (
        <BranchDropDown
          changeBranch={props.changeBranch}
          setShowDropDown={setShowDropDown}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profileReducer,
  app: state.appReducer,
});

const mapDispatchToProps = {changeBranch};

export default connect(mapStateToProps, mapDispatchToProps)(BranchSelector);

const styles = StyleSheet.create({
  branchSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: RFValue(9),
    backgroundColor: 'transparent',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});
