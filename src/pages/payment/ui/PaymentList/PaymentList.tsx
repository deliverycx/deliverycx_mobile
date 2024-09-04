import React, {FC} from 'react';
import {FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';
import {ListButton} from '../../../../shared/ui/ListButton';
import {COLORS, INDENTS} from '../../../../shared/styles.ts';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Payment>;
};

export const PaymentList: FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={[
          {id: 1, name: 'Наличными'},
          {id: 2, name: 'Банковской картой'},
        ]}
        renderItem={({item}) => (
          <ListButton
            style={styles.button}
            onPress={() => {
              const state = navigation.getState();
              const previousRoute = state.routes[state.index - 1];

              navigation.navigate(Routes.Order, {
                ...previousRoute.params,
                paymentMethod: item.name,
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
