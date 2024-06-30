import React, {FC, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';
import type {RouteProp} from '@react-navigation/native';
import {OrgMapLayout, Organisation} from '../../../../entities/organisations';
import {SelectOrganisationButton} from '../../../../features/organisations';

type Props = {
  route: RouteProp<StackParamList, Routes.Organisations>;
  navigation: NativeStackNavigationProp<StackParamList, Routes.Organisations>;
};

export const Organisations: FC<Props> = ({route}) => {
  const {cityId} = route.params;

  const handleRenderSelectButton = useCallback(
    (org: Organisation) => {
      return <SelectOrganisationButton cityId={cityId} orgId={org.guid} />;
    },
    [cityId],
  );

  return (
    <OrgMapLayout
      style={styles.map}
      onRenderSelectButton={handleRenderSelectButton}
      cityId={cityId}
    />
  );
};

export const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
