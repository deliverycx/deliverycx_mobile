import React from 'react';
import {Icon} from '../../../shared/ui/Icon';
import {COLORS} from '../../../shared/styles';
import {useTotalCartPrice, ClearCartButton} from '../../../widgets/cart';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';

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
