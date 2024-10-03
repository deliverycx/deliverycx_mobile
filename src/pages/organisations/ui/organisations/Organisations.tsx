import type {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {OrgMapLayout} from '../../../../entities/organisations';
import {Routes, StackParamList} from '../../../../shared/routes';

type Props = {
  route: RouteProp<StackParamList, Routes.Organisations>;
  navigation: NativeStackNavigationProp<StackParamList, Routes.Organisations>;
};

export const Organisations: FC<Props> = ({route}) => {
  const {cityId} = route.params;

  return <OrgMapLayout style={styles.map} cityId={cityId} />;
};

export const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
