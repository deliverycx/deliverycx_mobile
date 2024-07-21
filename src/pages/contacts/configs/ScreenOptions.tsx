import React from 'react';
import {Icon} from '../../../shared/ui/Icon';
import {COLORS} from '../../../shared/styles';
import {useCurrentOrg} from '../../../entities/organisations';

export const ScreenOptions = () => {
  const organisation = useCurrentOrg();

  const headerTitle = organisation?.city + ', ' + organisation?.address;

  return {
    tabBarIcon: ({color}: {color: string}) => (
      <Icon color={color} size="lg" name="room" />
    ),
    tabBarActiveTintColor: COLORS.main,
    headerTitle: headerTitle,
    tabBarLabel: 'Контакты',
  };
};
