import DateTimePicker, {
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import React, {FC} from 'react';

type Props = {} & Omit<AndroidNativeProps, 'negativeButton' | 'positiveButton'>;

export const DateTimePickerAndroid: FC<Props> = props => {
  return (
    <DateTimePicker
      {...props}
      negativeButton={{label: 'Отмена'}}
      positiveButton={{label: 'Выбрать'}}
    />
  );
};
