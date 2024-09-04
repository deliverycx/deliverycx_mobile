import React, {FC, useLayoutEffect, useMemo, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {ListButton} from '../../../../shared/ui/ListButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';
import {useCurrentOrgStore} from '../../../../entities/organisations';
import {useStreetDataQuery} from '../../../../entities/geo';
import {COLORS, INDENTS} from '../../../../shared/styles';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Streets>;
};

export const StreetsList: FC<Props> = ({navigation}) => {
  const orgId = useCurrentOrgStore(state => state.orgId);
  const {data} = useStreetDataQuery({organizationId: orgId!});

  const [searchValue, setSearchValue] = useState('');

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

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter(
      (obj, index, self) => index === self.findIndex(o => obj.name === o.name),
    );
  }, [data]);

  const options = useMemo(() => {
    if (searchValue === '') {
      return filteredData;
    }

    return filteredData.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [filteredData, searchValue]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={options}
        renderItem={({item}) => (
          <ListButton
            style={styles.button}
            onPress={() => {
              const state = navigation.getState();
              const previousRoute = state.routes[state.index - 1];

              navigation.navigate(Routes.Address, {
                ...previousRoute.params,
                classifierId: item.classifierId,
              });
            }}
            key={item.id}
            text={item.name}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  button: {
    marginLeft: INDENTS.main,
    paddingRight: INDENTS.main,
  },
});
