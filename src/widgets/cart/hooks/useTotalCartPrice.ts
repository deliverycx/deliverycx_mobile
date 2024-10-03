import {useMemo} from 'react';
import {useCartItemsQuery} from '../../../entities/cart';
import {useCurrentOrgStore} from '../../../entities/organisations';
import {useUserStore} from '../../../entities/user/stores/useUserStore';
import {getFormatPrice} from '../../../shared/utils/getFormatPrice';

export const useTotalCartPrice = () => {
  const orgId = useCurrentOrgStore(state => state.orgId);
  const user = useUserStore(state => state.user);

  const {data} = useCartItemsQuery({organization: orgId!, userid: user?.id!});

  const totalPrice = useMemo(() => {
    if (!data) {
      return 0;
    }

    return data.fullPrice;
  }, [data]);

  const formattedTotalPrice = useMemo(() => {
    return getFormatPrice(totalPrice);
  }, [totalPrice]);

  return {
    totalPrice,
    formattedTotalPrice,
  };
};
