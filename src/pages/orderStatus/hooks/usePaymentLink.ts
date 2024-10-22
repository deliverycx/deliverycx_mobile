import {useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {
  GetOrderResponse,
  OrderStatus,
  useCreatePaymentLinkQuery,
} from '../../../entities/order';
import {OrderType, PaymentMethod} from '../../../shared/types/order';

export const usePaymentLink = (
  order: GetOrderResponse | undefined,
): null | string => {
  const [paymentLink, setPaymentLink] = useState<null | string>(null);
  const {mutateAsync: createPaymentLink} = useCreatePaymentLinkQuery();

  const requestFlag = useRef(true);

  useEffect(() => {
    const orderStatus = order?.orderStatus;
    const paymentMethod = order?.orderParams?.paymentMethod;
    const orderType = order?.orderParams?.orderType;

    const hasPayment =
      paymentMethod === PaymentMethod.Card &&
      orderType === OrderType.Courier &&
      orderStatus === OrderStatus.Success;

    if (!hasPayment || !requestFlag.current) {
      return;
    }

    requestFlag.current = false;

    (async function () {
      try {
        const {data} = await createPaymentLink(order!);

        if (!data?.redirectUrl) {
          throw new Error('Не удалось получить ссылку на оплату');
        }

        setPaymentLink(data.redirectUrl);
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось получить ссылку на оплату');
      }
    })();
  }, [order, createPaymentLink]);

  return paymentLink;
};
