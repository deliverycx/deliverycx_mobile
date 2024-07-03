import React from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MenuList} from '../../../widgets/menuList';
import {useCurrentOrgStore} from '../../../entities/organisations';

export const Menu = () => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const orgId = useCurrentOrgStore(state => state.orgId);

  return (
    <MenuList
      orgId={orgId!}
      scrollIndicatorInsets={{bottom: bottomTabBarHeight - insets.bottom}}
      contentInset={{bottom: bottomTabBarHeight}}
    />
  );
};
