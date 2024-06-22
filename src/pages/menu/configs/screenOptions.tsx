import React from 'react';
import {KhinIcon} from '../../../shared/ui/CustomIcons/KhinIcon';
import {COLORS} from '../../../shared/styles';

export const screenOptions = {
  tabBarIcon: ({color}: {color: string}) => <KhinIcon color={color} />,
  tabBarActiveTintColor: COLORS.main,
  title: '',
  tabBarLabel: 'Меню',
};
