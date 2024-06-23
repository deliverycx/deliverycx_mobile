import React from 'react';
import {StyleSheet} from 'react-native';
import {KhinIcon} from '../../../shared/ui/CustomIcons/KhinIcon';
import {COLORS, INDENTS} from '../../../shared/styles';
import {
  CallOrganisationButton,
  ChangeOrganisationButton,
} from '../../../features/organisations';

export const screenOptions = {
  tabBarIcon: ({color}: {color: string}) => <KhinIcon color={color} />,
  tabBarActiveTintColor: COLORS.main,
  title: '',
  tabBarLabel: 'Меню',
  headerLeft: () => <ChangeOrganisationButton style={styles.leftIndent} />,
  headerRight: () => <CallOrganisationButton style={styles.rightIndent} />,
};

export const styles = StyleSheet.create({
  leftIndent: {
    marginLeft: INDENTS.main,
  },
  rightIndent: {
    marginRight: INDENTS.main,
  },
});
