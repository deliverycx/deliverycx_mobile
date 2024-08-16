import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {Input} from '../../../../shared/ui/Input';
import {InputButton} from '../../../../shared/ui/InputButton';
import {useIsYandexDataFetching} from '../../../../entities/geo';
import {Inputs} from '../../types/form';

type Props = {
  control: Control<Inputs>;
  onHouseInputBlur: () => void;
};

export const AddressInputs: FC<Props> = ({control, onHouseInputBlur}) => {
  const isYandexDataFetching = useIsYandexDataFetching();

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Controller
          name="street"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputButton
              value={value}
              label="Улица"
              style={styles.largeInput}
              onChangeText={onChange}
              editable={!isYandexDataFetching}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          name="house"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              style={styles.mediumInput}
              value={value}
              placeholder="Дом"
              onBlur={onHouseInputBlur}
              onChangeText={onChange}
              editable={!isYandexDataFetching}
            />
          )}
        />
        <Controller
          name="flat"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              style={styles.mediumInput}
              value={value}
              placeholder="Кв/офис"
              onChangeText={onChange}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          name="entrance"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              style={styles.mediumInput}
              value={value}
              placeholder="Подъезд"
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name="floor"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              style={styles.mediumInput}
              value={value}
              placeholder="Этаж"
              onPress={onChange}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  largeInput: {
    flex: 1,
  },
  mediumInput: {
    width: '48%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
