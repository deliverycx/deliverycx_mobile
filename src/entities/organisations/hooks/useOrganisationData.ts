import {useOrganisationsQuery} from '../../../entities/organisations';
import {useMemo} from 'react';

export const useOrganisationData = (cityId: string, orgId: string) => {
  const {data, isFetched} = useOrganisationsQuery({cityId});

  const organisation = useMemo(() => {
    if (!data) {
      return;
    }

    return data.find(org => org.guid === orgId);
  }, [data, orgId]);

  return {
    data: organisation,
    isFetched,
  };
};
