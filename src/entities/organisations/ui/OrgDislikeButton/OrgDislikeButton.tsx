import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Button} from '../../../../shared/ui/Button';
import {Icon} from '../../../../shared/ui/Icon';
import {COLORS} from '../../../../shared/styles';
import {TELEGRAM_BOT_URL} from '../../../../shared/consts';
import {useOpenUrl} from '../../../../shared/hooks/useOpenUrl';

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
      leftAddons={<Icon style={styles.icon} name="thumb-down" />}
      text="Пожаловаться"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    color: COLORS.main,
  },
});
