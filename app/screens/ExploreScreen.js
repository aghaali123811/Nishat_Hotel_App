import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  Platform,TouchableOpacity
} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import Header from '../components/Header';
import BranchSelector from '../components/BranchSelector';
import WhatsappFloating from '../components/WhatsappFloating';
import AppTheme from '../styles/AppTheme';
import PrimaryButton from '../components/PrimaryButton';
import {connect} from 'react-redux';
import {ExploreHotel, HotelImages} from '../store/utils/branchData';
import Routes from '../navigations/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import VideoSlider from '../components/VideoSlider';
const {PFregular, PFbold, OSregular} = AppTheme.fonts;
const {black} = AppTheme.colors;

const ExploreScreen = (props) => {
  return (
    <>
    <WhatsappFloating/>
      {props.app.isLoggedIn ? (
        <Header
          title="Explore"
          rightIcon={require('../assets/icNotificaion.png')}
          rightOnPress={() => props.navigation.navigate(Routes.Notifications)}
        />
      ) : (
        <Header title="Explore" />
      )}
      <BranchSelector />

      <ScrollView showsVerticalScrollIndicator={false}>
      <VideoSlider images={HotelImages[props.app.branch]} />
        {/* <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
          {HotelImages[props.app.branch].map((item, index) => {
            return (
              <Image
                key={index}
                source={item}
                style={{
                  marginRight: RFValue(3),
                  height: RFPercentage(44),
                  width: RFPercentage(48),
                }}
              />
            );
          })}
        </ScrollView> */}
  
        {/* <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={HotelImages[props.app.branch]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Image
              source={item}
              style={{
                marginRight: RFValue(3),
                height: RFPercentage(44),
                width: RFPercentage(48),
              }}
            />
          )}
        /> */}

        <Text style={styles.Headings}>
          {(props.app.branch === 'Nishat Johar Town')?'Modern Boutique Hotel in Johar Town, Lahore' :'Enter the Luxurious World of The Nishat Hotel'}
        </Text>
        <Text style={styles.description}>
          {(props.app.branch === 'Nishat Johar Town')?'The Nishat Hotel in Johar Town is a lavish hallmark of luxury connected to the World-Class Emporium Mall, making it the perfect venue for your stay.':'Welcome to The Nishat Hotel, your hidden sanctuary in the heart of Gulberg Lahore.'}
        </Text>
        <View
          style={{
            width: Platform.OS === 'android' ? '90%' : '100%',
            marginLeft: Platform.OS === 'android' && '5%',
          }}>
          <PrimaryButton
            label="BOOK NOW"
            onPress={() => props.navigation.navigate(Routes.Rooms)}
          />
        </View>
        <Text
          style={[
            styles.Headings,
            {marginTop: RFValue(23), marginBottom: RFValue(15)},
          ]}>
          Explore our hotel
        </Text>

          {ExploreHotel[props.app.branch].map((item, index) => {
            return (
              <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                props.navigation.navigate(item.route)
              }} key={index}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.imageCaption}>{item.name}</Text>
              </View>
            </TouchableOpacity>
            );
          })}
        {/* <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={ExploreHotel[props.app.branch]}
          renderItem={({item}) => (
            <View>
              <Image source={item.image} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.imageCaption}>{item.name}</Text>
              </View>
            </View>
          )}
        /> */}
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
  app: state.appReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);

const styles = StyleSheet.create({
  image: {
    height: RFPercentage(33),
    width: RFPercentage(49),
    marginBottom: RFValue(20),
    alignSelf: 'center',
  },

  overlay: {
    height: RFPercentage(33),
    width: RFPercentage(49),
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  Headings: {
    fontFamily: OSregular,
    fontSize: RFValue(32),
    marginHorizontal: RFValue(18),
    marginTop: RFValue(12),
    color: black,
  },

  description: {
    fontFamily: OSregular,
    marginHorizontal: RFValue(15),
    fontSize: RFValue(14),
    marginVertical: RFValue(15),
  },

  imageCaption: {
    /* position: 'absolute', */
    top: RFValue(170),
    left: RFValue(12),
    color: '#fff',
    fontSize: RFValue(25),
    fontFamily: PFregular,
  },
});




