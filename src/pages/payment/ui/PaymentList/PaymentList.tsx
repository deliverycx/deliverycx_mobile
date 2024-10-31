import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useOrderFormContext} from '../../../../entities/order';
import {
  useCurrentOrgStore,
  useExtendedOrgStatus,
} from '../../../../entities/organisations';
import {Routes, StackParamList} from '../../../../shared/routes';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {PaymentMethod} from '../../../../shared/types/order';
import {ListButton} from '../../../../shared/ui/ListButton';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Payment>;
};

export const PaymentList: FC<Props> = ({navigation}) => {
  const currentOrgId = useCurrentOrgStore(state => state.orgId);

  const {setValue} = useOrderFormContext();
  const {paymentMetod} = useExtendedOrgStatus(currentOrgId!, {
    enabled: !!currentOrgId,
  });

  const getOptions = () => {
    const options = [];

    if (paymentMetod?.includes(PaymentMethod.Cash)) {
      options.push({
        id: PaymentMethod.Cash,
        name: 'Наличными',
      });
    }

    if (paymentMetod?.includes(PaymentMethod.ByCard)) {
      options.push({
        id: PaymentMethod.ByCard,
        name: 'Картой при получении',
      });
    }

    if (paymentMetod?.includes(PaymentMethod.Card)) {
      options.push({
        id: PaymentMethod.Card,
        name: 'Картой в приложении',
      });
    }

    return options;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={getOptions()}
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
