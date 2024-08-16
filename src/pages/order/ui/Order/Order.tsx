import React, {FC} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {OrderDeliveryType} from '../OrderDeliveryType';
import {Container} from '../../../../shared/ui/Container';
import {Button} from '../../../../shared/ui/Button';
import {hexToRgba} from '../../../../shared/utils/hexToRgba';
import {COLORS} from '../../../../shared/styles';
import {OrderDelivery} from '../OrderDelivery';

export const Order: FC = () => {
  return (
    <>
      <View style={styles.wrapper}>
        <Container style={styles.container}>
          <OrderDeliveryType />
          <OrderDelivery />
        </Container>
        <SafeAreaView style={styles.footer}>
          <Container>
            <View style={styles.footerInfo}>
              <Text style={styles.footerText}>Стоимость заказа</Text>
              <Text style={styles.footerText}>15 582 Р</Text>
            </View>
            <Button text="Оформить заказ" />
          </Container>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  container: {
    gap: 16,
    marginVertical: 16,
  },
  input: {
    height: 140,
    borderWidth: 1,
    padding: 10,
    backgroundColor: COLORS.backgroundPrimary,
    borderRadius: 16,
  },
  footerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: hexToRgba(COLORS.backgroundTertiary, 0.6),
  },
});
