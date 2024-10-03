import React from 'react';
import {useCurrentOrgStore} from '../../../entities/organisations';
import {useListInsets} from '../../../shared/hooks/useListInsets';
import {ProductMenuList} from '../../../widgets/products';

export const Menu = () => {
  const {scrollIndicatorInsets, contentInset} = useListInsets();

  const orgId = useCurrentOrgStore(state => state.orgId);

  return (
    <ProductMenuList
      orgId={orgId!}
      scrollIndicatorInsets={scrollIndicatorInsets}
      contentInset={contentInset}
    />
  );
};
