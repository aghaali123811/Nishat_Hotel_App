import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppTheme from '../styles/AppTheme';
import Animated from 'react-native-reanimated';
const ShadowLayers = ({children, animatedStyle}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, animatedStyle])}>
      <View style={styles.leftLayer} />
      <View style={styles.centerLayer} />
      <Animated.View
        style={[
          styles.outerContainer,
          {
            borderRadius: animatedStyle.borderRadius,
          },
        ]}>
        <Animated.View style={[styles.innerContainer]}>
          {children}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  leftLayer: {
    backgroundColor: 'white',
    width: '100%',
    right: 0,
    position: 'absolute',
    left: -AppTheme.metrics.deviceWidth * 0.12,
    top: AppTheme.metrics.deviceWidth * 0.23,
    bottom: AppTheme.metrics.deviceWidth * 0.23,
    borderRadius: 10,
    shadowColor: AppTheme.colors.primaryColor,
    shadowOffset: {width: -4, height: 4},
    shadowOpacity: 0.25,
    elevation: 3,
    opacity: 0.5,
  },
  centerLayer: {
    backgroundColor: 'white',
    right: 0,
    position: 'absolute',
    left: -AppTheme.metrics.deviceWidth * 0.057,
    top: AppTheme.metrics.deviceWidth * 0.1,
    bottom: AppTheme.metrics.deviceWidth * 0.1,
    borderRadius: 10,
    shadowColor: AppTheme.colors.primaryColor,
    shadowOffset: {width: -4, height: 4},
    shadowOpacity: 0.25,
    elevation: 4,
    opacity: 0.5,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: AppTheme.colors.primaryColor,
    shadowOffset: {width: -4, height: 4},
    shadowOpacity: 0.25,
  },
  innerContainer: {
    overflow: 'hidden',
    flex: 1,
  },
});
export default ShadowLayers;
