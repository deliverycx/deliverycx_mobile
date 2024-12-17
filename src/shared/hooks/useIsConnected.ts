import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export const useIsConnected = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>();

  const fetchNetInfo = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  useEffect(() => {
    fetchNetInfo();
  }, []);

  return isConnected;
};
