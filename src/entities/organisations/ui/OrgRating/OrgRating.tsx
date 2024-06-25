import React, {FC} from 'react';
import {WebView} from 'react-native-webview';
import {Linking, StyleSheet} from 'react-native';
import {useOrgYaPlaceQuery} from '../../queries/orgYaPlaceQueries.ts';

type Props = {
  orgId: string;
};

export const OrgRating: FC<Props> = ({orgId}) => {
  const {data} = useOrgYaPlaceQuery({organization: orgId});

  if (!data) {
    return null;
  }

  return (
    <WebView
      scrollEnabled={false}
      style={styles.rating}
      source={{
        uri: `https://yandex.ru/sprav/widget/rating-badge/${data.goodplaceid}?type=award`,
      }}
      onOpenWindow={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        const {targetUrl} = nativeEvent;
        Linking.openURL(targetUrl);
      }}
    />
  );
};

const styles = StyleSheet.create({
  rating: {
    width: 150,
    height: 32,
    borderRadius: 4,
    marginVertical: 6,
  },
});
