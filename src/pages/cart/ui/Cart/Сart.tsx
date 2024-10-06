import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {FC} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  showOrderAlertFail,
  useOrderCheckCartQuery,
} from '../../../../entities/order';
import {useUserStore} from '../../../../entities/user';
import {Routes, StackParamList} from '../../../../shared/routes';
import {hapticFeedback} from '../../../../shared/utils/hapticFeedback.ts';
import {CartList, useCartItems} from '../../../../widgets/cart';
import {OrgCloseBanner} from '../../../../widgets/organisations';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Cart>;
};

export const Cart: FC<Props> = ({navigation}) => {
  const {data} = useCartItems();
  const userId = useUserStore(state => state.user?.id);

  const {mutateAsync: checkCart, isPending} = useOrderCheckCartQuery();

  const handleSubmit = async () => {
    if (!userId) {
      return;
    }

    hapticFeedback('impactMedium');

    try {
      await checkCart({userid: userId});
      navigation.push(Routes.Order);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data.errors;

        if (errors.hasOwnProperty('HI')) {
          Alert.alert('Добавьте хинкали', errors.HI.message, [
            {text: 'Хорошо'},
          ]);
          return;
        }

        return;
      }

      showOrderAlertFail();
    }
  };

  return (
    <View style={styles.wrapper}>
      {!!data?.cart?.length && <OrgCloseBanner />}
      <CartList onSubmit={handleSubmit} isLoading={isPending} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 20,
    paddingTop: 18,
  },
  orgCloseBanner: {
    paddingVertical: 16,
  },
});
