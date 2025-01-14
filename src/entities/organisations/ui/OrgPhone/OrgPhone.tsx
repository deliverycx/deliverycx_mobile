import React, {FC, useMemo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useMetrics} from '../../../../shared/hooks/useMetrics.ts';
import {Button} from '../../../../shared/ui/Button';
import {Icon} from '../../../../shared/ui/Icon';
import {formatRussianPhoneNumber} from '../../../../shared/utils/formatRussianPhoneNumber';
import {phoneByNumber} from '../../../../shared/utils/phoneByNumber';
import {Organisation} from '../../types/organisationsTypes';

type Props = {
  data: Organisation;
  style?: StyleProp<ViewStyle>;
};

export const OrgPhone: FC<Props> = ({data, style}) => {
  const metrics = useMetrics();

  const formattedPhoneNumber = useMemo(() => {
    return formatRussianPhoneNumber(data.phone) ?? 'N/A';
  }, [data]);

  const handlePhonePress = () => {
    metrics.callOrg({address: data.address, source: 'preview'});

    phoneByNumber(data.phone);
  };

  return (
    <Button
      style={style}
      variant="tertiary"
      size="sm"
      leftAddons={<Icon name="call" size="sm" />}
      text={formattedPhoneNumber}
      onPress={handlePhonePress}
    />
  );
};
