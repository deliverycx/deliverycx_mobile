import React, {FC, PropsWithChildren, useContext} from 'react';
import {FieldValues, UseFormReturn, useForm} from 'react-hook-form';
import {OrderType, PaymentMethod} from '../../../../shared/types/order';

type Props = PropsWithChildren;

export type OrderForm = {
  orderType: OrderType;
  deliveryDate: Date;
  paymentMethod: PaymentMethod;
  phone: string;
  comment: string;
  classifierId: string | null;
  name: string;
  street: string;
  house: string;
  floor: string;
  entrance: string;
  flat: string;
  devices: number;
};

const OrderFormContext = React.createContext<UseFormReturn | null>(null);

export const useOrderFormContext = <
  TFieldValues extends FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
>(): UseFormReturn<TFieldValues, TContext, TransformedValues> => {
  return useContext(OrderFormContext) as UseFormReturn<
    TFieldValues,
    TContext,
    TransformedValues
  >;
};

export const OrderFormProvider: FC<Props> = ({children}) => {
  const methods = useForm<OrderForm>({
    defaultValues: {
      orderType: OrderType.Pickup,
      paymentMethod: PaymentMethod.Cash,
      devices: 1,
      comment: '',
    },
  });

  return (
    <OrderFormContext.Provider value={{...methods} as unknown as UseFormReturn}>
      {children}
    </OrderFormContext.Provider>
  );
};
