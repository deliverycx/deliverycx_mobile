import React from 'react';
import {Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const AppVersion = () => {
  return (
    <Text>
      Версия: {DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})
    </Text>
  );
};
