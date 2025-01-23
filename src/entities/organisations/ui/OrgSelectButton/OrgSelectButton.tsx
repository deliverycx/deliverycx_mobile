import {useQueryClient} from '@tanstack/react-query';
import React, {FC, useState} from 'react';
import {useMetrics} from '../../../../shared/hooks/useMetrics';
import {Button} from '../../../../shared/ui/Button';
import {fetchProducts} from '../../../products';
import {getOrgFullAddress} from '../../../products/utils/getOrgFullAddress';
import {useCurrentOrgStore} from '../../stores/useCurrentOrgStore';
import {Organisation} from '../../types/organisationsTypes';

type Props = {
  data: Organisation;
  disabled?: boolean;
};

export const OrgSelectButton: FC<Props> = ({data, disabled = false}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const metrics = useMetrics();

  const setOrgInfo = useCurrentOrgStore(state => state.setOrgInfo);

  const handleOrgChange = async () => {
    setLoading(true);

    try {
      await fetchProducts(queryClient, {organization: data.guid});
      setOrgInfo(data.guid);
    } catch (err) {
    } finally {
      metrics.chooseOrg({address: getOrgFullAddress(data)});

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
