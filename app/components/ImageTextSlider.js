import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Routes from '../navigations/Routes';

const {PFbold, OSregular} = AppTheme.fonts;
const {greyPrimary} = AppTheme.colors;

const ImageTextSlider = ({data, navigation, canNavigate = true}) => {
  /* console.log(data); */
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        flexDirection: 'row',
        marginHorizontal: RFValue(9),
      }}>
      {data.map((i) => (
        <TouchableOpacity
          activeOpacity={canNavigate ? 0.8 : 1}
          onPress={() =>
            canNavigate
              ? navigation.navigate(Routes.DiningDetails, {restaurant: i})
              : 'undefined'
          }
          style={{
            marginHorizontal: RFValue(8),
            marginVertical: RFValue(10),
            width: RFValue(285),
          }}
          key={Math.random()}>
          <Image
            source={i.images[0]}
            style={{
              width: RFValue(290),
              height: RFValue(290),
              borderWidth: 1,
              borderColor: greyPrimary,
              paddingRight: RFValue(10),
            }}
          />
          <View style={styles.TextContainer}>
            <Text style={styles.name}>{i.name}</Text>
            <Text style={styles.desc}>{i.desc}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ImageTextSlider;

const styles = StyleSheet.create({
  TextContainer: {
    marginTop: RFValue(15),
  },

  name: {
    marginBottom: RFValue(12),
    fontFamily: PFbold,
    fontSize: RFValue(26),
  },

  desc: {
    /* width: RFValue(290), */
    color: 'rgb(44,44,44)',
    fontFamily: OSregular,
    fontSize: RFValue(14),
  },
});
