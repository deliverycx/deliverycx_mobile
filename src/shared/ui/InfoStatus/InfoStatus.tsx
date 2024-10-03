import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HappyKhinkal} from '../CustomIcons/HappyKhinkal';
import {SadKhinkal} from '../CustomIcons/SadKhinkal';

const enum Variant {
  sad = 'sad',
  happy = 'happy',
}

type Props = {
  text: string;
  desc?: string;
  variant: keyof typeof Variant;
};

export const InfoStatus: FC<Props> = ({text, desc, variant}) => {
  const getIcon = () => {
    switch (variant) {
      case Variant.sad:
        return <SadKhinkal />;

      case Variant.happy:
        return <HappyKhinkal />;
    }
  };

  return (
    <View style={styles.wrapper}>
      {getIcon()}
      <View>
        <Text style={styles.text}>{text}</Text>
        {desc && <Text style={styles.desc}>{desc}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    maxWidth: 350,
    paddingTop: 10,
  },
});
