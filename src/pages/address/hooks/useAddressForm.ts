import {useForm} from 'react-hook-form';

export type FormValues = {
  street: string;
  house: string;
  floor: string;
  entrance: string;
  flat: string;
};

export const useAddressForm = () => {
  return useForm<FormValues>({
    defaultValues: {
      street: '',
      house: '',
      floor: '',
      entrance: '',
      flat: '',
    },
  });
};
