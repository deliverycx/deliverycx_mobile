import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useListInsets = () => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  return useMemo(() => {
    return {
      scrollIndicatorInsets: {
        bottom: bottomTabBarHeight - insets.bottom,
      },
      contentInset: {
        bottom: bottomTabBarHeight,
      },
    };
  }, [bottomTabBarHeight, insets]);
};
