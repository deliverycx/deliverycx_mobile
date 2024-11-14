import React from 'react';
import {COLORS} from '../../../shared/styles';
import {Icon} from '../../../shared/ui/Icon';

export const screenOptions = {
  tabBarIcon: ({color}: {color: string}) => (
    <Icon color={color} size="lg" name="format-list-bulleted" />
  ),
  tabBarActiveTintColor: COLORS.main,
  title: 'История заказов',
  tabBarLabel: 'Заказы',
};
