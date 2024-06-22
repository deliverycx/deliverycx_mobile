import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';
import type {RouteProp} from '@react-navigation/native';
import {OrgMapLayout, Organisation} from '../../../../entities/organisations';
import {useCurrentOrg} from '../../../../features/organisations';

type Props = {
  route: RouteProp<StackParamList, Routes.Organisations>;
  navigation: NativeStackNavigationProp<StackParamList, Routes.Organisations>;
};

export const Organisations: FC<Props> = ({route}) => {
  const setOrgId = useCurrentOrg(state => state.setOrgId);

  const {cityId} = route.params;

  const handleOrgChange = (org: Organisation) => {
    setOrgId(org.guid);
  };

  return (
    <OrgMapLayout
      style={styles.map}
      onChange={handleOrgChange}
      cityId={cityId}
    />
  );
};

export const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
