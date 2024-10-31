import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import {useState} from 'react';
import {Alert} from 'react-native';
import {
  OrderCreateModel,
  OrderForm,
  showOrderAlertFail,
  useCreateOrderQuery,
  useOrderCheckQuery,
} from '../../../entities/order';
import {useCurrentOrg} from '../../../entities/organisations';
import {useUserStore} from '../../../entities/user';
import {URL_ID} from '../../../shared/consts';
import {Routes, StackParamList} from '../../../shared/routes';
import {OrderType} from '../../../shared/types/order';
import {useCartItems} from '../../../widgets/cart';
import {useStreets} from '../../../widgets/order';
import {formatDateForOrder} from '../utils/formatDateForOrder';
import {formatTimeForOrder} from '../utils/formatTimeForOrder';

export const useOrderSubmit = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [isFetching, setIsFetching] = useState(false);

  const streets = useStreets();
  const {data} = useCurrentOrg()!;
  const {data: cartData} = useCartItems();

  const userId = useUserStore(state => state.user?.id);

  const {mutateAsync: checkOrder} = useOrderCheckQuery();
  const {mutateAsync: createOrder} = useCreateOrderQuery();

  const onSubmit = async (values: OrderForm) => {
    setIsFetching(true);

    if (!data) {
      return;
    }

    const payload: OrderCreateModel = {
      comment: values.comment,
      date: formatDateForOrder(new Date()),
      devises: values.devices + '',
      hash: '',
      localhost: `${URL_ID}://`,
      money: 0,
      organizationid: data.guid,
      organization: data.guid,
      paymentMethod: values.paymentMethod,
      name: values.name,
      phone: values.phone,
      timedelivery: values.deliveryDate
        ? formatTimeForOrder(values.deliveryDate)
        : '',
      terminal: data.terminal,
      userid: userId!,
      orderType: values.orderType,
      orderAmount: cartData?.totalPrice!,
      orderTotalAmount: cartData?.totalPrice!,
    };

    if (values.orderType === OrderType.Courier) {
      payload.address = {
        city: data.city,
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

      const {data: orderData} = await createOrder({
        ...payload,
        hash,
      });

      if (!orderData) {
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
