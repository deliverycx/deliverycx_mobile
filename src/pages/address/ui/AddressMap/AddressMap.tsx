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
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Position} from '../../../../shared/types/map';
import {AddressJumperMarker} from '../AddressJumperMarker';
import {Icon} from '../../../../shared/ui/Icon';
import {COLORS} from '../../../../shared/styles.ts';
import {hexToRgba} from '../../../../shared/utils/hexToRgba';
import {getUserPosition} from '../../utils/getUserPosition';

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
          const {point, zoom, azimuth, reason} =
            nativeEvent as CameraPosition & {
              reason: string;
            };

          if (reason !== 'GESTURES') {
            return;
          }

          onPositionChange({
            lat: point.lat,
            lon: point.lon,
            zoom,
            azimuth,
          });
        },
        [onPositionChange],
      );

      const handleMyPositionPress = async () => {
        try {
          const {coords} = await getUserPosition();

          ref.current?.setCenter(
            {
              lat: coords.latitude,
              lon: coords.longitude,
              zoom: AUTO_ZOOM,
            },
            AUTO_ZOOM,
          );
        } catch (err) {
          console.error(err);
        }
      };

      return (
        <View style={style}>
          <AddressJumperMarker style={styles.icon} animated={loading} />
          <YaMap
            onCameraPositionChangeEnd={handleCameraPositionChangeEnd}
            style={styles.map}
            mapType="vector"
            showUserPosition={false}
            ref={ref}
            logoPosition={{
              horizontal: 'left',
            }}
          />
          <TouchableOpacity
            style={styles.myPosButton}
            onPress={handleMyPositionPress}>
            <Icon name="near-me" />
          </TouchableOpacity>
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
  myPosButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundPrimary,
    shadowColor: hexToRgba(COLORS.backgroundPrimaryInvert, 0.2),
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
});
