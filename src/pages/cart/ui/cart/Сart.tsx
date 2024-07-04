import React from 'react';
import {CartList} from '../../../../widgets/cart';
import {useListInsets} from '../../../../shared/hooks/useListInsets';

export const Cart = () => {
  const {scrollIndicatorInsets, contentInset} = useListInsets();

  return (
    <CartList
      scrollIndicatorInsets={scrollIndicatorInsets}
      contentInset={contentInset}
    />
  );
};
