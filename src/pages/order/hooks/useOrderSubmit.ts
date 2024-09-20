import {useState} from 'react';
import {
  fetchGetOrder,
  OrderForm,
  useCreateOrderQuery,
  useOrderCheckQuery,
} from '../../../entities/order';
import {useStreets} from '../../../widgets/order';
import {useCurrentOrg} from '../../../entities/organisations';
import {useUserStore} from '../../../entities/user';
import {useCartItems} from '../../../widgets/cart';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../shared/routes';

export const useOrderSubmit = () => {
  const queryClient = useQueryClient();

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

    try {
      const payload = {
        comment: values.comment,
        date: new Date().toString(),
        devises: values.devices + '',
        hash: '',
        localhost: 'https://xn--80apgfh0ct5a.xn--p1ai',
        money: 0,
        organizationid: org.guid,
        organization: org.guid,
        paymentMethod: values.paymentMethod,
        name: values.name,
        phone: values.phone,
        timedelivery: values.deliveryDate.toString(),
        terminal: org.terminal,
        userid: userId!,
        orderType: values.orderType,
        orderAmount: cartData?.totalPrice!,
        orderTotalAmount: cartData?.totalPrice!,
        address: {
          city: org.city,
          street: values.street,
          home: values.house,
          flat: values.flat,
          intercom: '',
          entrance: values.entrance,
          floor: values.floor,
          kladrid: streets.find(street => street.name === values.street)!,
        },
      };

      const {data: hash} = await checkOrder(payload);
      const {data: order} = await fetchGetOrder(queryClient, {hash});

      console.log(555, hash, order);

      if (order) {
        await createOrder(payload);
      }

      console.log(777, hash, order);

      navigation.replace(Routes.OrderStatus, {
        hash,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    onSubmit,
    isFetching,
  };
};
