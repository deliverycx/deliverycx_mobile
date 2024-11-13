import React from 'react';
import {Text} from 'react-native';
import {useGetOrdersQuery} from '../../../../entities/order';
import {useUserStore} from '../../../../entities/user';

export const OrderHistory = () => {
  const userId = useUserStore(state => state.user?.id);

  const history = useGetOrdersQuery({userId: userId!}, {enabled: !!userId});

  console.log(5555, history);

  return <Text>1231232</Text>;
};
