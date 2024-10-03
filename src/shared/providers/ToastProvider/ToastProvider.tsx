import React, {FC, PropsWithChildren} from 'react';
import {View} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {ToastMessage} from '../../ui/ToastMessage';

const toastConfig: ToastConfig = {
  custom: ({text1, props}) => (
    <View {...props}>
      <ToastMessage text={text1} />
    </View>
  ),
};

export const ToastProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      {children}
      <Toast config={toastConfig} />
    </>
  );
};
