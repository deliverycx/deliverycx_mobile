import React, {FC, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';
import type {RouteProp} from '@react-navigation/native';
import {OrgMapLayout, Organisation} from '../../../../entities/organisations';
import {SelectOrganisationButton} from '../../../../features/organisations';
import {Button} from '../../../../shared/ui/Button';
import {Icon} from '../../../../shared/ui/Icon';

type Props = {
  route: RouteProp<StackParamList, Routes.Organisations>;
  navigation: NativeStackNavigationProp<StackParamList, Routes.Organisations>;
};

export const Organisations: FC<Props> = ({route}) => {
  const {cityId} = route.params;

  const handleRenderSelectButton = useCallback(
    (org: Organisation) => {
      return (
        <View style={styles.actions}>
          <Button
            leftAddons={<Icon name="electric-moped" size="sm" />}
            variant="tertiary"
            size="sm"
            text="Доставка"
          />
          <Button
            variant="tertiary"
            size="sm"
            text="Самовывоз"
            leftAddons={<Icon name="home" size="sm" />}
          />
          <SelectOrganisationButton cityId={cityId} orgId={org.guid} />
        </View>
      );
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
  actions: {
    rowGap: 8,
  },
});
