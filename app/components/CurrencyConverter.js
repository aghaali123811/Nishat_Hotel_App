import {StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const CurrencyConverter = ({open, setOpen, branchTheme, value, setValue}) => {
  const [items, setItems] = useState([
    {
      label: 'USD',
      value: 'USD',
      icon: () => (
        <Image
          source={require('../assets/USD.png')}
          style={styles.currencyIcon}
        />
      ),
    },
    {
      label: 'PKR',
      value: 'PKR',
      icon: () => (
        <Image
          source={require('../assets/PKR.png')}
          style={styles.currencyIcon}
        />
      ),
    },
    {
      label: 'GBP',
      value: 'GBP',
      icon: () => (
        <Image
          source={require('../assets/POUND.png')}
          style={styles.currencyIcon}
        />
      ),
    },
    {
      label: 'EUR',
      value: 'EUR',
      icon: () => (
        <Image
          source={require('../assets/EURO.png')}
          style={styles.currencyIcon}
        />
      ),
    },
    {
      label: 'AUD',
      value: 'AUD',
      icon: () => (
        <Image
          source={require('../assets/AU.png')}
          style={styles.currencyIcon}
        />
      ),
    },
    {
      label: 'SAR',
      value: 'SAR',
      icon: () => (
        <Image
          source={require('../assets/SUDIA.png')}
          style={styles.currencyIcon}
        />
      ),
    },
    {
      label: 'AED',
      value: 'AED',
      icon: () => (
        <Image
          source={require('../assets/AED.png')}
          style={styles.currencyIcon}
        />
      ),
    },
    {
      label: 'CAD',
      value: 'CAD',
      icon: () => (
        <Image
          source={require('../assets/CA.png')}
          style={styles.currencyIcon}
        />
      ),
    },
  ]);

  return (
    <DropDownPicker
      maxHeight={'100%'}
      dropDownDirection="BOTTOM"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={2000}
      dropDownContainerStyle={{
        //elevation: 2000,
      }}
      containerStyle={{
        width: '30%',
        // backgroundColor: branchTheme,
        borderRadius: 0,
      }}
      listItemContainerStyle={{borderBottomWidth: 1}}
      disableBorderRadius={true}
      showArrowIcon={true}
      listMode="SCROLLVIEW"
      scrollViewProps={{
        decelerationRate: 'fast',
      }}
      style={{
        borderWidth: 0,
        borderRadius: 0,
        zIndex: 1000,
      }}
      iconContainerStyle={{
        marginRight: 5,
      }}
    />
  );
};

export default CurrencyConverter;

const styles = StyleSheet.create({
  currencyIcon: {
    width: 25,
    height: 25,
    resizeMode: 'stretch',
  },
});
