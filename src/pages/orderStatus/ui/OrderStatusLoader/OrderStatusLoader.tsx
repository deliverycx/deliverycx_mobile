import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';

export const OrderStatusLoader = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
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
