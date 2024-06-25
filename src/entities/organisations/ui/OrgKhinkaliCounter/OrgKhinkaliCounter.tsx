import React, {FC, useMemo} from 'react';
import {Text, StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {useKhinkaliCounterQuery} from '../../queries/orgKhinkaliCounterQueries';
import {COLORS} from '../../../../shared/styles';

type Props = {
  orgId: string;
  style?: StyleProp<ViewStyle>;
};

export const OrgKhinkaliCounter: FC<Props> = ({orgId, style}) => {
  const {data} = useKhinkaliCounterQuery({organization: orgId});

  const values = useMemo(() => {
    if (!data) {
      return;
    }

    const array: number[] = new Array(8).fill(0);
    const numArray = Array.from(String(data.coutn), Number);

    for (let i = 0; i < numArray.length; i++) {
      array[array.length - 1 - i] = numArray[numArray.length - 1 - i];
    }

    return array;
  }, [data]);

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.title}>Съедено хинкали</Text>
      <View style={styles.counter}>
        {values?.map((value, index) => (
          <View style={styles.counterItem} key={index}>
            <Text style={styles.counterItemText}>{value}</Text>
          </View>
        ))}
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
