import React, {FC} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';
import {CitiesList, City} from '../../../../entities/cities';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Cities>;
};

export const Cities: FC<Props> = ({navigation}) => {
  const handleChange = (city: City) => {
    navigation.push(Routes.Organisations, {cityId: city.id});
  };

  return <CitiesList onChange={handleChange} />;
};
