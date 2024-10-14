import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  OrgDisLikeButton,
  OrgLikeButton,
  OrgVKButton,
} from '../../../../entities/organisations';
import {
  CALORIES_URL,
  FRANCHISE_URL,
  JOBS_URL,
  RIGHTS_URL,
  SECRET_GUEST_URL,
  TELEGRAM_BOT_URL,
} from '../../../../shared/consts';
import {useOpenUrl} from '../../../../shared/hooks/useOpenUrl';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {FunKhinkal} from '../../../../shared/ui/CustomIcons/FunKhinkal';
import {Tg} from '../../../../shared/ui/CustomIcons/Tg';
import {ListButton} from '../../../../shared/ui/ListButton';
import {AppVersion} from '../AppVersion';

export const Contacts = () => {
  const height = useBottomTabBarHeight();

  const openUrl = useOpenUrl();

  return (
    <View style={[styles.wrapper, {paddingBottom: height}]}>
      <View style={styles.imageWrapper}>
        <FunKhinkal />
      </View>
      <View style={styles.headerActions}>
        <View style={styles.actionButtonLeft}>
          <OrgDisLikeButton />
        </View>
        <View style={styles.actionButtonRight}>
          <OrgLikeButton />
        </View>
      </View>
      <View style={styles.social}>
        <OrgVKButton />
        <TouchableOpacity onPress={() => openUrl(TELEGRAM_BOT_URL)}>
          <Tg />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <ListButton
            style={styles.item}
            onPress={() => openUrl(JOBS_URL)}
            text="Вакансии"
          />
          <ListButton
            style={styles.item}
            onPress={() => openUrl(FRANCHISE_URL)}
            text="Франшиза"
          />
          <ListButton
            style={styles.item}
            onPress={() => openUrl(RIGHTS_URL)}
            text="Правовой раздел"
          />
          <ListButton
            style={styles.item}
            onPress={() => openUrl(CALORIES_URL)}
            text="Калорийность и состав"
          />
          <ListButton
            style={styles.item}
            onPress={() => openUrl(SECRET_GUEST_URL)}
            text="Стать тайным гостем"
          />
        </ScrollView>
        <View style={styles.versionWrapper}>
          <AppVersion />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  versionWrapper: {
    padding: 10,
    backgroundColor: COLORS.backgroundPrimary,
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    flex: 1,
  },
  actionButtonRight: {
    paddingLeft: 10,
    width: '50%',
  },
  actionButtonLeft: {
    paddingRight: 10,
    width: '50%',
  },
  imageWrapper: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50,
  },
  address: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    color: COLORS.main,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  item: {
    marginLeft: INDENTS.main,
    paddingRight: INDENTS.main,
  },
  social: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginTop: 30,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerActions: {
    paddingHorizontal: INDENTS.main,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerActionsButton: {
    width: '100%',
  },
});
