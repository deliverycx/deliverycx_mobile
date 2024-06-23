import React, {FC} from 'react';
import Carousel from 'pinar';
import {Image, StyleProp, StyleSheet, ViewStyle} from 'react-native';
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
      {data.map(item => (
        <Image
          key={item}
          style={styles.img}
          source={{
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
