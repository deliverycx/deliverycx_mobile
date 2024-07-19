import React, {FC, useMemo} from 'react';
import {StyleProp, Text, View, ViewStyle, StyleSheet} from 'react-native';
import {TwoKhinkali} from '../../../../shared/ui/CustomIcons/TwoKhinkali';
import {CartAllItemResponseModel} from '../../types/cartAllItemsTypes';
import {COLORS} from '../../../../shared/styles';
import {Icon} from '../../../../shared/ui/Icon';

type Props = {
  style?: StyleProp<ViewStyle>;
  data: CartAllItemResponseModel;
};

const DOZEN = 12;
const KHINKALI_ID = 'HI-7654';

export const DozenCounter: FC<Props> = ({style, data}) => {
  const totalKhinkali = useMemo(() => {
    return data.cart.reduce((acc, cur) => {
      if (!cur.productTags.includes(KHINKALI_ID)) {
        return acc;
      }

      return acc + cur.amount;
    }, 0);
  }, [data]);

  const getRegularItem = (
    {count, title, desc}: {count: number; title: string; desc: string},
    success: boolean,
  ) => {
    return (
      <View style={[styles.wrapper, style, success && styles.dozen]}>
        <View style={styles.left}>
          <TwoKhinkali />
          <Text style={styles.counter}>{count}</Text>
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>
    );
  };

  const getOneMoreItem = () => {
    return (
      <View style={styles.oneMoreWrapper}>
        <View style={styles.oneMoreLeft}>
          <Icon style={styles.oneMoreIcon} name="warning" />
          <Text style={styles.oneMoreTitle}>
            Пожалуйста, добавте ещё 1 хинкали
          </Text>
        </View>
        <Text style={styles.oneMoreDesc}>
          *Принимается заказ от 3-х хинкали с ЛЮБОЙ начинкой
        </Text>
      </View>
    );
  };

  if (totalKhinkali >= DOZEN) {
    return getRegularItem(
      {
        count: Math.floor(totalKhinkali / DOZEN),
        title: 'хинкали в подарок!',
        desc: 'Условия акции выполнены',
      },
      true,
    );
  } else if (totalKhinkali === DOZEN - 1) {
    return getOneMoreItem();
  } else {
    return getRegularItem(
      {
        count: DOZEN - totalKhinkali,
        title: 'хинкали до ДЮЖИНЫ!',
        desc: 'при заказе 12-ти вы платите за 11!',
      },
      false,
    );
  }
};

const styles = StyleSheet.create({
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wrapper: {
    padding: 16,
    backgroundColor: COLORS.backgroundQuaternary,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  counter: {
    color: COLORS.textInvert,
    fontSize: 30,
    fontWeight: '600',
    minWidth: 22,
  },
  title: {
    color: COLORS.textInvert,
    fontSize: 18,
    fontWeight: '700',
  },
  desc: {
    fontSize: 12,
    color: COLORS.textInvert,
  },
  dozen: {
    backgroundColor: COLORS.success,
  },
  oneMoreLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  oneMoreTitle: {
    color: COLORS.main,
    fontSize: 17,
    fontWeight: 'bold',
  },
  oneMoreDesc: {
    fontSize: 11,
    color: COLORS.main,
  },
  oneMoreWrapper: {
    gap: 4,
  },
  oneMoreIcon: {
    color: COLORS.main,
  },
});
