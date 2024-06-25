import React, {FC, useEffect, useRef, ReactNode} from 'react';
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

type Props = {
  onRenderSelectButton: (org: Organisation) => ReactNode;
  onCloseRequest: () => void;
  data: Organisation;
};

export const OrgInfo: FC<Props> = ({
  onCloseRequest,
  data,
  onRenderSelectButton,
}) => {
  const modalRef = useRef<BottomSheetModalMethods | null>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    modalRef.current?.present();
  }, []);

  return (
    <Modal
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.handleStyle}
      onDismiss={onCloseRequest}
      footerComponent={() => (
        <Container style={{marginBottom: insets.bottom}}>
          {onRenderSelectButton(data)}
        </Container>
      )}
      ref={modalRef}
      snapPoints={data.gallery.length ? [700] : [450]}>
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
            <OrgWorkTime style={styles.orgWorkTime} workTime={data.workTime} />
            <OrgPhone style={styles.orgPhone} phone={data.phone} />
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
  icon: {
    color: COLORS.main,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 10,
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
    height: 300,
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
  },
  orgPhone: {
    width: '50%',
  },
});
