import React from 'react';
import {Icon} from '../../../shared/ui/Icon';
import {COLORS} from '../../../shared/styles';
import {useTotalCartPrice} from '../../../widgets/cart';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';
import {ClearCartButton} from '../../../entities/cart';

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
    tabBarBadge: totalPrice > 0 ? formattedTotalPrice : undefined,
    headerBackgroundContainerStyle: {
      shadowOffset: {width: -1, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    headerRight: () => <ClearCartButton />,
    tabBarBadgeStyle: {
      fontSize: 10,
      backgroundColor: COLORS.main,
      fontWeight: '500',
    },
  };
};
