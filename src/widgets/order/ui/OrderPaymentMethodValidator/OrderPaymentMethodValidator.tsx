import {FC, useEffect} from 'react';
import {OrderForm, useOrderFormContext} from '../../../../entities/order';
import {
  useCurrentOrgStore,
  useExtendedOrgStatus,
} from '../../../../entities/organisations';

export const OrderPaymentMethodValidator: FC = () => {
  const currentOrgId = useCurrentOrgStore(state => state.orgId);

  const {setValue} = useOrderFormContext<OrderForm>();

  const {paymentMetod} = useExtendedOrgStatus(currentOrgId!);
  const firstPaymentMethod = paymentMetod?.at(0);

  useEffect(() => {
    if (!firstPaymentMethod) {
      return;
    }

    setValue('paymentMethod', firstPaymentMethod);
  }, [setValue, firstPaymentMethod]);

  return null;
};
