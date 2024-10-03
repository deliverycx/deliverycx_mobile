import {BlurView} from '@react-native-community/blur';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';

export const screenOptions: BottomTabNavigationOptions = {
  tabBarStyle: {position: 'absolute'},
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    elevation: 0,
  },
  tabBarBackground: () => (
    <BlurView
      blurType="xlight"
      style={styles.blurView}
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    />
  ),
};

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
  },
});
