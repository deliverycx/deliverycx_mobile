import React from 'react';
import {StyleSheet, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {COLORS} from '../../../../shared/styles.ts';

export const AppVersion = () => {
  return (
    <Text style={styles.text}>
      Версия: {DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.textPrimary,
  },
});
