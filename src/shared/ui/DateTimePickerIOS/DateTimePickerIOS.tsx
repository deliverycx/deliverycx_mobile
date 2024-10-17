import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import DateTimePicker, {
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import React, {FC, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal} from '../Modal';

type Props = {
  onDismiss?: () => void;
} & IOSNativeProps;

export const DateTimePickerIOS: FC<Props> = ({onDismiss, ...props}) => {
  const modalRef = useRef<BottomSheetModalMethods | null>(null);

  useEffect(() => {
    modalRef.current?.present();
  }, []);

  return (
    <Modal
      onDismiss={onDismiss}
      style={styles.modal}
      snapPoints={['30%']}
      ref={modalRef}>
      <View style={styles.wrapper}>
        <DateTimePicker {...props} />
      </View>
    </Modal>
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
