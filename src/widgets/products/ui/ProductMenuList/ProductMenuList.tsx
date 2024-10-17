import React, {FC, useRef} from 'react';
import {
  Insets,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewToken,
  VirtualizedList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CategoryList, useProducts} from '../../../../entities/products';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {useSectionProducts} from '../../hooks/useSectionProducts';
import {useSyncList} from '../../hooks/useSyncList';
import {ProductCategorySkeleton} from '../ProductCategorySkeleton';
import {ProductPreviewCard} from '../ProductPreviewCard';
import {ProductsSkeleton} from '../ProductsSkeleton';

type Props = {
  orgId: string;
  contentInset?: Insets;
  scrollIndicatorInsets?: Insets;
};

const SHIFT = INDENTS.main / 2;

export const ProductMenuList: FC<Props> = ({
  orgId,
  contentInset,
  scrollIndicatorInsets,
}) => {
  const {products, categories, isFetched} = useProducts(orgId);

  const sectionProducts = useSectionProducts(products, categories);

  const {
    menuListRef,
    categoryListRef,
    setMenuListCategoryId,
    setCategoryListCategoryId,
    visibleCategoryId,
  } = useSyncList(sectionProducts, categories);

  const viewabilityConfigCallbackPairs = useRef([
    {
      onViewableItemsChanged: ({
        viewableItems,
      }: {
        viewableItems: ViewToken[];
      }) => {
        if (!viewableItems.length) {
          return;
        }

        setMenuListCategoryId(viewableItems.at(0)!.item.id ?? null);
      },
      viewabilityConfig: {
        itemVisiblePercentThreshold: 0,
      },
    },
  ]);

  const getItemLayout = (item: typeof sectionProducts, index: number) => {
    const getItemHeight = (d: (typeof sectionProducts)[number]) => {
      const headerHeight = 54;
      const elemHeight = 290;

      return Math.ceil(d.data.length / 2) * elemHeight + headerHeight;
    };

    const offset = item.slice(0, index).reduce((acc, cur) => {
      return acc + getItemHeight(cur);
    }, 0);

    return {
      length: getItemHeight(item[index]),
      offset: offset,
      index,
    };
  };

  const handleEndReached = () => {
    setMenuListCategoryId(sectionProducts.at(-1)!.id);
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: Platform.select({
            android: contentInset?.bottom,
            ios: 0,
          }),
        },
      ]}>
      {isFetched ? (
        <CategoryList
          ref={categoryListRef}
          style={styles.categoryList}
          data={categories}
          visibleCategoryId={visibleCategoryId}
          onItemPress={setCategoryListCategoryId}
        />
      ) : (
        <ProductCategorySkeleton />
      )}
      {isFetched ? (
        <VirtualizedList
          getItemLayout={getItemLayout}
          ref={menuListRef}
          data={sectionProducts}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          contentInset={contentInset}
          getItemCount={itemData => itemData.length}
          getItem={(itemData, index) => itemData[index]}
          scrollIndicatorInsets={scrollIndicatorInsets}
          onEndReached={handleEndReached}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({
            item,
            index,
          }: {
            item: (typeof sectionProducts)[number];
            index: number;
          }) => (
            <View key={item.title} style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.itemsList}>
                {item.data.map(product => (
                  <View style={styles.productPreviewCard} key={product.id}>
                    <ProductPreviewCard
                      data={product}
                      imagePriority={
                        index === 0
                          ? FastImage.priority.high
                          : FastImage.priority.normal
                      }
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        />
      ) : (
        <ProductsSkeleton />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  categoryList: {
    paddingVertical: 10,
  },
  itemsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productPreviewCard: {
    padding: SHIFT,
    width: '50%',
  },
  item: {
    paddingHorizontal: SHIFT,
  },
  title: {
    padding: SHIFT,
    paddingTop: INDENTS.main,
    fontSize: 18,
    fontWeight: '500',
    minHeight: 54,
    color: COLORS.textPrimary,
  },
});
