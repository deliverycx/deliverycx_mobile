import React from 'react';
import {ProductMenuList} from '../../../widgets/products';
import {useCurrentOrgStore} from '../../../entities/organisations';
import {useListInsets} from '../../../shared/hooks/useListInsets.ts';

export const Menu = () => {
  const {scrollIndicatorInsets, contentInset} = useListInsets();

  const orgId = useCurrentOrgStore(state => state.orgId);

  console.log(10);

  return (
    <ProductMenuList
      orgId={orgId!}
      scrollIndicatorInsets={scrollIndicatorInsets}
      contentInset={contentInset}
    />
  );
};
