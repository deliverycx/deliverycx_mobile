import React, {createContext, FC, PropsWithChildren, useCallback} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Value} from './Tab';
import {COLORS} from '../../styles.ts';

type ContextValue = {
  onChange: (value: Value) => void;
  value: Value | null;
};

type Props = PropsWithChildren<
  {
    style?: StyleProp<ViewStyle>;
  } & ContextValue
>;

export const TabsContext = createContext<ContextValue>({
  onChange: () => {},
  value: null,
});

export const Tabs: FC<Props> = ({onChange, children, style, value}) => {
  const handleChange = useCallback(
    (nextValue: Value) => {
      onChange(nextValue);
    },
    [onChange],
  );

  return (
    <TabsContext.Provider value={{onChange: handleChange, value}}>
      <View style={style}>
        <View style={styles.wrapper}>{children}</View>
      </View>
    </TabsContext.Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 6,
    padding: 3,
    backgroundColor: COLORS.backgroundTertiary,
    borderRadius: 16,
  },
});
