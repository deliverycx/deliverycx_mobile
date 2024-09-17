import React, {FC, PropsWithChildren, useContext} from 'react';
import {useForm, UseFormReturn, FieldValues} from 'react-hook-form';

type Props = PropsWithChildren;

export type AddressForm = {
  classifierId: null | string;
  street: string;
  house: string;
  floor: string;
  entrance: string;
  flat: string;
};

const AddressFormContext = React.createContext<UseFormReturn | null>(null);

export const useAddressFormContext = <
  TFieldValues extends FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
>(): UseFormReturn<TFieldValues, TContext, TransformedValues> => {
  return useContext(AddressFormContext) as UseFormReturn<
    TFieldValues,
    TContext,
    TransformedValues
  >;
};

export const AddressFormProvider: FC<Props> = ({children}) => {
  const methods = useForm<AddressForm>({
    defaultValues: {
      classifierId: null,
      street: '',
      house: '',
      floor: '',
      entrance: '',
      flat: '',
    },
  });

  return (
    <AddressFormContext.Provider
      value={{...methods} as unknown as UseFormReturn}>
      {children}
    </AddressFormContext.Provider>
  );
};
