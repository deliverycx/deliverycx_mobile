import React, {FC, useMemo} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {COLORS} from '../../../../shared/styles';
import {useKhinkaliCounterRequestDates} from '../../hooks/useKhinkaliCounterRequestDates.ts';
import {useKhinkaliCounterQuery} from '../../queries/orgKhinkaliCounterQueries';

type Props = {
  orgId: string;
  phone: string;
  style?: StyleProp<ViewStyle>;
};

export const OrgKhinkaliCounter: FC<Props> = ({orgId, style, phone}) => {
  const [oldTime, time] = useKhinkaliCounterRequestDates();

  const {data, isFetched} = useKhinkaliCounterQuery({
    point: orgId,
    oldtime: oldTime,
    time,
    phone,
  });

  const values = useMemo(() => {
    const array: number[] = new Array(8).fill(0);

    if (!data) {
      return array;
    }

    const numArray = Array.from(String(data), Number);

    for (let i = 0; i < numArray.length; i++) {
      array[array.length - 1 - i] = numArray[numArray.length - 1 - i];
    }

    return array;
  }, [data]);

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.title}>Съедено хинкали</Text>
      <View style={styles.counter}>
        {values.map((value, index) => {
          if (!isFetched) {
            return (
              <ShimmerPlaceHolder
                key={index}
                LinearGradient={LinearGradient}
                style={styles.counterItem}
              />
            );
          } else {
            return (
              <View style={styles.counterItem} key={index}>
                <Text style={styles.counterItemText}>{value}</Text>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  counter: {
    flexDirection: 'row',
    gap: 2,
  },
  counterItem: {
    width: 20,
    height: 24,
    backgroundColor: COLORS.backgroundPrimaryInvert,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  counterItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textInvert,
  },
});
