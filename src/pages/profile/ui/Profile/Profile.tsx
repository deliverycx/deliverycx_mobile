import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {Routes, StackParamList} from '../../../../shared/routes';
import {OrderHistoryButton} from '../OrderHistoryButton';

export const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const handleHistoryClick = () => {
    navigation.push(Routes.OrderHistory);
  };

  return (
    <View>
      <Text>Profile page</Text>
      <OrderHistoryButton onPress={handleHistoryClick} />
    </View>
  );
};
