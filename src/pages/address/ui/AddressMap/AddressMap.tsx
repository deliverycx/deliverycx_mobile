import React, {
  useCallback,
  useRef,
  memo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {CameraPosition, YaMap} from 'react-native-yamap';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Position} from '../../../../shared/types/map';
import {AddressJumperMarker} from '../AddressJumperMarker';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPositionChange: (position: Position) => void;
  loading?: boolean;
};

export type AddressMapRef = {
  setCenter: (position: Position) => void;
};

const AUTO_ZOOM = 17;

export const AddressMap = memo(
  forwardRef<AddressMapRef, Props>(
    ({style, onPositionChange, loading = false}, outerRef) => {
      const ref = useRef<YaMap>(null);

      useImperativeHandle(
        outerRef,
        () => {
          return {
            setCenter: (position: Position) => {
              ref.current?.setCenter(
                position,
                position.zoom ?? AUTO_ZOOM,
                position.azimuth,
              );
            },
          };
        },
        [],
      );

      const handleCameraPositionChangeEnd = useCallback(
        async ({nativeEvent}: NativeSyntheticEvent<CameraPosition>) => {
          const {point, zoom, azimuth} = nativeEvent;

          onPositionChange({
            lat: point.lat,
            lon: point.lon,
            zoom,
            azimuth,
          });
        },
        [onPositionChange],
      );

      return (
        <View style={style}>
          <AddressJumperMarker style={styles.icon} animated={loading} />
          <YaMap
            onCameraPositionChangeEnd={handleCameraPositionChangeEnd}
            style={styles.map}
            mapType="vector"
            showUserPosition={false}
            ref={ref}
          />
        </View>
      );
    },
  ),
);

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    zIndex: 9,
    left: '50%',
    top: '50%',
    marginLeft: -32,
    marginTop: -55,
  },
  map: {
    flex: 1,
  },
});
