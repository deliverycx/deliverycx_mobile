import React, {FC} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useMetrics} from '../../../../shared/hooks/useMetrics';
import {COLORS} from '../../../../shared/styles';
import {Counter} from '../../../../shared/ui/Counter';
import {Icon} from '../../../../shared/ui/Icon';

type Props = {
  count: number;
  onCountChange: (count: number) => void;
};

export const CutlerySwitcher: FC<Props> = ({count, onCountChange}) => {
  const metrics = useMetrics();

  const handleCutleryChange = (nextCount: number) => {
    metrics.changeCutlery();
    onCountChange(nextCount);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <Icon style={styles.iconTitle} name="local-dining" />
        <Text style={styles.title}>Приборы</Text>
      </View>
      <View style={styles.right}>
        {count > 0 && (
          <Counter
            max={99}
            variant="secondary"
            value={count}
            onChange={handleCutleryChange}
          />
        )}
        <Switch
          style={styles.switch}
          trackColor={{true: COLORS.success}}
          thumbColor={COLORS.backgroundPrimary}
          onValueChange={checked => {
            metrics.changeCutlery();
            onCountChange(checked ? 1 : 0);
          }}
          value={count > 0}
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
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  iconTitle: {
    color: COLORS.textPrimary,
  },
  switch: {
    height: 30,
  },
});
