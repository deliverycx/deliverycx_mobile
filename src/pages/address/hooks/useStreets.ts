import {useMemo} from 'react';
import {useCurrentOrgStore} from '../../../entities/organisations';
import {useStreetDataQuery} from '../../../entities/geo';

export const useStreets = () => {
  const orgId = useCurrentOrgStore(state => state.orgId);

  const {data} = useStreetDataQuery({organizationId: orgId!});

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data;
  }, [data]);
};
