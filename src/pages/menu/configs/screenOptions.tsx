import React from 'react';
import {StyleSheet} from 'react-native';
import {OrgCallButton, OrgChangeButton} from '../../../entities/organisations';
import {useUserStore} from '../../../entities/user';
import {COLORS, INDENTS} from '../../../shared/styles';
import {KhinIcon} from '../../../shared/ui/CustomIcons/KhinIcon';

export const ScreenOptions = () => {
  const userId = useUserStore(state => state.user?.id);

  return {
    tabBarIcon: ({color}: {color: string}) => <KhinIcon color={color} />,
    tabBarActiveTintColor: COLORS.main,
    title: '',
    tabBarLabel: 'Меню',
    headerLeft: () => (
      <OrgChangeButton userId={userId} style={styles.leftIndent} />
    ),
    headerRight: () => <OrgCallButton style={styles.rightIndent} />,
  };
};

export const styles = StyleSheet.create({
  leftIndent: {
    marginLeft: INDENTS.main,
  },
  rightIndent: {
    marginRight: INDENTS.main,
  },
});
