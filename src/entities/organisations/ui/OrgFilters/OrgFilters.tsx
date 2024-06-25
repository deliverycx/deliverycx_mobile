import React, {FC} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Filter} from '../../types/organisationsTypes';
import {API_URL} from '../../../../shared/consts';

type Props = {
  data: Filter[];
  style?: StyleProp<ViewStyle>;
};

export const OrgFilters: FC<Props> = ({data, style}) => {
  return (
    <View style={[styles.wrapper, style]}>
      {data.map(({name, images}, index) => (
        <View
          style={[
            styles.filter,
            index % 2 === 0 ? styles.paddingRight : styles.paddingLeft,
          ]}
          key={index}>
          <FastImage
            style={styles.img}
            source={{
              uri: `${API_URL}/static/shop/${images[0]}`,
            }}
          />
          <Text>{name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 16,
    height: 16,
  },
  filter: {
    width: '50%',
    flexDirection: 'row',
    gap: 6,
  },
  paddingLeft: {
    paddingLeft: 4,
  },
  paddingRight: {
    paddingRight: 4,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
  },
});
