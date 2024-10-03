import {useQueryClient} from '@tanstack/react-query';
import {useCallback, useMemo, useState} from 'react';
import {
  GeoLocateAddressRequestModel,
  fetchAddressById,
  fetchCleanAddress,
  fetchGeoLocateAddressData,
  useStreetDataQuery,
} from '../../../entities/geo';
import {useCurrentOrgStore} from '../../../entities/organisations';
import {Position} from '../../../shared/types/map';
import {debouncePromise} from '../../../shared/utils/debouncePromise';

const REQUEST_DELAY_MS = 600;

type BaseGeoData = {
  streetKladrId: string | null;
  lat: string | null;
  lon: string | null;
  house: string | null;
};

export const useGeoData = () => {
  const queryClient = useQueryClient();

  const [baseGeoData, setBaseGeoData] = useState<BaseGeoData | undefined>();
  const [isFetching, setIsFetching] = useState(false);

  const orgId = useCurrentOrgStore(state => state.orgId);

  const {data: kladrList} = useStreetDataQuery({
    organizationId: orgId!,
  });

  const requestKladrByPosition = useCallback(
    async (position: GeoLocateAddressRequestModel) => {
      try {
        const {data} = await fetchGeoLocateAddressData(queryClient, position);

        const fullGeoData = data?.suggestions[0]?.data;

        const result = {
          lat: fullGeoData?.geo_lat ?? null,
          lon: fullGeoData?.geo_lon ?? null,
          streetKladrId: fullGeoData?.street_kladr_id ?? null,
          house: fullGeoData?.house ?? null,
        };

        setBaseGeoData(result);

        return result;
      } catch (err) {
        console.warn('Error fetching geoData by position', err);
      }
    },
    [queryClient],
  );

  const requestKladrById = useCallback(
    async (id: string) => {
      try {
        const {data} = await fetchAddressById(queryClient, {query: id});

        const fullGeoData = data?.suggestions[0]?.data;

        const result = {
          lat: fullGeoData?.geo_lat ?? null,
          lon: fullGeoData?.geo_lon ?? null,
          streetKladrId: fullGeoData?.street_kladr_id ?? null,
          house: fullGeoData?.house ?? null,
        };

        setBaseGeoData(result);

        return result;
      } catch (err) {
        console.warn('Error fetching geoData by id', err);
      }
    },
    [queryClient],
  );

  const requestKladrByQuery = useCallback(
    async (query: string) => {
      try {
        const {data} = await fetchCleanAddress(queryClient, [query]);

        const fullGeoData = data?.[0];

        const result = {
          lat: fullGeoData?.geo_lat ?? null,
          lon: fullGeoData?.geo_lon ?? null,
          streetKladrId: fullGeoData?.street_kladr_id ?? null,
          house: fullGeoData?.house ?? null,
        };

        setBaseGeoData(result);

        return result;
      } catch (err) {
        console.warn('Error fetching geoData by query', err);
      }
    },
    [queryClient],
  );

  const debouncedRequestKladrByPosition = useMemo(() => {
    return debouncePromise(async (pos: Position) => {
      setIsFetching(true);
      const result = await requestKladrByPosition(pos);
      setIsFetching(false);

      return result as BaseGeoData | undefined;
    }, REQUEST_DELAY_MS);
  }, [requestKladrByPosition]);

  const debouncedRequestKladrById = useMemo(() => {
    return debouncePromise(async (id: string) => {
      setIsFetching(true);
      const result = await requestKladrById(id);
      setIsFetching(false);

      return result as BaseGeoData | undefined;
    }, REQUEST_DELAY_MS);
  }, [requestKladrById]);

  const debouncedRequestKladrByQuery = useMemo(() => {
    return debouncePromise(async (id: string) => {
      setIsFetching(true);
      const result = await requestKladrByQuery(id);
      setIsFetching(false);

      return result as BaseGeoData | undefined;
    }, REQUEST_DELAY_MS);
  }, [requestKladrByQuery]);

  const geoData = useMemo(() => {
    if (!kladrList?.length || !baseGeoData) {
      return;
    }

    const kladrItem = kladrList.find(
      ({classifierId}) => classifierId === baseGeoData.streetKladrId,
    );

    if (!kladrItem) {
      return {
        name: null,
        classifierId: null,
        house: null,
        lat: null,
        lon: null,
      };
    }

    return {
      ...kladrItem,
      house: baseGeoData.house,
      lat: baseGeoData.lat,
      lon: baseGeoData.lon,
    };
  }, [baseGeoData, kladrList]);

  return {
    requestKladrByPosition: debouncedRequestKladrByPosition,
    requestKladrById: debouncedRequestKladrById,
    requestKladrByQuery: debouncedRequestKladrByQuery,
    geoData,
    isFetching,
  };
};
