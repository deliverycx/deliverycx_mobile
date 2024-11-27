import React from 'react';
import {COLORS} from '../../../shared/styles';
import {Icon} from '../../../shared/ui/Icon';

export const screenOptions = {
  tabBarIcon: ({color}: {color: string}) => (
    <Icon color={color} size="lg" name="watch-later" />
  ),
  tabBarActiveTintColor: COLORS.main,
  title: 'Мои заказы',
  tabBarLabel: 'Заказы',
};
