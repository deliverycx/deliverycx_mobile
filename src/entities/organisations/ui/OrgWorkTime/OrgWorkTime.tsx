import {Button} from '../../../../shared/ui/Button';
import React, {FC} from 'react';
import {Alert, StyleProp, ViewStyle} from 'react-native';
import {Icon} from '../../../../shared/ui/Icon';
import {useWeekWorkTimeTemplate} from '../../hooks/useWeekWorkTimeTemplate';
import {useWorkTimeStatusMessage} from '../../hooks/useWorkTimeStatusMessage.ts';

type Props = {
  workTime: string[];
  style?: StyleProp<ViewStyle>;
};

export const OrgWorkTime: FC<Props> = ({workTime, style}) => {
  const workTimeTemplate = useWeekWorkTimeTemplate(workTime);
  const workTimeStatusMessage = useWorkTimeStatusMessage(workTime);

  const handlePress = () => {
    Alert.alert('', workTimeTemplate, [{text: 'OK'}]);
  };

  return (
    <Button
      style={style}
      variant="tertiary"
      size="sm"
      leftAddons={<Icon name="schedule" size="sm" />}
      rightAddons={<Icon name="keyboard-arrow-down" size="sm" />}
      text={workTimeStatusMessage}
      onPress={handlePress}
    />
  );
};
