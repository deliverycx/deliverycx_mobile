import {useCurrentOrgIds} from '../stores/useCurrentOrgIds.ts';
import {useOrganisationsQuery} from '../../../entities/organisations';
import {useEffect, useMemo} from 'react';

export const useCurrentOrg = () => {
  const cityId = useCurrentOrgIds(state => state.cityId)!;
  const orgId = useCurrentOrgIds(state => state.orgId)!;
  const deleteOrgInfo = useCurrentOrgIds(state => state.deleteOrgInfo);

  const {data, isFetched} = useOrganisationsQuery({cityId});

  const organisation = useMemo(() => {
    if (!data) {
      return;
    }

    return data.find(org => org.guid === orgId);
  }, [data, orgId]);

  useEffect(() => {
    if (!organisation && isFetched) {
      // The organisation was closed or removed
      // We have to send a user to select a new organisation
      deleteOrgInfo();
    }
  }, [deleteOrgInfo, organisation, isFetched]);

  return organisation;
};
