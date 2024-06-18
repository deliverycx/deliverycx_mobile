import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';
import type {RouteProp} from '@react-navigation/native';
import {OrgMapLayout} from '../../../../entities/organisations';

type Props = {
  route: RouteProp<StackParamList, Routes.Organisations>;
  navigation: NativeStackNavigationProp<StackParamList, Routes.Organisations>;
};

export const Organisations: FC<Props> = ({route}) => {
  const {cityId} = route.params;

  return (
    <OrgMapLayout style={styles.map} onChange={() => {}} cityId={cityId} />
  );
};

export const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
