import React from 'react';
import {Icon} from '../../../shared/ui/Icon';
import {COLORS} from '../../../shared/styles';
import {useTotalCartPrice} from '../../../widgets/cart';
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
    tabBarBadge: totalPrice > 0 ? formattedTotalPrice : undefined,
    tabBarBadgeStyle: {
      fontSize: 10,
      backgroundColor: COLORS.main,
      fontWeight: '500',
    },
  };
};
