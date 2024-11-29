import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../../shared/styles.ts';

export const OrderStatusLoader = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={COLORS.main} />
      <View style={styles.texts}>
        <Text style={styles.title}>Пожалуйста подождите...</Text>
        <Text style={styles.desc}>
          Идет оформление заказа, обычно это занимает менее 1 минуты.
        </Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    gap: 20,
  },
  texts: {
    gap: 10,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  desc: {
    textAlign: 'center',
  },
});
