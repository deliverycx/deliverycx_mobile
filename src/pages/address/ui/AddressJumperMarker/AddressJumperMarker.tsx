import React, {FC, useEffect, useRef} from 'react';
import {StyleProp, ViewStyle, Animated, StyleSheet} from 'react-native';
import {Icon} from '../../../../shared/ui/Icon';
import {COLORS} from '../../../../shared/styles.ts';

type Props = {
  style?: StyleProp<ViewStyle>;
  animated?: boolean;
};

export const AddressJumperMarker: FC<Props> = ({style, animated = false}) => {
  const bounceValueRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) {
      return;
    }

    let flag = true;

    const anim = () => {
      Animated.sequence([
        Animated.timing(bounceValueRef, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValueRef, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (flag) {
          anim();
        }
      });
    };

    anim();

    return () => {
      flag = false;
    };
  }, [animated, bounceValueRef]);

  return (
    <Animated.View style={[style, {transform: [{translateY: bounceValueRef}]}]}>
      <Icon style={styles.icon} size="xxl" name="person-pin-circle" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: COLORS.main,
  },
});
