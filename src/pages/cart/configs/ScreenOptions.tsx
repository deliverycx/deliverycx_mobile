import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';
import React from 'react';
import type {Animated, StyleProp, ViewStyle} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {COLORS} from '../../../shared/styles';
import {Icon} from '../../../shared/ui/Icon';
import {ClearCartButton, useTotalCartPrice} from '../../../widgets/cart';

const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
  borderTopWidth: 0,
};

if (!DeviceInfo.hasNotch()) {
  tabBarStyle.paddingBottom = 4;
}

export const ScreenOptions = (): BottomTabNavigationOptions => {
  const {formattedTotalPrice, totalPrice} = useTotalCartPrice();

  return {
    tabBarIcon: ({color}: {color: string}) => (
      <Icon color={color} size="lg" name="shopping-cart" />
    ),
    tabBarStyle,
    tabBarActiveTintColor: COLORS.main,
    title: '',
    tabBarLabel: 'Корзина',
    headerTitle: 'Корзина',
    tabBarBadge: totalPrice > 0 ? formattedTotalPrice : undefined,
    headerBackgroundContainerStyle: {
      shadowOffset: {width: -1, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    headerRight: () => <ClearCartButton />,
    tabBarBadgeStyle: {
      fontSize: 10,
      backgroundColor: COLORS.accent,
      fontWeight: '500',
    },
  };
};
