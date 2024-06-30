import React, {FC, useEffect, useRef, ReactNode, useMemo} from 'react';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {OrgGallery} from '../OrgGallery';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container} from '../../../../shared/ui/Container';
import {Icon} from '../../../../shared/ui/Icon';
import {Modal} from '../../../../shared/ui/Modal';
import {COLORS} from '../../../../shared/styles';
import {Organisation} from '../../types/organisationsTypes';
import {OrgRating} from '../OrgRating';
import {OrgKhinkaliCounter} from '../OrgKhinkaliCounter';
import {OrgWorkTime} from '../OrgWorkTime';
import {OrgPhone} from '../OrgPhone';
import {OrgFilters} from '../OrgFilters';
import {useOrgStatusAlerts} from '../../providers/OrgStatusAlertsProvider';
import {OrgNoDeliveryAlert} from '../OrgNoDeliveryAlert';
import {OrgSelectButton} from '../OrgSelectButton';

type Props = {
  onCloseRequest: () => void;
  data: Organisation;
};

const IMAGE_HEIGHT = 250;
const CONTENT_WITHOUT_FILTERS_HEIGHT = 300;
const FILTER_ITEM = 16;
const FILTER_ITEM_ROW_GAP = 10;

export const OrgInfo: FC<Props> = ({onCloseRequest, data}) => {
  useOrgStatusAlerts(data.cityid, data.guid);
  const modalRef = useRef<BottomSheetModalMethods | null>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    modalRef.current?.present();
  }, []);

  const contentHeight = useMemo(() => {
    const filtersLen = data.filters.length;
    const rows = Math.ceil(filtersLen / 2);
    const filtersHeight = rows * FILTER_ITEM + (rows - 1) * FILTER_ITEM_ROW_GAP;

    return CONTENT_WITHOUT_FILTERS_HEIGHT + filtersHeight;
  }, [data]);

  return (
    <>
      <Modal
        handleStyle={styles.handle}
        handleIndicatorStyle={styles.handleStyle}
        onDismiss={onCloseRequest}
        footerComponent={() => (
          <Container style={{marginBottom: insets.bottom}}>
            <OrgSelectButton orgId={data.guid} cityId={data.cityid} />
          </Container>
        )}
        ref={modalRef}
        snapPoints={
          data.gallery.length ? [contentHeight + IMAGE_HEIGHT] : [contentHeight]
        }>
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
            <OrgRating orgId={data.guid} />
            <OrgKhinkaliCounter
              style={styles.khinkaliCounter}
              orgId={data.guid}
            />
            <View style={styles.mainInfo}>
              <View style={styles.orgWorkTime}>
                <OrgWorkTime workTime={data.workTime} />
              </View>
              <View style={styles.orgPhone}>
                <OrgPhone phone={data.phone} />
              </View>
            </View>
            <OrgFilters style={styles.orgFilters} data={data.filters} />
          </Container>
        </ScrollView>
      </Modal>
      <OrgNoDeliveryAlert cityId={data.cityid} orgId={data.guid} />
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  icon: {
    color: COLORS.main,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
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
    height: 250,
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
  khinkaliCounter: {
    paddingVertical: 10,
  },
  orgWorkTime: {
    width: '50%',
    paddingRight: 4,
  },
  orgPhone: {
    width: '50%',
    paddingLeft: 4,
  },
  orgFilters: {
    paddingVertical: 8,
  },
});
