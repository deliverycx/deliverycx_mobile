import React from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {useCartItemsRemove} from '../../../../entities/cart';
import {useCurrentOrgStore} from '../../../../entities/organisations';
import {useUserStore} from '../../../../entities/user';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {Icon} from '../../../../shared/ui/Icon';
import {useCartItems} from '../../hooks/useCartItems';

export const ClearCartButton = () => {
  const orgId = useCurrentOrgStore(state => state.orgId);
  const userId = useUserStore(state => state.user?.id);

  const {data} = useCartItems();

  const cartRemove = useCartItemsRemove({
    organization: orgId!,
    userid: userId!,
  });

  if (!data?.cart?.length) {
    return null;
  }

  const handlePress = () => {
    Alert.alert('Очистить карзину?', 'Все товары будут удалены', [
      {
        text: 'Отмена',
      },
      {
        style: 'destructive',
        text: 'Очистить',
        onPress: cartRemove,
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.btn}>
      <Icon style={styles.icon} name="delete" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginRight: INDENTS.main,
  },
  icon: {
    color: COLORS.main,
  },
});
