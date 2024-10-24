import {useQueryClient} from '@tanstack/react-query';
import React, {FC, useState} from 'react';
import {Button} from '../../../../shared/ui/Button';
import {fetchProducts} from '../../../products';
import {useCurrentOrgStore} from '../../stores/useCurrentOrgStore';

type Props = {
  orgId: string;
  disabled?: boolean;
};

export const OrgSelectButton: FC<Props> = ({orgId, disabled = false}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const setOrgInfo = useCurrentOrgStore(state => state.setOrgInfo);

  const handleOrgChange = async () => {
    setLoading(true);

    try {
      await fetchProducts(queryClient, {organization: orgId});
      setOrgInfo(orgId);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      loading={loading}
      disabled={disabled}
      onPress={handleOrgChange}
      text="Перейти в меню"
    />
  );
};
