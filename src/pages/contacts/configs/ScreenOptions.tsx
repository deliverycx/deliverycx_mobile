import React from 'react';
import {useCurrentOrg} from '../../../entities/organisations';
import {COLORS} from '../../../shared/styles';
import {Icon} from '../../../shared/ui/Icon';

export const ScreenOptions = () => {
  const {data} = useCurrentOrg();

  const headerTitle = data?.city + ', ' + data?.address;

  return {
    tabBarIcon: ({color}: {color: string}) => (
      <Icon color={color} size="lg" name="room" />
    ),
    tabBarActiveTintColor: COLORS.main,
    headerTitle: headerTitle,
    headerTitleStyle: {
      fontSize: 16,
    },
    tabBarLabel: 'Контакты',
  };
};
