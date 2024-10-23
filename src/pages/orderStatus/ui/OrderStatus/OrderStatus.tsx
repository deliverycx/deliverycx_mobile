import type {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useGetOrderQuery} from '../../../../entities/order';
import {Routes, StackParamList} from '../../../../shared/routes';
import {Container} from '../../../../shared/ui/Container';
import {OrderStatusInfo} from '../OrderStatusInfo';
import {OrderStatusLoader} from '../OrderStatusLoader';

type Props = {
  route: RouteProp<StackParamList, Routes.OrderStatus>;
};

const IIKO_ORDER_RETRY_MS = 1000 * 60;
const IIKO_ORDER_REFETCH_MS = 2000;

export const OrderStatus = ({route}: Props) => {
  const {hash} = route.params;

  const [enabledGetOrder, setEnabledGetOrder] = useState(true);
  const [timeoutError, setTimeoutError] = useState<boolean>(false);

  const {data, error} = useGetOrderQuery(
    {hash},
    {
      refetchInterval: IIKO_ORDER_REFETCH_MS,
      enabled: enabledGetOrder,
    },
  );

  const orderNumber = data?.orderNumber ?? null;
  const hasError = error || data?.orderError || timeoutError;

  useEffect(() => {
    let timerId: NodeJS.Timer;

    if (!orderNumber) {
      timerId = setTimeout(() => {
        setEnabledGetOrder(false);
        setTimeoutError(true);
      }, IIKO_ORDER_RETRY_MS);

      return () => {
        clearTimeout(timerId as unknown as number);
      };
    }

    setEnabledGetOrder(false);
  }, [orderNumber]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Container style={styles.container}>
        {enabledGetOrder ? (
          <OrderStatusLoader />
        ) : (
          <OrderStatusInfo
            orderData={data}
            variant={hasError ? 'error' : 'success'}
          />
        )}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
