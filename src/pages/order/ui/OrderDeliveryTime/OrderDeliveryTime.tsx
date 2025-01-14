import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import React, {FC, useState} from 'react';
import {Platform} from 'react-native';
import {useMetrics} from '../../../../shared/hooks/useMetrics';
import {DateTimePickerAndroid} from '../../../../shared/ui/DateTimePickerAndroid';
import {DateTimePickerIOS} from '../../../../shared/ui/DateTimePickerIOS';
import {InputButton} from '../../../../shared/ui/InputButton';

type Props = {
  value: Date | undefined;
  onChange: (date: Date) => void;
};

const ONE_HOUR_MS = 60 * 60 * 1000;
const TEN_MINUTES_MS = 1000 * 60 * 10;

export const OrderDeliveryTime: FC<Props> = ({onChange, value}) => {
  const [open, setOpen] = useState(false);

  const metrics = useMetrics();

  const handlePress = () => {
    metrics.showOrderTimePicker();

    setOpen(true);
  };

  const handleChange = (_: DateTimePickerEvent, date?: Date) => {
    if (!date) {
      return;
    }

    if (Platform.OS === 'android') {
      setOpen(false);
    }

    onChange(date);
  };

  const minDate = new Date(Date.now() + TEN_MINUTES_MS);
  const date = value ?? minDate;

  const getFormattedText = () => {
    const timeDifference = +date - +minDate + TEN_MINUTES_MS;

    if (timeDifference <= ONE_HOUR_MS) {
      return 'Как можно скорее';
    } else {
      return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  return (
    <>
      <InputButton
        value={getFormattedText()}
        label="Время доставки"
        onPress={handlePress}
      />
      {Platform.select({
        android: open && (
          <DateTimePickerAndroid
            display="spinner"
            mode="time"
            is24Hour={true}
            minimumDate={minDate}
            onChange={handleChange}
            value={value ?? minDate}
            minuteInterval={10}
          />
        ),
        ios: open && (
          <DateTimePickerIOS
            display="spinner"
            mode="time"
            minimumDate={minDate}
            onChange={handleChange}
            value={value ?? minDate}
            minuteInterval={10}
            onDismiss={() => setOpen(false)}
          />
        ),
      })}
    </>
  );
};
