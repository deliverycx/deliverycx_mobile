import React, {FC, useMemo} from 'react';
import {formatRussianPhoneNumber} from '../../../../shared/utils/formatRussianPhoneNumber';
import {StyleProp, ViewStyle} from 'react-native';
import {Button} from '../../../../shared/ui/Button';
import {Icon} from '../../../../shared/ui/Icon';
import {phoneByNumber} from '../../../../shared/utils/phoneByNumber.ts';

type Props = {
  phone: string;
  style?: StyleProp<ViewStyle>;
};

export const OrgPhone: FC<Props> = ({phone, style}) => {
  const formattedPhoneNumber = useMemo(() => {
    return formatRussianPhoneNumber(phone) ?? 'N/A';
  }, [phone]);

  const handlePhonePress = () => {
    phoneByNumber(phone);
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
