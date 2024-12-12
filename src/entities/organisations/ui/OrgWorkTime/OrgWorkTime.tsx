import React, {FC} from 'react';
import {Alert, StyleProp, ViewStyle, useWindowDimensions} from 'react-native';
import {Button} from '../../../../shared/ui/Button';
import {Icon} from '../../../../shared/ui/Icon';
import {useWeekWorkTimeTemplate} from '../../hooks/useWeekWorkTimeTemplate';
import {useWorkTimeStatusMessage} from '../../hooks/useWorkTimeStatusMessage';

type Props = {
  workTime: string[];
  style?: StyleProp<ViewStyle>;
};

const SMALL_PLATFORM_WIDTH = 400;

export const OrgWorkTime: FC<Props> = ({workTime, style}) => {
  const workTimeTemplate = useWeekWorkTimeTemplate(workTime);
  const workTimeStatusMessage = useWorkTimeStatusMessage(workTime);

  const {width} = useWindowDimensions();

  const handlePress = () => {
    Alert.alert('График работы организации', workTimeTemplate, [
      {text: 'Хорошо'},
    ]);
  };

  const rightAddons =
    width >= SMALL_PLATFORM_WIDTH ? (
      <Icon name="keyboard-arrow-down" size="sm" />
    ) : undefined;

  return (
    <Button
      style={style}
      variant="tertiary"
      size="sm"
      leftAddons={<Icon name="schedule" size="sm" />}
      rightAddons={rightAddons}
      text={workTimeStatusMessage}
      onPress={handlePress}
    />
  );
};
