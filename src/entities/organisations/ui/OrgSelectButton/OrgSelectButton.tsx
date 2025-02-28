import {useQueryClient} from '@tanstack/react-query';
import React, {FC, useState} from 'react';
import {Alert, Linking} from 'react-native';
import {useMetrics} from '../../../../shared/hooks/useMetrics';
import {Button} from '../../../../shared/ui/Button';
import {fetchProducts} from '../../../products';
import {getOrgFullAddress} from '../../../products/utils/getOrgFullAddress';
import {useCurrentOrgStore} from '../../stores/useCurrentOrgStore';
import {Organisation} from '../../types/organisationsTypes';
import {isOrgApiAvailable} from '../../utils/isOrgApiAvailable.ts';

type Props = {
  data: Organisation;
  disabled?: boolean;
};

export const OrgSelectButton: FC<Props> = ({data, disabled = false}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const metrics = useMetrics();

  const setOrgInfo = useCurrentOrgStore(state => state.setOrgInfo);

  const handleOrgChange = async () => {
    setLoading(true);

    if (!isOrgApiAvailable(data.id)) {
      Alert.alert(
        'Заведение не доступно',
        'К сожалению данное заведение не доступно для работы в приложении. Пожалуйста, выберите другое заведение или воспользуйтесь веб версией.',
        [
          {text: 'Хорошо'},
          {
            text: 'Перейти на сайт',
            onPress: () =>
              Linking.openURL('https://xn--80apgfh0ct5a.xn--p1ai/'),
          },
        ],
      );
    } else {
      try {
        await fetchProducts(queryClient, {organization: data.guid});
        setOrgInfo(data.guid);
      } catch (err) {}
    }

    metrics.chooseOrg({address: getOrgFullAddress(data)});

    setLoading(false);
  };

  return (
    <Button
      loading={loading}
      disabled={disabled}
      onPress={handleOrgChange}
      text="Перейти в меню"
    />
  );
};
