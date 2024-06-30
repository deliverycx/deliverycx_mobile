import {useEffect} from 'react';
import {useCurrentOrgIds} from '../stores/useCurrentOrgIds';
import {useOrganisationData} from './useOrganisationData';

export const useCurrentOrg = () => {
  const cityId = useCurrentOrgIds(state => state.cityId)!;
  const orgId = useCurrentOrgIds(state => state.orgId)!;
  const deleteOrgInfo = useCurrentOrgIds(state => state.deleteOrgInfo);

  const {data, isFetched} = useOrganisationData(cityId, orgId);

  useEffect(() => {
    if (!data && isFetched) {
      // The organisation was closed or removed
      // We have to send a user to select a new organisation
      deleteOrgInfo();
    }
  }, [deleteOrgInfo, data, isFetched]);

  return data;
};
