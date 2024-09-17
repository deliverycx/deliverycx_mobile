import React, {FC, useMemo} from 'react';
import {FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';
import {ListButton} from '../../../../shared/ui/ListButton';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {PaymentMethod} from '../../../../shared/types/order';
import {useOrderFormContext} from '../../../../entities/order';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Payment>;
};

export const PaymentList: FC<Props> = ({navigation}) => {
  const {setValue} = useOrderFormContext();

  const options = useMemo(() => {
    return [
      {id: PaymentMethod.Cash, name: 'Наличными'},
      {id: PaymentMethod.ByCard, name: 'Банковской картой'},
    ];
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={options}
        renderItem={({item}) => (
          <ListButton
            style={styles.button}
            onPress={() => {
              setValue('paymentMethod', item.id);
              navigation.goBack();
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
