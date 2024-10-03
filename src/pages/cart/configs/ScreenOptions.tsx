import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';
import React from 'react';
import {COLORS} from '../../../shared/styles';
import {Icon} from '../../../shared/ui/Icon';
import {ClearCartButton, useTotalCartPrice} from '../../../widgets/cart';

export const ScreenOptions = (): BottomTabNavigationOptions => {
  const {formattedTotalPrice, totalPrice} = useTotalCartPrice();

  return {
    tabBarIcon: ({color}: {color: string}) => (
      <Icon color={color} size="lg" name="shopping-cart" />
    ),
    tabBarActiveTintColor: COLORS.main,
    title: '',
    tabBarLabel: 'Корзина',
    headerTitle: 'Корзина',
    tabBarStyle: {
      borderTopWidth: 0,
    },
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
