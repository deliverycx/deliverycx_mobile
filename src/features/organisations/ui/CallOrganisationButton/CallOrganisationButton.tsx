import React, {FC} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {Icon} from '../../../../shared/ui/Icon';
import {styles} from '../ChangeOrganisationButton/ChangeOrganisationButton';
import {useCurrentOrg} from '../../hooks/useCurrentOrg';
import {phoneByNumber} from '../../../../shared/utils/phoneByNumber.ts';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const CallOrganisationButton: FC<Props> = ({style}) => {
  const organisation = useCurrentOrg();

  const onButtonPress = () => {
    phoneByNumber(organisation!.phone);
  };

  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onButtonPress}>
      <Icon style={styles.icon} name="call" />
    </TouchableOpacity>
  );
};
