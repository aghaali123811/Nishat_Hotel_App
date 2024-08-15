import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Experiences, Restaurants } from '../store/utils/branchData';
import { connect } from 'react-redux';
import Routes from '../navigations/Routes';

const { PFregular } = AppTheme.fonts;
const { greyPrimary } = AppTheme.colors;

const ExperiencesList = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: '4%',
        marginBottom: RFValue(10),
      }}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={props.isExperience ? Experiences[props.app.branch] : (props.app.branch == 'Nishat Gulberg' ? Restaurants.gulberg : Restaurants.johartown)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            if (props.isExperience) {
              props.navigation.navigate(item.route)
            } else {
              props.navigation.navigate(Routes.Dining)
            }
          }} style={styles.experienceItem} key={Math.random()}>
            <Image
              source={item.image}
              style={{ height: RFValue(179), width: RFValue(122) }}
            />
            <Text style={styles.bottomText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(ExperiencesList);

const styles = StyleSheet.create({
  bottomTextContainer: {
    backgroundColor: greyPrimary,
    bottom: RFValue(35),
    opacity: 0.85,
    height: RFValue(36),
    justifyContent: 'center',
  },

  bottomText: {
    fontFamily: PFregular,
    fontSize: RFValue(17),
    marginLeft: RFValue(7),
    marginTop: RFValue(4),
  },

  experienceItem: {
    marginRight: RFValue(6),
    flex: 1,
  },
});
