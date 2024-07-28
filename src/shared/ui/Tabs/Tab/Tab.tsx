import React, {useContext, FC} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TabsContext} from '../Tabs';
import {COLORS} from '../../../styles.ts';

export type Value = string;

type Props = {
  name: Value;
  text: string;
};

export const Tab: FC<Props> = ({name, text}) => {
  const {onChange, value} = useContext(TabsContext);

  const handlePress = () => {
    onChange(name);
  };

  const active = name === value;

  return (
    <TouchableOpacity
      style={[styles.wrapper, active ? styles.activeWrapper : undefined]}
      onPress={handlePress}>
      <Text style={[styles.text, active ? styles.activeText : undefined]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activeWrapper: {
    backgroundColor: COLORS.backgroundPrimary,
  },
  activeText: {
    color: COLORS.main,
  },
  wrapper: {
    flexGrow: 1,
    borderRadius: 16,
    padding: 8,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
