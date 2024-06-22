import React from 'react';
import {Icon} from '../../../shared/ui/Icon';
import {COLORS} from '../../../shared/styles';

export const screenOptions = {
  tabBarIcon: ({color}: {color: string}) => (
    <Icon color={color} size="lg" name="shopping-cart" />
  ),
  tabBarActiveTintColor: COLORS.main,
  title: '',
  tabBarLabel: 'Корзина',
};
