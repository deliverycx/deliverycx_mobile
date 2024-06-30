import {useCurrentOrgIds} from '../../stores/useCurrentOrgIds';
import React, {FC} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Icon} from '../../../../shared/ui/Icon';
import {COLORS} from '../../../../shared/styles';
import {useCurrentOrg} from '../../hooks/useCurrentOrg';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const OrgChangeButton: FC<Props> = ({style}) => {
  const organisation = useCurrentOrg();
  const deleteOrgInfo = useCurrentOrgIds(state => state.deleteOrgInfo);

  return (
    <TouchableOpacity
      style={[styles.btn, style]}
      onPress={() => deleteOrgInfo()}>
      <Icon style={styles.icon} name="location-on" />
      <Text style={styles.text}>
        {organisation?.city}, {organisation?.address}
      </Text>
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
  text: {
    color: COLORS.main,
    fontWeight: '500',
    fontSize: 14,
  },
});
