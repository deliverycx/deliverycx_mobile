import {FC, useEffect} from 'react';
import {Alert} from 'react-native';
import {useExtendedOrgStatus} from '../../hooks/useExtendedOrgStatus';
import {OrganisationStatus} from '../../types/orgOrgStatusTypes';
import {isCurrentTimeInRange} from '../../utils/isCurrentTimeInRange';
import {isTimeAfterRange} from '../../utils/isTimeAfterRange';

type Props = {
  orgId: string;
};

export const OrgNoDeliveryAlert: FC<Props> = ({orgId}) => {
  const {
    isFetched,
    currentWorkTime,
    currentDeliveryWorkTime,
    delivery,
    organizationStatus,
  } = useExtendedOrgStatus(orgId);

  const isWork = organizationStatus === OrganisationStatus.Work;

  let isOrgWorking: boolean | undefined;
  let isOrgClosing: boolean | undefined;

  if (currentWorkTime && currentDeliveryWorkTime) {
    isOrgWorking = isCurrentTimeInRange(currentWorkTime);
    isOrgClosing = isTimeAfterRange(currentDeliveryWorkTime!);
  }

  useEffect(() => {
    if (!isFetched || !isWork) {
      return;
    }

    if (isOrgWorking && !isOrgClosing && !delivery) {
      Alert.alert(
        'В этом заведении доступен только самовывоз',
        'Если вы хотите оформить доставку курьером - попробуйте выбрать другое ближайшее заведение',
        [{text: 'Хорошо'}],
      );
    }
  }, [
    isFetched,
    isWork,
    currentWorkTime,
    delivery,
    currentDeliveryWorkTime,
    isOrgWorking,
    isOrgClosing,
  ]);

  return null;
};
