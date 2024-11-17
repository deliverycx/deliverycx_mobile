import React from 'react';
import {Text} from 'react-native';
import {useGetOrdersQuery} from '../../../../entities/order';
import {useUserStore} from '../../../../entities/user';

export const OrderHistory = () => {
  const userId = useUserStore(state => state.user?.id);

  // You can use userId (673a1710de172d6708837e0e) to get real orders
  const {data, isFetching} = useGetOrdersQuery(
    {userId: userId!},
    {enabled: !!userId},
  );

  console.log('use this data to render order history: ', data);

  return <Text>order history will be here</Text>;
};
