import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {TELEGRAM_BOT_URL} from '../../../../shared/consts';
import {useMetrics} from '../../../../shared/hooks/useMetrics';
import {useOpenUrl} from '../../../../shared/hooks/useOpenUrl';
import {COLORS} from '../../../../shared/styles';
import {Button} from '../../../../shared/ui/Button';
import {Icon} from '../../../../shared/ui/Icon';
import {Organisation} from '../../types/organisationsTypes';

type Props = {
  style?: StyleProp<ViewStyle>;
  org: Organisation;
};

export const OrgDisLikeButton: FC<Props> = ({style, org}) => {
  const openUrl = useOpenUrl();

  const metrics = useMetrics();

  return (
    <Button
      onPress={() => {
        metrics.dislikeOrg({address: org.address});

        openUrl(TELEGRAM_BOT_URL);
      }}
      style={style}
      variant="secondary"
      leftAddons={<Icon size="sm" style={styles.icon} name="thumb-down" />}
      text="Пожаловаться"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    color: COLORS.main,
  },
});
