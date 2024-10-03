import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useExtendedOrgStatus} from '../hooks/useExtendedOrgStatus';
import {OrgAlerts} from '../ui/OrgAlerts';

type ContextProps = {
  startOrgRequests: (orgId: string) => void;
  stopOrgRequests: () => void;
};

type OrgStatusAlertsProps = PropsWithChildren<{
  orgId: string;
}>;

const OrgStatusContext = createContext<ContextProps | null>(null);

export const useOrgStatus = () => {
  return useContext<ContextProps | null>(OrgStatusContext)!;
};

export const useOrgAlertsSubscriber = (orgId: string) => {
  const {startOrgRequests, stopOrgRequests} = useOrgStatus();

  useEffect(() => {
    startOrgRequests(orgId);
    return () => stopOrgRequests();
  }, [startOrgRequests, stopOrgRequests, orgId]);
};

export const OrgAlertsSubscriber: FC<OrgStatusAlertsProps> = ({
  orgId,
  children,
}) => {
  const {startOrgRequests, stopOrgRequests} = useContext<ContextProps | null>(
    OrgStatusContext,
  )!;

  useEffect(() => {
    startOrgRequests(orgId);
    return () => stopOrgRequests();
  }, [startOrgRequests, stopOrgRequests, orgId]);

  return <>{children}</>;
};

export const OrgAlertsProvider: FC<PropsWithChildren> = ({children}) => {
  const [orgId, setOrgId] = useState<string | null>(null);

  const {
    isFetched,
    currentWorkTime,
    currentDeliveryWorkTime,
    delivery,
    organizationStatus,
  } = useExtendedOrgStatus(orgId!, {
    enabled: !!orgId,
    refetchIntervalInBackground: true,
    refetchInterval: 1000 * 60, // 1 min,
    notifyOnChangeProps: 'all',
  });

  const stopOrgRequests = useCallback(() => {
    setOrgId(null);
  }, []);

  return (
    <OrgStatusContext.Provider
      value={{
        startOrgRequests: setOrgId,
        stopOrgRequests,
      }}>
      {children}
      {isFetched && (
        <OrgAlerts
          organizationStatus={organizationStatus!}
          currentWorkTime={currentWorkTime!}
          deliveryWorkTime={currentDeliveryWorkTime!}
          delivery={delivery!}
          orgId={orgId!}
        />
      )}
    </OrgStatusContext.Provider>
  );
};
