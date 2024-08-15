import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import { connect } from 'react-redux';
import { Themes } from '../store/utils/branchData';

const { greyPrimary } = AppTheme.colors;
const { OSregular, OSsemiBold, PFbold } = AppTheme.fonts;

const BookNowComponent = (props) => {

  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [creditCardDiscountedPrice, setCreditCardDiscountedPrice] = useState(0);
  const [currency, setCurrency] = useState('');
  useEffect(() => {
    setData()
  }, [])
  const setData = async () => {
    setCurrency(props.currency)
    setPrice(await props.price());
    setDiscountedPrice(await props.discountedPrice())
    setCreditCardDiscountedPrice(await props.creditCardDiscountedPrice())
  }
  return (
    <View style={styles.bottomContainer}>
      {
        (price != 0 && discountedPrice != 0) ? <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: 20, justifyContent: 'center', paddingVertical: 5 }}>
          {
            (price != discountedPrice) ?
              <View>
                <Text style={{ fontSize: RFValue(15) }}>{currency} {discountedPrice}</Text>
                <Text style={{ fontSize: RFValue(10), textDecorationLine: 'line-through' }}>{currency} {price}</Text>
              </View> :
              <View>
                <Text style={{ fontSize: RFValue(17) }}>{currency} {price}</Text>
              </View>
          }
          {(creditCardDiscountedPrice != 0) &&
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: RFValue(13), fontWeight: '400' }}>{currency} {creditCardDiscountedPrice.toFixed(2)}</Text>
              <Text style={{ fontSize: RFValue(9), marginTop: -5 }}>Pay with credit card</Text>
            </View>
          }
        </View> :  <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: 20, justifyContent: 'center', paddingVertical: 5 }}>
          <ActivityIndicator size={45} color={'black'}/>
        </View>
      }

      <TouchableOpacity activeOpacity={0.7} onPress={props.onPress} style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.bookNow}>BOOK NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(BookNowComponent);

const styles = StyleSheet.create({
  loader: {
    marginLeft: RFValue(20),
    alignSelf: 'center',
    marginTop: RFValue(40)
  },

  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: RFValue(7),
    marginBottom: RFValue(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: greyPrimary,
    justifyContent: 'space-between',
    minHeight: RFValue(60)
  },

  price: {
    marginLeft: RFValue(20),
    fontFamily: PFbold,
  },

  discountedPrice: {
    marginLeft: RFValue(20),
    fontFamily: PFbold,
    fontSize: RFValue(22),
  },

  pkr: {
    marginHorizontal: RFValue(8),
    marginTop: RFValue(10),
    marginBottom: RFValue(5),
    marginLeft: RFValue(6),
    fontFamily: OSregular,
    fontSize: RFValue(14),
  },

  bookNow: {
    fontFamily: OSsemiBold,
    color: '#fff',
    fontSize: RFValue(16),
  },
});
