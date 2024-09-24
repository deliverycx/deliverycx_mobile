import {useState} from 'react';
import {
  OrderForm,
  OrderCreateModel,
  useCreateOrderQuery,
  useOrderCheckQuery,
} from '../../../entities/order';
import {useStreets} from '../../../widgets/order';
import {useCurrentOrg} from '../../../entities/organisations';
import {useUserStore} from '../../../entities/user';
import {useCartItems} from '../../../widgets/cart';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../shared/routes';
import {formatDateForOrder} from '../utils/formatDateForOrder';
import {formatTimeForOrder} from '../utils/formatTimeForOrder';
import {OrderType} from '../../../shared/types/order';
import {AxiosError} from 'axios';
import {Alert} from 'react-native';
import {showOrderAlertFail} from '../utils/showOrderAlertFail.ts';

export const useOrderSubmit = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [isFetching, setIsFetching] = useState(false);

  const streets = useStreets();
  const org = useCurrentOrg()!;
  const {data: cartData} = useCartItems();

  const userId = useUserStore(state => state.user?.id);

  const {mutateAsync: checkOrder} = useOrderCheckQuery();
  const {mutateAsync: createOrder} = useCreateOrderQuery();

  const onSubmit = async (values: OrderForm) => {
    setIsFetching(true);

    navigation.replace(Routes.OrderStatus, {
      hash: '123',
    });

    return;

    const payload: OrderCreateModel = {
      comment: values.comment,
      date: formatDateForOrder(new Date()),
      devises: values.devices + '',
      hash: '',
      localhost: 'https://xn--80apgfh0ct5a.xn--p1ai',
      money: 0,
      organizationid: org.guid,
      organization: org.guid,
      paymentMethod: values.paymentMethod,
      name: values.name,
      phone: values.phone,
      timedelivery: values.deliveryDate
        ? formatTimeForOrder(values.deliveryDate)
        : '',
      terminal: org.terminal,
      userid: userId!,
      orderType: values.orderType,
      orderAmount: cartData?.totalPrice!,
      orderTotalAmount: cartData?.totalPrice!,
    };

    if (values.orderType === OrderType.Courier) {
      payload.address = {
        city: org.city,
        street: values.street,
        home: values.house,
        flat: values.flat,
        intercom: '',
        entrance: values.entrance,
        floor: values.floor,
        kladrid: streets.find(street => street.name === values.street)!,
      };
    }

    try {
      const {data: hash} = await checkOrder(payload);

      const {data} = await createOrder({
        ...payload,
        hash,
      });

      if (!data) {
        showOrderAlertFail();
        return;
      }

      navigation.replace(Routes.OrderStatus, {
        hash,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data.errors;

        if (errors) {
          Alert.alert('Ошибка оформления заказа', errors);
        }

        return;
      }

      showOrderAlertFail();
    } finally {
      setIsFetching(false);
    }
  };

  return {
    onSubmit,
    isFetching,
  };
};
