import React, {FC, memo, useMemo, useRef} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Marker, YaMap} from 'react-native-yamap';
import {Point} from 'react-native-yamap/src/interfaces';
import {GeoMarker} from '../../../../shared/ui/CustomIcons/GeoMarker.tsx';
import {
  Organisation,
  OrganisationsResponseModel,
} from '../../types/organisationsTypes';

type Props = {
  data: OrganisationsResponseModel;
  onOrgPress: (org: Organisation) => void;
  style?: StyleProp<ViewStyle>;
};

YaMap.init('9319733b-bbba-48e7-af52-8410be35c07d');

export const OrgMap: FC<Props> = memo(({data, style, onOrgPress}) => {
  const mapRef = useRef<YaMap>(null);

  const regions = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.map(organisation => {
      const {cords} = organisation;

      return {
        organisation,
        coords: {
          lon: parseFloat(cords[0]),
          lat: parseFloat(cords[1]),
        },
      };
    });
  }, [data]);

  const isOnlyOnePlace = regions.length === 1;

  const handleMapLoaded = () => {
    mapRef.current?.fitMarkers(regions.map(region => region.coords));
  };

  const handleOrgPress = (coords: Point, org: Organisation) => {
    mapRef.current?.fitMarkers([coords]);
    onOrgPress(org);
  };

  return (
    <YaMap
      showUserPosition={false}
      initialRegion={{
        ...regions[0].coords,
        zoom: isOnlyOnePlace ? 15 : 10,
      }}
      onMapLoaded={handleMapLoaded}
      style={style}
      mapType="vector"
      ref={mapRef}>
      {regions.map(({coords, organisation}) => (
        <Marker
          key={organisation.id}
          onPress={() => handleOrgPress(coords, organisation)}
          anchor={{x: 0.7, y: 0.9}}
          point={{lat: coords.lat, lon: coords.lon}}>
          <GeoMarker />
        </Marker>
      ))}
    </YaMap>
  );
});
