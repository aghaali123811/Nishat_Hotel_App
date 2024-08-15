import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import Header from './Header';
import AppTheme from '../styles/AppTheme';

const {OSsemiBold} = AppTheme.fonts;
const {greyPrimary} = AppTheme.colors;

function TabBar({state, descriptors, navigation}) {
  return (
    <View>
      <Header title="My Bookings" marginLeft={RFValue(90)} />
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={Math.random()}
              style={{padding: RFValue(10), marginHorizontal: RFValue(55)}}
              onPress={onPress}>
              <Text style={{fontFamily: OSsemiBold, fontSize: RFValue(14)}}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
export default TabBar;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: greyPrimary,
  },
});
