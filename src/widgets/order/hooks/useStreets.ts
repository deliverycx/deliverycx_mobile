import {useMemo} from 'react';
import {useStreetDataQuery} from '../../../entities/geo';
import {useCurrentOrgStore} from '../../../entities/organisations';

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
