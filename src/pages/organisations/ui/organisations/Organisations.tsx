import React, {FC} from 'react';
import {Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';

type Props = NativeStackScreenProps<StackParamList, Routes.Organisations>;

export const Organisations: FC<Props> = ({route}) => {
  const {cityId} = route.params;

  return <Text>organisations id {cityId}</Text>;
};
