import {useEffect} from 'react';
import {useCurrentOrgStore} from '../stores/useCurrentOrgStore';
import {useOrganisationData} from './useOrganisationData';

export const useCurrentOrg = () => {
  const cityId = useCurrentOrgStore(state => state.cityId)!;
  const orgId = useCurrentOrgStore(state => state.orgId)!;
  const deleteOrgInfo = useCurrentOrgStore(state => state.deleteOrgInfo);

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
