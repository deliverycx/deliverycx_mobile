import React, {FC} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {API_URL} from '../../../../shared/consts';
import {Filter} from '../../types/organisationsTypes';

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
          <SvgUri
            style={styles.img}
            uri={`${API_URL}/static/shop/${images[0]}`}
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
