import {FC, useEffect} from 'react';
import {Alert} from 'react-native';
import {OrganisationStatus} from '../../types/orgOrgStatusTypes';
import {isTimeAfterRange} from '../../utils/isTimeAfterRange';
import {isCurrentTimeInRange} from '../../utils/isCurrentTimeInRange';
import {getToTime} from '../../utils/getToTime';
import {phoneByNumber} from '../../../../shared/utils/phoneByNumber';
import {useAlertsData} from '../../hooks/useAlertsData';

type Props = {
  orgId: string;
  cityId: string;
};

export const OrgAlerts: FC<Props> = ({orgId, cityId}) => {
  const {
    organizationStatus,
    currentWorkTime,
    nextWorkTime,
    delivery,
    deliveryWorkTime,
    nextDeliveryWorkTime,
    phone,
  } = useAlertsData(cityId, orgId);

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

    if (!isOrgWorking) {
      const getAlertMessage = () => {
        const timeAfterRange = isOrgClosing;

        const takeAwayTimeMessage = `Самовывоз доступен ${
          timeAfterRange ? nextWorkTime : currentWorkTime
        }`;
        const deliveryTimeMessage = delivery
          ? `\nДоставка доступна ${
              timeAfterRange ? nextDeliveryWorkTime : deliveryWorkTime
            }`
          : '';

        return takeAwayTimeMessage + deliveryTimeMessage;
      };

      Alert.alert('Заведение уже закрыто', getAlertMessage(), [
        {text: 'Хорошо'},
      ]);
    }
  }, [
    nextDeliveryWorkTime,
    hasAllData,
    currentWorkTime,
    delivery,
    deliveryWorkTime,
    isWork,
    nextWorkTime,
    isOrgClosing,
    isOrgWorking,
  ]);

  useEffect(() => {
    if (!hasAllData || !isWork) {
      return;
    }

    if (isOrgWorking && isOrgClosing) {
      const getAlertMessage = () => {
        const takeAwayTimeMessage = `Самовывоз доступен до ${getToTime(
          currentWorkTime,
        )}`;
        const deliveryTimeMessage = delivery
          ? `\nДоставка доступна до ${getToTime(deliveryWorkTime!)}`
          : '';

        return takeAwayTimeMessage + deliveryTimeMessage;
      };

      Alert.alert('Заведение скоро закроется', getAlertMessage(), [
        {text: 'Хорошо'},
      ]);
    }
  }, [
    currentWorkTime,
    isWork,
    hasAllData,
    delivery,
    deliveryWorkTime,
    isOrgWorking,
    isOrgClosing,
  ]);

  useEffect(() => {
    if (
      !isWork &&
      hasAllData &&
      organizationStatus === OrganisationStatus.Open
    ) {
      Alert.alert(
        'Готовимся к открытию',
        'Это заведение только готовится к открытию. Попробуйте выбрать другое ближайшее заведение',
        [{text: 'Хорошо'}],
      );
    }
  }, [organizationStatus, isWork, hasAllData]);

  useEffect(() => {
    if (
      !isWork &&
      hasAllData &&
      organizationStatus === OrganisationStatus.NoWork
    ) {
      Alert.alert(
        'В этом заведении нет онлайн заказа',
        'С удовольствием примем его немного позднее, а пока можете ознкомиться с нашим меню',
        [{text: 'Хорошо'}],
      );
    }
  }, [organizationStatus, isWork, hasAllData]);

  useEffect(() => {
    if (
      !isWork &&
      hasAllData &&
      organizationStatus === OrganisationStatus.NoDelivery
    ) {
      Alert.alert(
        'В этом заведении онлайн заказ временно не доступен',
        'Но вы можете позвонить нам, и мы с удовольствием примем ваш заказ по телефону',
        [
          {text: 'Хорошо'},
          {text: 'Позвонить', onPress: () => phoneByNumber(phone!)},
        ],
      );
    }
  }, [organizationStatus, isWork, hasAllData, phone]);

  useEffect(() => {
    if (
      !isWork &&
      hasAllData &&
      organizationStatus === OrganisationStatus.SezonNotWork
    ) {
      Alert.alert(
        'Заведение временно не работает',
        'Временное закрытие заведения в связи с текущим несезонным временем года.',
        [{text: 'Хорошо'}],
      );
    }
  }, [organizationStatus, isWork, hasAllData]);

  return null;
};
