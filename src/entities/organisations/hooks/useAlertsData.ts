import {useMemo} from 'react';
import {getCurrentTimeRange} from '../utils/getCurrentTimeRange';
import {getNextTimeRange} from '../utils/getNextTimeRange';
import {getDeliveryTime} from '../utils/getDeliveryTime';
import {hasDelivery} from '../utils/hasDelivery';
import {useOrgStatusQuery} from '../queries/orgStatusQueries';
import {useOrganisationData} from './useOrganisationData';

const ORG_STATUS_REFETCH_INTERVAL = 1000 * 60; // 1min

export const useAlertsData = (cityId: string, orgId: string) => {
  const {data: orgStatusData} = useOrgStatusQuery(
    {
      organization: orgId,
    },
    {
      refetchIntervalInBackground: true,
      refetchInterval: ORG_STATUS_REFETCH_INTERVAL,
      notifyOnChangeProps: 'all',
    },
  );
  const {data: orgData} = useOrganisationData(cityId, orgId);

  const workTime = orgData?.workTime;
  const organizationStatus = orgStatusData?.organizationStatus;
  const deliveryMethod = orgStatusData?.deliveryMetod;
  const phone = orgData?.phone;

  const currentWorkTime = useMemo(() => {
    return Array.isArray(workTime) ? getCurrentTimeRange(workTime) : undefined;
  }, [workTime]);

  const nextWorkTime = useMemo(() => {
    return Array.isArray(workTime) ? getNextTimeRange(workTime) : undefined;
  }, [workTime]);

  const deliveryWorkTime = useMemo(() => {
    return currentWorkTime ? getDeliveryTime(currentWorkTime) : undefined;
  }, [currentWorkTime]);

  const nextDeliveryWorkTime = useMemo(() => {
    return nextWorkTime ? getDeliveryTime(nextWorkTime) : undefined;
  }, [nextWorkTime]);

  const delivery = useMemo(() => {
    return Array.isArray(deliveryMethod)
      ? hasDelivery(deliveryMethod)
      : undefined;
  }, [deliveryMethod]);

  return {
    currentWorkTime,
    nextWorkTime,
    deliveryWorkTime,
    nextDeliveryWorkTime,
    delivery,
    phone,
    organizationStatus,
  };
};
