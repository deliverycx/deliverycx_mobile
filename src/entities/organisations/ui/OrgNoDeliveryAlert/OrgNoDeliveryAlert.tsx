import {FC, useEffect} from 'react';
import {Alert} from 'react-native';
import {isCurrentTimeInRange} from '../../utils/isCurrentTimeInRange';
import {isTimeAfterRange} from '../../utils/isTimeAfterRange';
import {useAlertsData} from '../../hooks/useAlertsData';
import {OrganisationStatus} from '../../types/orgOrgStatusTypes';

type Props = {
  cityId: string;
  orgId: string;
};

export const OrgNoDeliveryAlert: FC<Props> = ({cityId, orgId}) => {
  const {organizationStatus, currentWorkTime, delivery, deliveryWorkTime} =
    useAlertsData(cityId, orgId);

  const isWork = organizationStatus === OrganisationStatus.Work;
  const hasAllData = !!(organizationStatus && currentWorkTime);

  let isOrgWorking: boolean | undefined;
  let isOrgClosing: boolean | undefined;

  if (hasAllData) {
    isOrgWorking = isCurrentTimeInRange(currentWorkTime);
    isOrgClosing = isTimeAfterRange(deliveryWorkTime!);
  }

  useEffect(() => {
    if (!hasAllData || !isWork) {
      return;
    }

    if (isOrgWorking && !isOrgClosing && !delivery) {
      Alert.alert(
        'В этом завдении доступен только самовывоз',
        'Если вы хотите оформить доставку курьером - попробуйте выбрать другое ближайшее заведение',
        [{text: 'Хорошо'}],
      );
    }
  }, [
    hasAllData,
    isWork,
    currentWorkTime,
    delivery,
    deliveryWorkTime,
    isOrgWorking,
    isOrgClosing,
  ]);

  return null;
};
