import React, {FC, useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {Button} from '../../../../shared/ui/Button';
import {useCurrentOrgStore} from '../../stores/useCurrentOrgStore';
import {fetchProducts} from '../../../products';

type Props = {
  orgId: string;
  cityId: string;
};

export const OrgSelectButton: FC<Props> = ({orgId, cityId}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const setOrgInfo = useCurrentOrgStore(state => state.setOrgInfo);

  const handleOrgChange = async () => {
    setLoading(true);

    try {
      await fetchProducts(queryClient, {organization: orgId});
      setOrgInfo(cityId, orgId);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button loading={loading} onPress={handleOrgChange} text="Перейти в меню" />
  );
};
