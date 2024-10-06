import {FC, useEffect} from 'react';
import {Alert} from 'react-native';
import {phoneByNumber} from '../../../../shared/utils/phoneByNumber';
import {useOrganisationQuery} from '../../queries/organisationQueries';
import {OrganisationStatus} from '../../types/orgOrgStatusTypes';
import {getToTime} from '../../utils/getToTime';
import {isCurrentTimeInRange} from '../../utils/isCurrentTimeInRange';
import {isTimeAfterRange} from '../../utils/isTimeAfterRange';

type Props = {
  currentWorkTime: string;
  deliveryWorkTime: string;
  delivery: boolean;
  orgId: string;
  organizationStatus: OrganisationStatus;
};

export const OrgAlerts: FC<Props> = ({
  delivery,
  deliveryWorkTime,
  currentWorkTime,
  orgId,
  organizationStatus,
}) => {
  const {data} = useOrganisationQuery({organizationId: orgId});

  const isWork = organizationStatus === OrganisationStatus.Work;
  const phone = data?.phone ?? '';

  const isOrgWorking = isCurrentTimeInRange(currentWorkTime);
  const isOrgClosing = isTimeAfterRange(deliveryWorkTime);

  useEffect(() => {
    if (!isWork) {
      return;
    }

    if (!isOrgWorking) {
      const getAlertMessage = () => {
        const takeAwayTimeMessage = `Самовывоз доступен ${currentWorkTime}`;
        const deliveryTimeMessage = delivery
          ? `\nДоставка доступна ${deliveryWorkTime}`
          : '';

        return takeAwayTimeMessage + deliveryTimeMessage;
      };

      Alert.alert('Заведение закрыто', getAlertMessage(), [{text: 'Хорошо'}]);
    }
  }, [
    currentWorkTime,
    delivery,
    deliveryWorkTime,
    isWork,
    isOrgClosing,
    isOrgWorking,
  ]);

  useEffect(() => {
    if (!isWork) {
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
    delivery,
    deliveryWorkTime,
    isOrgWorking,
    isOrgClosing,
  ]);

  useEffect(() => {
    if (!isWork && organizationStatus === OrganisationStatus.Open) {
      Alert.alert(
        'Готовимся к открытию',
        'Это заведение только готовится к открытию. Попробуйте выбрать другое ближайшее заведение',
        [{text: 'Хорошо'}],
      );
    }
  }, [organizationStatus, isWork]);

  useEffect(() => {
    if (!isWork && organizationStatus === OrganisationStatus.NoWork) {
      Alert.alert(
        'В этом заведении нет онлайн заказа',
        'С удовольствием примем его немного позднее, а пока можете ознкомиться с нашим меню',
        [{text: 'Хорошо'}],
      );
    }
  }, [organizationStatus, isWork]);

  useEffect(() => {
    if (!isWork && organizationStatus === OrganisationStatus.NoDelivery) {
      Alert.alert(
        'В этом заведении онлайн заказ временно не доступен',
        'Но вы можете позвонить нам, и мы с удовольствием примем ваш заказ по телефону',
        [
          {text: 'Хорошо'},
          {text: 'Позвонить', onPress: () => phoneByNumber(phone)},
        ],
      );
    }
  }, [organizationStatus, isWork, phone]);

  useEffect(() => {
    if (!isWork && organizationStatus === OrganisationStatus.SezonNotWork) {
      Alert.alert(
        'Заведение временно не работает',
        'Временное закрытие заведения в связи с текущим несезонным временем года.',
        [{text: 'Хорошо'}],
      );
    }
  }, [organizationStatus, isWork]);

  return null;
};
