import React, {FC, useEffect, useState} from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {useGetOrderQuery} from '../../../../entities/order';
import {useOpenUrl} from '../../../../shared/hooks/useOpenUrl';
import {COLORS} from '../../../../shared/styles';
import {usePaymentLink} from '../../hooks/usePaymentLink';

type Props = {
  hash: string;
};

const PAYMENT_ORDER_REFETCH_MS = 1000;

export const OrderStatusOnlinePayment: FC<Props> = ({hash}) => {
  const [enabled, setEnabled] = useState(true);

  const openUrl = useOpenUrl();

  const {data} = useGetOrderQuery(
    {hash},
    {
      refetchInterval: PAYMENT_ORDER_REFETCH_MS,
      enabled,
    },
  );

  const paymentLink = usePaymentLink(data);

  const payment = data?.payment;

  useEffect(() => {
    if (!paymentLink) {
      return;
    }

    openUrl(paymentLink);
  }, [paymentLink, openUrl]);

  useEffect(() => {
    if (!payment) {
      return;
    }

    setEnabled(false);
  }, [payment]);

  if (!paymentLink) {
    return null;
  }

  return payment ? (
    <Text style={styles.paymentText}>Заказ оплачен</Text>
  ) : (
    <Button
      color={COLORS.main}
      title="Оплатить заказ"
      onPress={() => openUrl(paymentLink)}
    />
  );
};

const styles = StyleSheet.create({
  paymentText: {
    color: COLORS.success,
    fontSize: 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
