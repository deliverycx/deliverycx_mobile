import React, {FC} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Icon} from '../../../../shared/ui/Icon';
import {useCurrentOrg} from '../../hooks/useCurrentOrg';
import {phoneByNumber} from '../../../../shared/utils/phoneByNumber';
import {COLORS} from '../../../../shared/styles';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const OrgCallButton: FC<Props> = ({style}) => {
  const organisation = useCurrentOrg();

  const onButtonPress = () => {
    phoneByNumber(organisation!.phone);
  };

  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onButtonPress}>
      <Icon style={styles.icon} name="call" />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    color: COLORS.main,
  },
});
