import React from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import Header from '../components/Header';
import WhatsappFloating from '../components/WhatsappFloating';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import {Offers} from '../store/utils/branchData';
import {connect} from 'react-redux';

const {greyPrimary} = AppTheme.colors;

const OffersScreen = (props) => {
  return (
    <View style={{flex: 1}}>
      <WhatsappFloating/>
      <Header title="Offers" marginLeft={RFValue(110)} />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Offers[props.app.branch]}
        renderItem={({item}) => <Image source={item} style={style.image} />}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(OffersScreen);

const style = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: greyPrimary,
    width: RFValue(320),
    height: RFValue(220),
    marginHorizontal: RFValue(17),
    marginVertical: RFValue(10),
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
});
