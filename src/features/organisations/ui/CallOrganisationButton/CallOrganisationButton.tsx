import React, {FC} from 'react';
import {Linking, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {Icon} from '../../../../shared/ui/Icon';
import {styles} from '../ChangeOrganisationButton/ChangeOrganisationButton';
import {useCurrentOrg} from '../../hooks/useCurrentOrg';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const CallOrganisationButton: FC<Props> = ({style}) => {
  const organisation = useCurrentOrg();

  const onButtonPress = () => {
    Linking.openURL(`tel:${organisation!.phone}`);
  };

  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onButtonPress}>
      <Icon style={styles.icon} name="call" />
    </TouchableOpacity>
  );
};
