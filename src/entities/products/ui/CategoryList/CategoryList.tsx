import React, {forwardRef} from 'react';
import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Chip} from '../../../../shared/ui/Сhip';
import {COLORS} from '../../../../shared/styles';
import {MAIN_INDENT} from '../../../../shared/styles/indents';
import {Category} from '../../types/productsTypes';

interface Props {
  shadow?: boolean;
  data: Category[];
  visibleCategoryId: string | null;
  onItemPress: (nextVisibleCategoryId: string) => void;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_MARGIN = 10;

export const CategoryList = forwardRef<FlatList, Props>(
  (
    {data, style, visibleCategoryId, onItemPress, shadow = false},
    forwardedRef,
  ) => {
    const getMargin = (index: number) => {
      if (index === 0) {
        return {
          marginLeft: MAIN_INDENT,
          marginRight: DEFAULT_MARGIN,
        };
      } else if (index === data.length - 1) {
        return {
          marginRight: MAIN_INDENT,
        };
      }

      return {
        marginRight: DEFAULT_MARGIN,
      };
    };

    return (
      <View style={[styles.wrapper, styles.shadow, style]}>
        <FlatList
          ref={forwardedRef}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={data}
          renderItem={({item, index}) => (
            <Chip
              onPress={() => {
                onItemPress(item.id);
              }}
              variant={visibleCategoryId === item.id ? 'secondary' : 'primary'}
              text={item.name}
              style={[getMargin(index)]}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 8,
    backgroundColor: COLORS.backgroundPrimary,
    zIndex: 999,
  },
  shadow: {
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
});
