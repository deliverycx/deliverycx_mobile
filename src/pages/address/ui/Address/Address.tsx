import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {debouncePromise} from '../../../../shared/utils/debouncePromise';
import {AddressMap, AddressMapRef} from '../AddressMap';
import {AddressInputs} from '../AddressInputs';
import {COLORS} from '../../../../shared/styles';
import {MAP_POSITION_CHANGE_DELAY} from '../../../../shared/consts';
import {Button} from '../../../../shared/ui/Button';
import {Container} from '../../../../shared/ui/Container';
import {Inputs} from '../../types/form';
import {useGetPositionByStreetAndHouse} from '../../hooks/useGetPositionByStreetAndHouse';
import {useGetStreetAndHouseByPosition} from '../../hooks/useGetStreetAndHouseByPosition';

import {useInitialPosition} from '../../hooks/useInitialPosition';
import {Position} from '../../../../shared/types/map';

export const Address = () => {
  const getPositionByAddress = useGetPositionByStreetAndHouse();
  const getStreetAndHouseByPosition = useGetStreetAndHouseByPosition();

  const [isAddressFetching, setIsAddressFetching] = useState(false);

  const mapRef = useRef<AddressMapRef | null>(null);

  const initialPosition = useInitialPosition();

  const {handleSubmit, setValue, control, getValues, formState} =
    useForm<Inputs>({
      defaultValues: {
        street: '',
        house: '',
        floor: '',
        entrance: '',
        flat: '',
      },
    });

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const updateStreetAndHouseByPosition = useCallback(
    async (pos: Position) => {
      const streetAndHouse = await getStreetAndHouseByPosition(pos);

      if (!streetAndHouse) {
        Toast.show({
          topOffset: 100,
          visibilityTime: 5000,
          type: 'custom',
          text1: 'Не можем найти адрес на карте, введите его вручную',
        });

        return;
      }

      setValue('street', streetAndHouse.street);
      setValue('house', streetAndHouse.house ?? '');
    },
    [setValue, getStreetAndHouseByPosition],
  );

  useEffect(() => {
    if (!initialPosition) {
      return;
    }

    mapRef.current?.setCenter(initialPosition);

    (async function () {
      const streetAndHouse = await getStreetAndHouseByPosition(initialPosition);

      if (!streetAndHouse) {
        return;
      }

      setValue('street', streetAndHouse.street);
      setValue('house', streetAndHouse.house ?? '');
    })();
  }, [initialPosition, setValue, getStreetAndHouseByPosition]);

  const positionChange = useMemo(() => {
    return debouncePromise(async (pos: Position) => {
      await updateStreetAndHouseByPosition(pos);
    }, MAP_POSITION_CHANGE_DELAY);
  }, [updateStreetAndHouseByPosition]);

  const handlePositionChange = useCallback(
    async (pos: Position) => {
      setIsAddressFetching(true);
      await positionChange(pos);
      setIsAddressFetching(false);
    },
    [positionChange],
  );

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
      setValue('house', '');
      return;
    }

    mapRef.current?.setCenter(positionByAddress);

    await updateStreetAndHouseByPosition(positionByAddress);
  }, [
    getPositionByAddress,
    getValues,
    updateStreetAndHouseByPosition,
    setValue,
  ]);

  return (
    <View style={styles.wrapper}>
      <AddressMap
        style={styles.map}
        ref={mapRef}
        loading={isAddressFetching}
        onPositionChange={handlePositionChange}
      />
      <KeyboardAvoidingView keyboardVerticalOffset={110} behavior="padding">
        <SafeAreaView>
          <Container style={styles.container}>
            <AddressInputs
              onHouseInputBlur={handleHouseInputBlur}
              control={control}
            />
            <Button
              loading={isAddressFetching}
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
