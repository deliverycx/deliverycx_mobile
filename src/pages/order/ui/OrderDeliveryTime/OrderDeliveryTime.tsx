import React, {useRef, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet, View} from 'react-native';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {InputButton} from '../../../../shared/ui/InputButton';
import {Modal} from '../../../../shared/ui/Modal';

export const OrderDeliveryTime = () => {
  const [time, setTime] = useState(new Date());

  const modalRef = useRef<BottomSheetModalMethods | null>(null);

  const handlePress = () => {
    modalRef.current?.present();
  };

  return (
    <>
      <InputButton
        value="Как можно скорее"
        label="Время самовывоза"
        onPress={handlePress}
      />
      <Modal style={styles.modal} snapPoints={['30%']} ref={modalRef}>
        <View style={styles.wrapper}>
          <DateTimePicker
            display="spinner"
            mode="time"
            is24Hour={true}
            onChange={() => {}}
            value={time}
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
