import React, {useContext, useEffect, useMemo} from 'react';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';
import {OrgAlerts} from '../ui/OrgAlerts';

type ContextProps = {
  startOrgStatusCheck: (cityId: string, orgId: string) => void;
  stopOrgStatusCheck: () => void;
};

type Ids = {
  orgId: string;
  cityId: string;
};

type OrgStatusAlertsProps = PropsWithChildren<{
  cityId: string;
  orgId: string;
}>;

export const OrgStatusContext = createContext<ContextProps | null>(null);

export const useOrgStatusAlerts = (cityId: string, orgId: string) => {
  const {startOrgStatusCheck, stopOrgStatusCheck} =
    useContext<ContextProps | null>(OrgStatusContext)!;

  useEffect(() => {
    startOrgStatusCheck(cityId, orgId);
    return () => stopOrgStatusCheck();
  }, [startOrgStatusCheck, stopOrgStatusCheck, cityId, orgId]);
};

export const OrgStatusAlerts: FC<OrgStatusAlertsProps> = ({
  cityId,
  orgId,
  children,
}) => {
  const {startOrgStatusCheck, stopOrgStatusCheck} =
    useContext<ContextProps | null>(OrgStatusContext)!;

  useEffect(() => {
    startOrgStatusCheck(cityId, orgId);
    return () => stopOrgStatusCheck();
  }, [startOrgStatusCheck, stopOrgStatusCheck, cityId, orgId]);

  return <>{children}</>;
};

export const OrgStatusAlertsProvider: FC<PropsWithChildren> = ({children}) => {
  const [ids, setIds] = useState<Ids | null>(null);

  const startOrgStatusCheck = useCallback((cityId: string, orgId: string) => {
    setIds({cityId, orgId});
  }, []);

  const stopOrgStatusCheck = useCallback(() => {
    setIds(null);
  }, []);

  const value = useMemo(() => {
    return {
      startOrgStatusCheck,
      stopOrgStatusCheck,
    };
  }, [startOrgStatusCheck, stopOrgStatusCheck]);

  return (
    <OrgStatusContext.Provider value={value}>
      {ids?.cityId && ids?.orgId && (
        <OrgAlerts cityId={ids.cityId} orgId={ids.orgId} />
      )}
      {children}
    </OrgStatusContext.Provider>
  );
};
