import {BlurView} from '@react-native-community/blur';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  StyleSheet,
  type Animated,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
  position: 'absolute',
  borderTopWidth: 0,
};

if (!DeviceInfo.hasNotch()) {
  tabBarStyle.paddingBottom = 4;
}

export const screenOptions: BottomTabNavigationOptions = {
  tabBarStyle,
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    elevation: 0,
    borderTopWidth: 0,
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
