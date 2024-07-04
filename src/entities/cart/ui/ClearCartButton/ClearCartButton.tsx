import React from 'react';
import {TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Icon} from '../../../../shared/ui/Icon';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {useCartStore} from '../../stores/useCartStore';

export const ClearCartButton = () => {
  const clearAllItems = useCartStore(state => state.clearAllItems);
  const items = useCartStore(state => state.getAllItems());

  if (!items.length) {
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
        onPress: clearAllItems,
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
