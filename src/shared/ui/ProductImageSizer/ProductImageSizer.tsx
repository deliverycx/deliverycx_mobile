import React, {FC, useMemo} from 'react';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';

type Props = Omit<FastImageProps, 'source'> & {
  source?: Source;
};

const Image = createImageProgress(FastImage);

export const ProductImageSizer: FC<Props> = ({source, ...props}) => {
  const _source = useMemo(() => {
    if (!source) {
      return source;
    }

    const uri = source.uri?.split?.('/').at?.(-1);

    if (!uri) {
      return source;
    }

    return {
      ...source,
      url:
        'https://free-939700883.imgix.net/' +
        uri +
        '?w=500&h=500&q=100&fm=webp',
    };
  }, [source]);

  return <Image {...props} source={_source} />;
};
