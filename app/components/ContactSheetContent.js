import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

const {PFregular, OSregular} = AppTheme.fonts;
const {greyPrimary, greySecondary} = AppTheme.colors;

const ContactSheetContent = (props) => {
  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity>
        <View>
          <Text style={styles.sectionHeader}>CALL US</Text>
          <Text style={styles.branchTxt}>
            {props.app.branch === 'Nishat Johar Town'
              ? '+92 042 111 646 835'
              : '+92-042-111-000-777'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity>
        <View>
          <Text style={styles.sectionHeader}>RESERVATIONS</Text>
          <Text style={styles.branchTxt}>
            {props.app.branch === 'Nishat Johar Town'
              ? 'reservationsj@nishathotel.com'
              : 'info@nishathotel.com'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(ContactSheetContent);

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
    paddingVertical: RFValue(15),
    height: RFPercentage(28),
  },

  sectionHeader: {
    color: greySecondary,
    fontFamily: OSregular,
    fontSize: RFValue(13),
  },
});
