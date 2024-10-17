import {BlurView} from '@react-native-community/blur';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
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
  tabBarBackground: () =>
    Platform.select({
      ios: (
        <View style={styles.blurViewWrapper}>
          <BlurView
            blurType="xlight"
            style={styles.blurView}
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </View>
      ),
      android: undefined,
    }),
};

const styles = StyleSheet.create({
  blurViewWrapper: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
});
