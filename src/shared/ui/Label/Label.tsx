import React, {FC} from 'react';
import {Text, StyleSheet} from 'react-native';

type Props = {
  text: string;
};

export const Label: FC<Props> = ({text}) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
