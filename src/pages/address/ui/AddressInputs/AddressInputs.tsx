import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {Input} from '../../../../shared/ui/Input';
import {InputButton} from '../../../../shared/ui/InputButton';
import {AddressForm} from '../../../../widgets/address';

type Props = {
  control: Control<AddressForm>;
  onHouseInputBlur: () => void;
  onStreetPress: () => void;
};

export const AddressInputs: FC<Props> = ({
  control,
  onHouseInputBlur,
  onStreetPress,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Controller
          name="street"
          rules={{
            required: true,
          }}
          control={control}
          render={({field: {onChange, value}, formState}) => (
            <InputButton
              onPress={onStreetPress}
              value={value}
              label="Улица *"
              style={styles.largeInput}
              onChangeText={onChange}
              editable={true}
              color={formState.errors.street ? 'danger' : undefined}
            />
          )}
        />
      </View>
      <View style={styles.row}>
        <Controller
          name="house"
          rules={{
            required: true,
          }}
          control={control}
          render={({field: {onChange, value}, formState}) => (
            <Input
              style={styles.mediumInput}
              value={value}
              placeholder="Дом *"
              onBlur={onHouseInputBlur}
              onChangeText={onChange}
              editable={true}
              color={formState.errors.house ? 'danger' : undefined}
            />
          )}
        />
        <Controller
          name="flat"
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <Input
                style={styles.mediumInput}
                value={value}
                placeholder="Кв/офис"
                onChangeText={onChange}
              />
            );
          }}
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
