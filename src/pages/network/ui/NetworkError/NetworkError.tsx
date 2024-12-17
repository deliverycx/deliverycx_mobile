import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {COLORS} from '../../../../shared/styles';
import {Button} from '../../../../shared/ui/Button';
import {InfoStatus} from '../../../../shared/ui/InfoStatus';

export const NetworkError = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>();

  const fetchNetInfo = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  useEffect(() => {
    fetchNetInfo();
  }, []);

  if (isConnected || isConnected === undefined) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <InfoStatus
        variant="asleep"
        text="Нет подключения к интернету."
        desc="Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова."
      />
      <Button style={styles.btn} text="Повторить" onPress={fetchNetInfo} />
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
