import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {COLORS} from '../../../../shared/styles';
import {Button} from '../../../../shared/ui/Button';
import {InfoStatus} from '../../../../shared/ui/InfoStatus';

type Props = {
  onRefetch: () => void;
};

export const NetworkError: FC<Props> = ({onRefetch}) => {
  return (
    <SafeAreaView style={styles.container}>
      <InfoStatus
        variant="asleep"
        text="Нет подключения к интернету."
        desc="Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова."
      />
      <Button style={styles.btn} text="Повторить" onPress={onRefetch} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    elevation: 9,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.backgroundPrimary,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 16,
  },
});
