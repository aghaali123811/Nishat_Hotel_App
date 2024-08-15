/* import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Header from '../components/Header';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import HistoryBox from '../components/HistoryBox';
import {connect} from 'react-redux';
import {Themes} from '../store/utils/branchData';

const {greyPrimary, greySecondary} = AppTheme.colors;
const {PFregular, PFbold, OSregular, OSsemiBold} = AppTheme.fonts;

const history = [
  {
    name: 'Deluxe Room',
    timeStamp: '27 Jan 2020',
    points: '25 Points',
  },
  {
    name: 'Nishat Hotel Pay PKR 500',
    timeStamp: '11 Jan 2020',
    points: '-500 Points',
    bgColor: 'rgb(243,243,243)',
  },
  {
    name: 'Executive Room',
    timeStamp: '03 Jan 2020',
    points: '80 Points',
  },
  {
    name: 'Executive Room',
    timeStamp: '03 Jan 2020',
    points: '80 Points',
  },
];

const RewardScreen = (props) => {
  return (
    <>
      <Header title="Nishat Rewards" marginLeft={RFValue(75)} />

      <ScrollView contentContainerStyle={{paddingBottom: RFValue(40)}}>
        <View>
          <Image source={require('../assets/card.png')} style={styles.image} />
          <Text style={styles.pointValue}>320</Text>
          <Text style={styles.points}>Points</Text>
        </View>

        <View
          style={{
            marginHorizontal: RFValue(19),
          }}>
          <Text style={styles.earnText}>
            Earn Nishat Rewards points on each booking at Nishat Hotels
          </Text>

          <TouchableOpacity
            style={{...styles.button, borderColor: Themes[props.app.branch]}}>
            <Text style={{...styles.btnText, color: Themes[props.app.branch]}}>
              BOOK NOW
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.history}>HISTORY</Text>

        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <HistoryBox item={item} />}
          style={{borderTopWidth: 1, borderTopColor: greyPrimary}}
        />
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(RewardScreen);

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    width: RFValue(330),
    height: RFValue(220),
    marginVertical: RFValue(15),
  },

  earnText: {
    fontFamily: OSregular,
    fontSize: RFValue(15),
    marginBottom: RFValue(20),
  },

  button: {
    backgroundColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(52),
  },

  btnText: {
    fontSize: RFValue(17),
    fontFamily: OSsemiBold,
  },

  history: {
    color: greySecondary,
    fontFamily: OSregular,
    fontSize: RFValue(13),
    marginTop: RFValue(60),
    marginLeft: RFValue(20),
    marginBottom: RFValue(10),
  },

  pointValue: {
    color: '#fff',
    position: 'absolute',
    bottom: RFValue(60),
    left: RFValue(40),
    fontSize: RFValue(47),
    fontFamily: PFbold,
  },

  points: {
    color: '#fff',
    position: 'absolute',
    bottom: RFValue(40),
    left: RFValue(40),
    fontSize: RFValue(15),
    fontFamily: OSsemiBold,
  },
});
 */
