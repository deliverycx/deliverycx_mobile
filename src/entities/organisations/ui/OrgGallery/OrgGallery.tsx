import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import Carousel from 'pinar';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {API_URL} from '../../../../shared/consts';

type Props = {
  data: string[];
  style?: StyleProp<ViewStyle>;
};

export const OrgGallery: FC<Props> = ({data, style}) => {
  return (
    <Carousel
      showsControls={false}
      style={[styles.wrapper, style]}
      autoplay={true}>
      {data.map((item, index) => (
        <FastImage
          defaultSource={2}
          key={item}
          style={styles.img}
          source={{
            priority:
              index === 0 ? FastImage.priority.high : FastImage.priority.normal,
            uri: `${API_URL}/static/shop/${item}`,
          }}
        />
      ))}
    </Carousel>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
});
