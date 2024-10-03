import React, {FC, useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {WebView} from 'react-native-webview';
import {useOrgYaPlaceQuery} from '../../queries/orgYaPlaceQueries.ts';

type Props = {
  orgId: string;
};

export const OrgRating: FC<Props> = ({orgId}) => {
  const [isWebviewLoaded, setIsWebviewLoaded] = useState(false);
  const {data} = useOrgYaPlaceQuery({organization: orgId});

  return (
    <View style={styles.wrapper}>
      {!isWebviewLoaded && (
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={[styles.rating, styles.skeleton]}
        />
      )}
      {data?.goodplaceid && (
        <WebView
          onLoadEnd={() => setIsWebviewLoaded(true)}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: 150,
    height: 32,
    marginVertical: 6,
  },
  rating: {
    borderRadius: 4,
  },
  skeleton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
});
