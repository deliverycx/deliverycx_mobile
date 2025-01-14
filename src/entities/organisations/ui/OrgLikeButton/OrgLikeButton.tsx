import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useMetrics} from '../../../../shared/hooks/useMetrics';
import {useOpenUrl} from '../../../../shared/hooks/useOpenUrl';
import {COLORS} from '../../../../shared/styles';
import {Button} from '../../../../shared/ui/Button';
import {Icon} from '../../../../shared/ui/Icon';
import {useOrgSocialQuery} from '../../queries/orgSocialQueries';
import {useCurrentOrgStore} from '../../stores/useCurrentOrgStore';
import {Organisation} from '../../types/organisationsTypes';

type Props = {
  style?: StyleProp<ViewStyle>;
  org: Organisation;
};

export const OrgLikeButton: FC<Props> = ({style, org}) => {
  const orgId = useCurrentOrgStore(state => state.orgId);
  const {data} = useOrgSocialQuery({idorganization: orgId!});

  const openUrl = useOpenUrl();
  const metrics = useMetrics();

  const handlePress = async () => {
    if (!data?.like) {
      return;
    }

    metrics.dislikeOrg({address: org.address});

    await openUrl(data.like);
  };

  return (
    <Button
      onPress={handlePress}
      style={style}
      variant="quaternary"
      leftAddons={<Icon size="sm" style={styles.icon} name="thumb-up" />}
      text="Похвалить"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    color: COLORS.success,
  },
});
