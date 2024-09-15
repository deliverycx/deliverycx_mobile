import React, {FC, useRef} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {StyleSheet, View} from 'react-native';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {InputButton} from '../../../../shared/ui/InputButton';
import {Modal} from '../../../../shared/ui/Modal';

type Props = {
  value: Date | undefined;
  onChange: (date: Date) => void;
};

const ONE_HOUR_MS = 60 * 60 * 1000;
const TEN_MINUTES_MS = 1000 * 60 * 10;

export const OrderDeliveryTime: FC<Props> = ({onChange, value}) => {
  const modalRef = useRef<BottomSheetModalMethods | null>(null);

  const handlePress = () => {
    modalRef.current?.present();
  };

  const handleChange = (_: DateTimePickerEvent, date?: Date) => {
    if (!date) {
      return;
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
      <Modal style={styles.modal} snapPoints={['30%']} ref={modalRef}>
        <View style={styles.wrapper}>
          <DateTimePicker
            display="spinner"
            mode="time"
            is24Hour={true}
            minimumDate={minDate}
            onChange={handleChange}
            value={value ?? minDate}
            minuteInterval={10}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modal: {
    flex: 1,
  },
});
