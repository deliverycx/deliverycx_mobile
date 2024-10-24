import {useHeaderHeight} from '@react-navigation/elements';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useCallback, useEffect, useRef} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {OrderForm, useOrderFormContext} from '../../../../entities/order';
import {useOrgCity} from '../../../../entities/organisations';
import {Routes, StackParamList} from '../../../../shared/routes';
import {COLORS} from '../../../../shared/styles';
import {Button} from '../../../../shared/ui/Button';
import {Container} from '../../../../shared/ui/Container';
import {AddressForm, useAddressFormContext} from '../../../../widgets/address';
import {useGeoData} from '../../hooks/useGeoData';
import {useInitialPosition} from '../../hooks/useInitialPosition';
import {AddressInputs} from '../AddressInputs';
import {AddressMap, AddressMapRef} from '../AddressMap';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Address>;
};

export const Address: FC<Props> = ({navigation}) => {
  const mapRef = useRef<AddressMapRef | null>(null);

  const {handleSubmit, setValue, control, getValues, watch, reset} =
    useAddressFormContext<AddressForm>();

  const {setValue: setOrderValues} = useOrderFormContext<OrderForm>();

  const classifierId = watch('classifierId');

  const initialPosition = useInitialPosition();
  const cityName = useOrgCity();

  const headerHeight = useHeaderHeight();

  const {
    requestKladrByQuery,
    requestKladrById,
    requestKladrByPosition,
    geoData,
    isFetching,
  } = useGeoData();

  useEffect(() => {
    if (!geoData) {
      return;
    }

    if (!geoData.classifierId) {
      Toast.show({
        topOffset: 100,
        visibilityTime: 5000,
        type: 'custom',
        text1: 'Доставка по указанному адресу невозможна',
      });
    }

    setValue('classifierId', geoData.classifierId);
    setValue('street', geoData.name ?? '');
    setValue('house', geoData.house ?? '');
  }, [reset, geoData, setValue]);

  useEffect(() => {
    if (!classifierId) {
      return;
    }

    (async function () {
      const data = await requestKladrById(classifierId);

      if (!data?.lon || !data?.lat) {
        return;
      }

      mapRef.current?.setCenter({
        lat: Number(data.lat),
        lon: Number(data.lon),
      });
    })();
  }, [classifierId, requestKladrById]);

  useEffect(() => {
    if (!initialPosition) {
      return;
    }

    mapRef.current?.setCenter({
      lat: initialPosition.lat,
      lon: initialPosition.lon,
    });

    (async function () {
      await requestKladrByPosition(initialPosition);
    })();
  }, [requestKladrByPosition, initialPosition]);

  const handleStreetPress = () => {
    navigation.push(Routes.Streets);
  };

  const onSubmit: SubmitHandler<AddressForm> = values => {
    navigation.goBack();

    setOrderValues('classifierId', values.classifierId);
    setOrderValues('flat', values.flat);
    setOrderValues('house', values.house);
    setOrderValues('floor', values.floor);
    setOrderValues('street', values.street);
    setOrderValues('entrance', values.entrance);

    reset();
  };

  const handleHouseInputBlur = useCallback(async () => {
    const streetValue = getValues('street');
    const houseValue = getValues('house');

    if (!streetValue || !houseValue.trim()) {
      return;
    }

    const data = await requestKladrByQuery(
      `${cityName}, ${streetValue}, ${houseValue}`,
    );

    if (!data?.lon || !data?.lat) {
      return;
    }

    mapRef.current?.setCenter({
      lat: Number(data.lat),
      lon: Number(data.lon),
    });
  }, [cityName, getValues, requestKladrByQuery]);

  return (
    <View style={styles.wrapper}>
      <AddressMap
        style={styles.map}
        ref={mapRef}
        loading={isFetching}
        onPositionChange={requestKladrByPosition}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior="padding">
        <SafeAreaView>
          <Container style={styles.container}>
            <AddressInputs
              onHouseInputBlur={handleHouseInputBlur}
              onStreetPress={handleStreetPress}
              control={control}
            />
            <Button
              loading={isFetching}
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
