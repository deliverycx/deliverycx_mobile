import {useEffect, useMemo, useState} from 'react';
import {
  useCurrentOrgStore,
  useOrganisationQuery,
} from '../../../entities/organisations';
import {Position} from '../../../shared/types/map';
import {getUserPosition} from '../utils/getUserPosition';

const useOrgPosition = () => {
  const currentOrgId = useCurrentOrgStore(state => state.orgId);
  const {data} = useOrganisationQuery(
    {organizationId: currentOrgId!},
    {
      enabled: !!currentOrgId,
    },
  );

  return useMemo(() => {
    if (!data?.cords) {
      return null;
    }

    return {
      lon: parseFloat(data.cords[0]),
      lat: parseFloat(data.cords[1]),
    };
  }, [data]);
};

const useUserPosition = () => {
  const [userPosition, setUserPosition] = useState<Position | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const {coords} = await getUserPosition();
        setUserPosition({
          lon: coords.longitude,
          lat: coords.latitude,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoaded(true);
      }
    })();
  }, [setUserPosition]);

  return {
    userPosition,
    loaded,
  };
};

export const useInitialPosition = () => {
  const orgPosition = useOrgPosition();
  const {userPosition, loaded: userPositionLoaded} = useUserPosition();

  if (!userPositionLoaded) {
    return null;
  }

  return userPosition || orgPosition;
};
