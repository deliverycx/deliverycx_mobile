import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

export const screenOptions: BottomTabNavigationOptions = {
  tabBarStyle: {position: 'absolute'},
  title: '',
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
