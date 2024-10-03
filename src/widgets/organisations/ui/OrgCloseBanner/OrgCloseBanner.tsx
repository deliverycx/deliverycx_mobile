import React, {FC} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {
  useCurrentOrgStore,
  useExtendedOrgStatus,
} from '../../../../entities/organisations';
import {OrganisationStatus} from '../../../../entities/organisations/types/orgOrgStatusTypes.ts';
import {getToTime} from '../../../../entities/organisations/utils/getToTime.ts';
import {isCurrentTimeInRange} from '../../../../entities/organisations/utils/isCurrentTimeInRange';
import {isTimeAfterRange} from '../../../../entities/organisations/utils/isTimeAfterRange';
import {COLORS} from '../../../../shared/styles';
import {Container} from '../../../../shared/ui/Container';
import {hexToRgba} from '../../../../shared/utils/hexToRgba.ts';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const OrgCloseBanner: FC<Props> = ({style}) => {
  const currentOrgId = useCurrentOrgStore(state => state.orgId);

  const {
    delivery,
    currentDeliveryWorkTime,
    currentWorkTime,
    isFetched,
    organizationStatus,
  } = useExtendedOrgStatus(currentOrgId!, {
    enabled: !!currentOrgId,
  });

  const isWork = organizationStatus === OrganisationStatus.Work;

  if (!isFetched) {
    return null;
  }

  const isOrgWorking = isCurrentTimeInRange(currentWorkTime!);
  const isOrgClosing = isTimeAfterRange(currentDeliveryWorkTime!);

  if (!isOrgWorking && isWork) {
    const getAlertMessage = () => {
      const takeAwayTimeMessage = `Самовывоз доступен ${currentWorkTime}`;
      const deliveryTimeMessage = delivery
        ? `\nДоставка доступна ${currentDeliveryWorkTime}`
        : '';

      return takeAwayTimeMessage + deliveryTimeMessage;
    };

    return (
      <Container>
        <View style={[styles.wrapper, style]}>
          <Text style={styles.title}>Заведение уже закрыто</Text>
          <Text style={styles.accent}>{getAlertMessage()}</Text>
        </View>
      </Container>
    );
  }

  if (isOrgWorking && isOrgClosing && isWork) {
    const getAlertMessage = () => {
      const takeAwayTimeMessage = `Самовывоз доступен до ${getToTime(
        currentWorkTime!,
      )}`;
      const deliveryTimeMessage = delivery
        ? `\nДоставка доступна до ${getToTime(currentDeliveryWorkTime!)}`
        : '';

      return takeAwayTimeMessage + deliveryTimeMessage;
    };

    return (
      <Container>
        <View style={[styles.wrapper, style]}>
          <Text style={styles.title}>Заведение скоро закроется</Text>
          <Text style={styles.accent}>{getAlertMessage()}</Text>
        </View>
      </Container>
    );
  }

  if (!isWork && organizationStatus === OrganisationStatus.NoWork) {
    return (
      <Container>
        <View style={[styles.wrapper, style]}>
          <Text style={styles.title}>В этом заведении нет онлайн заказа</Text>
          <Text style={styles.subTitle}>
            С удовольствием примем его немного позднее, а пока можете
            ознкомиться с нашим меню
          </Text>
        </View>
      </Container>
    );
  }

  if (!isWork && organizationStatus === OrganisationStatus.NoDelivery) {
    return (
      <Container>
        <View style={[styles.wrapper, style]}>
          <Text style={styles.title}>
            В этом заведении онлайн заказ временно не доступен
          </Text>
          <Text style={styles.subTitle}>
            Но вы можете позвонить нам, и мы с удовольствием примем ваш заказ по
            телефону
          </Text>
        </View>
      </Container>
    );
  }

  if (!isWork && organizationStatus === OrganisationStatus.SezonNotWork) {
    return (
      <Container>
        <View style={[styles.wrapper, style]}>
          <Text style={styles.title}>Заведение временно не работает</Text>
          <Text style={styles.subTitle}>
            Временное закрытие заведения в связи с текущим несезонным временем
            года.
          </Text>
        </View>
      </Container>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: hexToRgba(COLORS.main, 0.08),
    borderWidth: 1,
    borderColor: COLORS.main,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  accent: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.main,
  },
});
