import {FC, useEffect} from 'react';
import {Alert} from 'react-native';
import {useOrgStatusQuery} from '../../queries/orgStatusQueries';
import {useOrganisationData} from '../../hooks/useOrganisationData';
import {OrganisationStatus} from '../../types/orgOrgStatusTypes';
import {getCurrentTimeRange} from '../../utils/getCurrentTimeRange';
import {getNextTimeRange} from '../../utils/getNextTimeRange';
import {isTimeAfterRange} from '../../utils/isTimeAfterRange';
import {hasDelivery} from '../../utils/hasDelivery';
import {isCurrentTimeInRange} from '../../utils/isCurrentTimeInRange';
import {getDeliveryTime} from '../../utils/getDeliveryTime';
import {getToTime} from '../../utils/getToTime';
import {phoneByNumber} from '../../../../shared/utils/phoneByNumber.ts';

type Props = {
  orgId: string;
  cityId: string;
};

const ORG_STATUS_REFETCH_INTERVAL = 1000 * 60 * 60; // 1min

export const OrgAlerts: FC<Props> = ({orgId, cityId}) => {
  const {data: orgStatusData} = useOrgStatusQuery(
    {
      organization: orgId,
    },
    {
      refetchIntervalInBackground: true,
      refetchInterval: ORG_STATUS_REFETCH_INTERVAL,
    },
  );
  const {data: orgData} = useOrganisationData(cityId, orgId);

  const workTime = orgData?.workTime;
  const organizationStatus = orgStatusData?.organizationStatus;
  const deliveryMethod = orgStatusData?.deliveryMetod;
  const phone = orgData?.phone;

  const currentWorkTime = Array.isArray(workTime)
    ? getCurrentTimeRange(workTime)
    : undefined;
  const nextWorkTime = Array.isArray(workTime)
    ? getNextTimeRange(workTime)
    : undefined;
  const deliveryWorkTime = currentWorkTime
    ? getDeliveryTime(currentWorkTime)
    : undefined;
  const nextDeliveryWorkTime = nextWorkTime
    ? getDeliveryTime(nextWorkTime)
    : undefined;
  const delivery = Array.isArray(deliveryMethod)
    ? hasDelivery(deliveryMethod)
    : undefined;

  useEffect(() => {
    // An organisation works
    if (
      !(organizationStatus === OrganisationStatus.Work) ||
      !currentWorkTime ||
      !deliveryWorkTime
    ) {
      return;
    }

    if (!isCurrentTimeInRange(currentWorkTime)) {
      const getAlertMessage = () => {
        const timeAfterRange = isTimeAfterRange(currentWorkTime);

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
    } else if (isTimeAfterRange(deliveryWorkTime)) {
      const getAlertMessage = () => {
        const takeAwayTimeMessage = `Самовывоз доступен до ${getToTime(
          currentWorkTime,
        )}`;
        const deliveryTimeMessage = delivery
          ? `\nДоставка доступна до ${getToTime(deliveryWorkTime)}`
          : '';

        return takeAwayTimeMessage + deliveryTimeMessage;
      };
      Alert.alert('Заведение скоро закроется', getAlertMessage(), [
        {text: 'Хорошо'},
      ]);
    } else if (!delivery) {
      Alert.alert(
        'В этом завдении доступен только самовывоз',
        'Если вы хотите оформить доставку курьером - попробуйте выбрать другое ближайшее заведение',
        [{text: 'Хорошо'}],
      );
    }
  }, [
    organizationStatus,
    currentWorkTime,
    nextWorkTime,
    delivery,
    deliveryWorkTime,
    nextDeliveryWorkTime,
  ]);

  useEffect(() => {
    // An organisation doesn't work
    if (
      (!organizationStatus && organizationStatus !== OrganisationStatus.Work) ||
      !phone
    ) {
      return;
    }

    switch (organizationStatus) {
      case OrganisationStatus.Open:
        Alert.alert(
          'Готовимся к открытию',
          'Это заведение только готовится к открытию. Попробуйте выбрать другое ближайшее заведение',
          [{text: 'Хорошо'}],
        );
        break;
      case OrganisationStatus.NoWork:
        Alert.alert(
          'В этом заведении нет онлайн заказа',
          'С удовольствием примем его немного позднее, а пока можете ознкомиться с нашим меню',
          [{text: 'Хорошо'}],
        );
        break;
      case OrganisationStatus.NoDelivery:
        Alert.alert(
          'В этом заведении онлайн заказ временно не доступен',
          'Но вы можете позвонить нам, и мы с удовольствием примем ваш заказ по телефону',
          [
            {text: 'Хорошо'},
            {text: 'Позвонить', onPress: () => phoneByNumber(phone!)},
          ],
        );
        break;
      case OrganisationStatus.SezonNotWork:
        Alert.alert(
          'Заведение временно не работает',
          'Временное закрытие заведения в связи с текущим несезонным временем года.',
          [{text: 'Хорошо'}],
        );
    }
  }, [organizationStatus, phone]);

  return null;
};
