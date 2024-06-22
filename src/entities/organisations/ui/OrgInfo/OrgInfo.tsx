import React, {FC, useEffect, useMemo, useRef} from 'react';
import Carousel from 'pinar';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {STATIC_URL} from '../../../../shared/consts';
import {OrgGallery} from '../OrgGallery';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container} from '../../../../shared/ui/Container';
import {Button} from '../../../../shared/ui/Button';
import {Icon} from '../../../../shared/ui/Icon';
import {Modal} from '../../../../shared/ui/Modal';
import {COLORS} from '../../../../shared/styles';
import {Organisation} from '../../types/organisationsTypes';

import {getWeekdayIndexFromMonday} from '../../utils/getWeekdayIndexFromMonday';
import {formatRussianPhoneNumber} from '../../../../shared/utils/formatRussianPhoneNumber';

type Props = {
  onSelect: (org: Organisation) => void;
  onCloseRequest: () => void;
  data: Organisation;
};

export const OrgInfo: FC<Props> = ({onCloseRequest, data, onSelect}) => {
  const modalRef = useRef<BottomSheetModalMethods | null>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    modalRef.current?.present();
  }, []);

  const formattedPhoneNumber = useMemo(() => {
    return formatRussianPhoneNumber(data.phone);
  }, [data]);

  const handlePhonePress = () => {
    Linking.openURL(`tel:${data.phone}`);
  };

  const currentWeekDayIndex = getWeekdayIndexFromMonday(new Date());
  const workTime = data.workTime[currentWeekDayIndex];

  return (
    <Modal
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.handleStyle}
      onDismiss={onCloseRequest}
      footerComponent={() => (
        <Container style={{marginBottom: insets.bottom}}>
          <Button onPress={() => onSelect(data)} text="Выбрать" />
        </Container>
      )}
      ref={modalRef}
      snapPoints={data.gallery.length ? [600] : [250]}>
      {!!data.gallery.length && (
        <View style={styles.gallery}>
          <OrgGallery style={styles.orgGallery} data={data.gallery} />
        </View>
      )}
      <ScrollView>
        <Container style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {data.city}, {data.address}
            </Text>
            <TouchableOpacity onPress={onCloseRequest}>
              <Icon style={styles.icon} name="close" />
            </TouchableOpacity>
          </View>
          <View style={styles.mainInfo}>
            <View>
              <Text style={styles.workTime}>{workTime}</Text>
              <Text style={styles.address}>{data.address}</Text>
            </View>
            <Text>1.4 км</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoBlockTitle}>Телефон:</Text>
            <View>
              <TouchableOpacity onPress={handlePhonePress}>
                <Text style={styles.phone}>{formattedPhoneNumber}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  infoBlockListItem: {
    fontSize: 12,
    textAlign: 'right',
  },
  phone: {
    textAlign: 'right',
    paddingVertical: 2,
    color: COLORS.main,
    fontWeight: '500',
  },
  infoBlockTitle: {
    fontWeight: '500',
  },
  infoBlock: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: COLORS.main,
  },
  address: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  workTime: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gallery: {
    height: 350,
    position: 'relative',
  },
  orgGallery: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
    position: 'absolute',
    height: '100%',
  },
  handle: {
    backgroundColor: 'red',
    height: 0,
    padding: 0,
  },
  handleStyle: {
    top: -8,
  },
  container: {
    paddingTop: 20,
  },
});
