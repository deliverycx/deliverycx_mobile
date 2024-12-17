import {QueryClient} from '@tanstack/react-query';
import React, {FC, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {COLORS} from '../../../../shared/styles';
import {Button} from '../../../../shared/ui/Button';
import {InfoStatus} from '../../../../shared/ui/InfoStatus';

type Props = {
  onRefetch: () => void;
  queryClient: QueryClient;
};

export const NetworkError: FC<Props> = ({onRefetch, queryClient}) => {
  useEffect(() => {
    // Clear query client when NetworkError component shows
    queryClient.clear();
  }, [queryClient]);

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
