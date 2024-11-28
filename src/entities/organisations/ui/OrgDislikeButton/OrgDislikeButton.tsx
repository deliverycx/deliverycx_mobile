import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {TELEGRAM_BOT_URL} from '../../../../shared/consts';
import {useOpenUrl} from '../../../../shared/hooks/useOpenUrl';
import {COLORS} from '../../../../shared/styles';
import {Button} from '../../../../shared/ui/Button';
import {Icon} from '../../../../shared/ui/Icon';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const OrgDisLikeButton: FC<Props> = ({style}) => {
  const openUrl = useOpenUrl();

  return (
    <Button
      onPress={() => openUrl(TELEGRAM_BOT_URL)}
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
