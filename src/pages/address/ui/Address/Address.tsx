import React, {FC, useEffect, useRef, useCallback} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import {SubmitHandler} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import {AddressMap, AddressMapRef} from '../AddressMap';
import {AddressInputs} from '../AddressInputs';
import {COLORS} from '../../../../shared/styles';
import {Button} from '../../../../shared/ui/Button';
import {Container} from '../../../../shared/ui/Container';
import {useInitialPosition} from '../../hooks/useInitialPosition';
import {Routes, StackParamList} from '../../../../shared/routes';
import type {RouteProp} from '@react-navigation/native';
import {useAddressForm, FormValues} from '../../hooks/useAddressForm';
import {useGeoData} from '../../hooks/useGeoData';
import {useOrgCity} from '../../../../entities/organisations';

type Props = {
  route: RouteProp<StackParamList, Routes.Address>;
  navigation: NativeStackNavigationProp<StackParamList, Routes.Address>;
};

export const Address: FC<Props> = ({navigation, route}) => {
  const classifierIdParam = route.params?.classifierId;

  const mapRef = useRef<AddressMapRef | null>(null);

  const {handleSubmit, setValue, control, getValues, reset} = useAddressForm();
  const initialPosition = useInitialPosition();
  const cityName = useOrgCity();

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

      return;
    }

    setValue('street', geoData.name);
    setValue('house', geoData.house ?? '');
  }, [reset, geoData, setValue]);

  useEffect(() => {
    if (!classifierIdParam) {
      return;
    }

    (async function () {
      const data = await requestKladrById(classifierIdParam);

      if (!data?.lon || !data?.lat) {
        return;
      }

      mapRef.current?.setCenter({
        lat: Number(data.lat),
        lon: Number(data.lon),
      });
    })();
  }, [classifierIdParam, requestKladrById]);

  useEffect(() => {
    if (!initialPosition) {
      return;
    }

    mapRef.current?.setCenter({
      lat: initialPosition.lat,
      lon: initialPosition.lon,
    });
  }, [initialPosition]);

  const handleStreetPress = () => {
    navigation.push(Routes.Streets);
  };

  const onSubmit: SubmitHandler<FormValues> = data => {
    const state = navigation.getState();
    const previousRoute = state.routes[state.index - 1];

    navigation.navigate(Routes.Order, {
      ...previousRoute.params,
      address: data,
    });
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
      <KeyboardAvoidingView keyboardVerticalOffset={110} behavior="padding">
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
