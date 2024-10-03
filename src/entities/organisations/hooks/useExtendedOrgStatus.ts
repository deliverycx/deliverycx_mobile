import {UseQueryOptions} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useOrgStatusQuery} from '../queries/orgStatusQueries';
import {useOrganisationQuery} from '../queries/organisationQueries';
import {OrgStatusResponseModel} from '../types/orgOrgStatusTypes';
import {getCurrentTimeRange} from '../utils/getCurrentTimeRange';
import {getDeliveryTime} from '../utils/getDeliveryTime';
import {hasDelivery} from '../utils/hasDelivery';

export const useExtendedOrgStatus = (
  orgId: string,
  config?: Partial<UseQueryOptions<OrgStatusResponseModel>>,
) => {
  const {data: orgStatusData, isFetched: isOrgStatusFetched} =
    useOrgStatusQuery(
      {
        organization: orgId!,
      },
      config,
    );

  const {data: orgData, isFetched: isOrgFetched} = useOrganisationQuery(
    {
      organizationId: orgId!,
    },
    {
      enabled: !!orgId,
    },
  );

  const isOrgDataFetched = isOrgFetched && isOrgStatusFetched;

  const workTime = orgData?.workTime;
  const deliveryMethod = orgStatusData?.deliveryMetod;

  const currentWorkTime = useMemo(() => {
    return Array.isArray(workTime) ? getCurrentTimeRange(workTime) : undefined;
  }, [workTime]);

  const currentDeliveryWorkTime = useMemo(() => {
    return currentWorkTime ? getDeliveryTime(currentWorkTime) : undefined;
  }, [currentWorkTime]);

  const delivery = useMemo(() => {
    return Array.isArray(deliveryMethod)
      ? hasDelivery(deliveryMethod)
      : undefined;
  }, [deliveryMethod]);

  return {
    ...orgStatusData,
    isFetched: isOrgDataFetched,
    delivery,
    currentWorkTime,
    currentDeliveryWorkTime,
  };
};
