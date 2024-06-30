import React, {useContext, useMemo} from 'react';
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

export const OrgStatusContext = createContext<ContextProps | null>(null);

export const useOrgStatus = () => {
  return useContext<ContextProps | null>(OrgStatusContext)!;
};

export const OrgStatusProvider: FC<PropsWithChildren> = ({children}) => {
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
