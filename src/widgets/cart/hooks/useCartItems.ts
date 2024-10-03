import {useCartItemsQuery} from '../../../entities/cart';
import {useCurrentOrgStore} from '../../../entities/organisations';
import {useUserStore} from '../../../entities/user';

export const useCartItems = () => {
  const orgId = useCurrentOrgStore(state => state.orgId);
  const user = useUserStore(state => state.user);

  return useCartItemsQuery({organization: orgId!, userid: user?.id!});
};
