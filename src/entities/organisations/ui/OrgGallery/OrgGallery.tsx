import Carousel from 'pinar';
import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';
import {API_URL} from '../../../../shared/consts';

type Props = {
  data: string[];
  style?: StyleProp<ViewStyle>;
};

const Image = createImageProgress(FastImage);

export const OrgGallery: FC<Props> = ({data, style}) => {
  return (
    <Carousel
      showsControls={false}
      style={[styles.wrapper, style]}
      autoplay={true}>
      {data.map((item, index) => (
        <Image
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
