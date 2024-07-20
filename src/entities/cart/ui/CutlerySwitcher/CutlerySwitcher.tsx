import React, {FC} from 'react';
import {Text, View, Switch, StyleSheet} from 'react-native';
import {Icon} from '../../../../shared/ui/Icon';
import {Counter} from '../../../../shared/ui/Counter';
import {COLORS} from '../../../../shared/styles.ts';

type Props = {
  count: number;
  checked: boolean;
  onCountChange: (count: number) => void;
  onSwitcherChange: (checked: boolean) => void;
};

export const CutlerySwitcher: FC<Props> = ({
  count,
  checked,
  onCountChange,
  onSwitcherChange,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <Icon name="local-dining" />
        <Text style={styles.title}>Приборы</Text>
      </View>
      <View style={styles.right}>
        {checked && (
          <Counter variant="secondary" value={count} onChange={onCountChange} />
        )}
        <Switch
          trackColor={{true: COLORS.success}}
          onValueChange={onSwitcherChange}
          value={checked}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  wrapper: {
    flexDirection: 'row',
    borderRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
});
