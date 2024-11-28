import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {COLORS} from '../../../../shared/styles';
import {Icon} from '../../../../shared/ui/Icon';
import {useCartItemsRemove} from '../../../cart';
import {useCurrentOrg} from '../../hooks/useCurrentOrg';
import {useCurrentOrgStore} from '../../stores/useCurrentOrgStore';

type Props = {
  style?: StyleProp<ViewStyle>;
  userId: string | undefined;
};

export const OrgChangeButton: FC<Props> = ({style, userId}) => {
  const {data, isFetched} = useCurrentOrg();

  const deleteOrgInfo = useCurrentOrgStore(state => state.deleteOrgInfo);

  const cartRemove = useCartItemsRemove({
    organization: data?.guid ?? '',
    userid: userId!,
  });

  if (!isFetched) {
    return (
      <ShimmerPlaceHolder
        style={[styles.skeleton, style]}
        LinearGradient={LinearGradient}
      />
    );
  }

  const handlePress = () => {
    cartRemove();
    deleteOrgInfo();
  };

  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={handlePress}>
      <Icon style={styles.icon} name="location-on" />
      <Text numberOfLines={2} style={styles.text}>
        {data?.city}, {data?.address}
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
  skeleton: {
    height: 22,
    borderRadius: 4,
  },
});
