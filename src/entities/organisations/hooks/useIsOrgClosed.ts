import {useCurrentOrgStore} from '../stores/useCurrentOrgStore';
import {OrganisationStatus} from '../types/orgOrgStatusTypes';
import {isCurrentTimeInRange} from '../utils/isCurrentTimeInRange';
import {useExtendedOrgStatus} from './useExtendedOrgStatus';

export const useIsOrgClosed = () => {
  const currentOrgId = useCurrentOrgStore(state => state.orgId);

  const {currentWorkTime, isFetched, organizationStatus} = useExtendedOrgStatus(
    currentOrgId!,
    {
      enabled: !!currentOrgId,
      notifyOnChangeProps: 'all',
    },
  );

  const isWork = organizationStatus === OrganisationStatus.Work;

  if (!isFetched) {
    return null;
  }

  const isOrgWorking = isCurrentTimeInRange(currentWorkTime!);

  return (
    (!isOrgWorking && isWork) ||
    (!isWork && organizationStatus === OrganisationStatus.NoWork) ||
    (!isWork && organizationStatus === OrganisationStatus.NoDelivery) ||
    (!isWork && organizationStatus === OrganisationStatus.SezonNotWork)
  );
};
