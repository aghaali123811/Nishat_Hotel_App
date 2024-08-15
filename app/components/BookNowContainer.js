import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import {connect} from 'react-redux';
import {Themes} from '../store/utils/branchData';

const {greyPrimary} = AppTheme.colors;
const {OSregular, OSsemiBold, PFbold} = AppTheme.fonts;

const BookNowContainer = ({
  price = '',
  discountedPrice = '',
  showDiscountedPrice,
  showPrice = false,
  onPress,
  reload,
  currency = 'USD',
  ...props
}) => {
  const [discountPrice, setDiscountPrice] = useState(discountedPrice);
  const [prices, setPrices] = useState(price);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (currency !== 'USD') {
      var myHeaders = new Headers();
      myHeaders.append('apikey', 'sUzUG97slmIInsqOpujVYLmFv8HQkAgy');

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };
      const URL = `https://api.apilayer.com/exchangerates_data/convert?to=${currency}&from=USD&amount=${discountPrice}`;
      setLoader(true)
      fetch(URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success == true) {
            const result1 = result.result;
              setDiscountPrice(Math.round(result1));
              setLoader(false)
          } else {
            console.log('conversion not available');
          }
        })
        .catch((error) => console.log('error', error));
    }
    if (currency !== 'USD') {
      var myHeaders = new Headers();
      myHeaders.append('apikey', 'sUzUG97slmIInsqOpujVYLmFv8HQkAgy');

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };
      const URL = `https://api.apilayer.com/exchangerates_data/convert?to=${currency}&from=USD&amount=${price}`;
      setLoader(true)
      fetch(URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success == true) {
            const result1 = result.result;
              setPrices(Math.round(result1));
              setLoader(false)        
          } else {
            console.log('conversion not available');
            setPrices(price)
            alert('Currency conversion is not available right now!')
          }
        })
        .catch((error) => console.log('error', error));
    }
    return () => {
      setPrices()
      setDiscountPrice();
    }
  }, [currency]);
  
  const checkPrice = () => {
    if (prices?.toString() == discountPrice?.toString()) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={styles.bottomContainer}>
      {showPrice && (
        <>
          <View style={{flexDirection: 'column'}}>
            {checkPrice() && showDiscountedPrice && (
              <Text
                style={{
                  ...styles.discountedPrice,
                  color: Themes[props.app.branch],
                }}>
                {discountPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            )}
            <Text
              style={[
                {...styles.price, color: Themes[props.app.branch]},
                !checkPrice() || !showDiscountedPrice
                  ? {fontSize: RFValue(30)}
                  : {fontSize: RFValue(14), textDecorationLine: 'line-through'},
              ]}>
              {loader? <ActivityIndicator style={styles.loader}/> : currency !== 'USD'? prices?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : price}
            </Text>
          </View>
          {
            (props.text && props.text=="VIEW DETAIL")?null: <Text style={styles.pkr}>
            {currency}
            {'\n1 night'}
          </Text>
          }
         
        </>
      )}

      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: Themes[props.app.branch],
          paddingVertical: showPrice ? RFValue(5) : RFValue(10),
          paddingHorizontal: RFValue(22),
          width: showPrice ? '45%' : '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text style={styles.bookNow}>{(props.text && props.text!='')?props.text:'BOOK NOW'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(BookNowContainer);

const styles = StyleSheet.create({
  loader:{
    marginLeft: RFValue(20),  
    alignSelf: 'center', 
    marginTop: RFValue(40)
  },

  bottomContainer: {
    flexDirection: 'row',
    marginTop: RFValue(7),
    marginBottom: RFValue(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: greyPrimary,
    justifyContent: 'space-between',
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
