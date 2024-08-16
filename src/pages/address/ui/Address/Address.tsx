import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import {debouncePromise} from '../../../../shared/utils/debouncePromise';
import {AddressMap, AddressMapRef} from '../AddressMap';
import {AddressInputs} from '../AddressInputs';
import {COLORS} from '../../../../shared/styles';
import {useIsYandexDataFetching} from '../../../../entities/geo';
import {MAP_POSITION_CHANGE_DELAY} from '../../../../shared/consts';
import {Button} from '../../../../shared/ui/Button';
import {Container} from '../../../../shared/ui/Container';
import {Inputs} from '../../types/form';
import {useGetPositionByStreetAndHouse} from '../../hooks/useGetPositionByStreetAndHouse';
import {useGetStreetAndHouseByPosition} from '../../hooks/useGetStreetAndHouseByPosition';
import {usePosition} from '../../hooks/usePosition';
import {Position} from '../../../../shared/types/map';

export const Address = () => {
  const getPositionByAddress = useGetPositionByStreetAndHouse();
  const getStreetAndHouseByPosition = useGetStreetAndHouseByPosition();
  const isYandexDataFetching = useIsYandexDataFetching();

  const mapRef = useRef<AddressMapRef | null>(null);

  const {position, setPosition} = usePosition();

  const {handleSubmit, setValue, control, getValues} = useForm<Inputs>({
    defaultValues: {
      street: '',
      house: '',
      floor: '',
      entrance: '',
      flat: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  useEffect(() => {
    if (!position) {
      return;
    }

    (async function () {
      const streetAndHouse = await getStreetAndHouseByPosition(position);

      if (!streetAndHouse) {
        return;
      }

      setValue('street', streetAndHouse.street);
      setValue('house', streetAndHouse.house ?? '');
    })();
  }, [position, setValue, getStreetAndHouseByPosition]);

  const handlePositionChange = useMemo(() => {
    return debouncePromise(async (nextPosition: Position) => {
      setPosition(nextPosition);
    }, MAP_POSITION_CHANGE_DELAY);
  }, [setPosition]);

  const handleHouseInputBlur = useCallback(async () => {
    const streetValue = getValues('street');
    const houseValue = getValues('house');

    if (!streetValue || !houseValue.trim()) {
      return;
    }

    const positionByAddress = await getPositionByAddress(
      streetValue,
      houseValue,
    );

    if (!positionByAddress) {
      return;
    }

    mapRef.current?.setCenter(positionByAddress);
    setPosition(positionByAddress);
  }, [getPositionByAddress, getValues, setPosition]);

  return (
    <View style={styles.wrapper}>
      <AddressMap
        ref={mapRef}
        onPositionChange={handlePositionChange}
        style={styles.map}
      />
      <KeyboardAvoidingView keyboardVerticalOffset={110} behavior="padding">
        <SafeAreaView>
          <Container style={styles.container}>
            <AddressInputs
              onHouseInputBlur={handleHouseInputBlur}
              control={control}
            />
            <Button
              loading={isYandexDataFetching}
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
              text="Доставить сюда"
            />
          </Container>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: COLORS.backgroundPrimary,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  map: {
    flex: 1,
  },
  button: {
    marginTop: 16,
  },
});
