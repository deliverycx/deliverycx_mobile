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
import {Icon} from '../../../../shared/ui/Icon';
import {COLORS} from '../../../../shared/styles';
import {Position} from '../../../../shared/types/map';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPositionChange: (position: Position) => void;
};

export type AddressMapRef = {
  setCenter: (position: Position) => void;
};

const AUTO_ZOOM = 17;

export const AddressMap = memo(
  forwardRef<AddressMapRef, Props>(({style, onPositionChange}, outerRef) => {
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
        <Icon style={styles.icon} size="xxl" name="person-pin-circle" />
        <YaMap
          onCameraPositionChangeEnd={handleCameraPositionChangeEnd}
          style={styles.map}
          mapType="vector"
          showUserPosition={false}
          ref={ref}
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    zIndex: 9,
    left: '50%',
    top: '50%',
    marginLeft: -32,
    marginTop: -55,
    color: COLORS.main,
  },
  map: {
    flex: 1,
  },
});
