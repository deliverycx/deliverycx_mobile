import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useLayoutEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  TextInputFocusEventData,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CitiesList, City} from '../../../../entities/cities';
import {Routes, StackParamList} from '../../../../shared/routes';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Cities>;
};

export const Cities: FC<Props> = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        hideWhenScrolling: false,
        cancelButtonText: 'Отмена',
        placeholder: 'Поиск',
        onChangeText: (event: NativeSyntheticEvent<TextInputFocusEventData>) =>
          setSearchValue(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  const handleChange = (city: City) => {
    navigation.push(Routes.Organisations, {cityId: city.id});
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <CitiesList
        style={{marginBottom: 0 - insets.bottom}}
        scrollIndicatorInsets={{top: -1, bottom: insets.bottom}}
        searchValue={searchValue}
        onChange={handleChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
