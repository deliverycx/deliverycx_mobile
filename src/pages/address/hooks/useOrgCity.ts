import {
  useCurrentOrgStore,
  useOrganisationData,
} from '../../../entities/organisations';
import {useMemo} from 'react';

export const useOrgCity = () => {
  const currentOrgId = useCurrentOrgStore(state => state.orgId);
  const currentCityId = useCurrentOrgStore(state => state.cityId);
  const {data} = useOrganisationData(currentCityId!, currentOrgId!);

  return useMemo(() => {
    if (!data) {
      return null;
    }

    return data.city;
  }, [data]);
};
