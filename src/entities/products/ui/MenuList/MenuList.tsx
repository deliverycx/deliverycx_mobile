import React, {FC, useRef} from 'react';
import {
  Insets,
  SectionList,
  View,
  StyleSheet,
  ViewToken,
  FlatList,
  Text,
  VirtualizedList,
} from 'react-native';
import {ProductPreviewCard} from '../ProductPreviewCard';
import {useSectionProducts} from '../../hooks/useSectionProducts';
import {useProductsQuery} from '../../queries/productsQueries';
import {CategoryList} from '../CategoryList';
import {useCategoryList} from '../../hooks/useCategoryList.ts';
import {useSyncList} from '../../hooks/useSyncList.ts';
import {Container} from '../../../../shared/ui/Container';
import {INDENTS} from '../../../../shared/styles.ts';

type Props = {
  orgId: string;
  contentInset?: Insets;
  scrollIndicatorInsets?: Insets;
};

const SHIFT = INDENTS.main / 2;

export const MenuList: FC<Props> = ({
  orgId,
  contentInset,
  scrollIndicatorInsets,
}) => {
  const {data} = useProductsQuery({organization: orgId});

  const sectionProducts = useSectionProducts(data);

  const {
    menuListRef,
    categoryListRef,
    setMenuListCategoryId,
    setCategoryListCategoryId,
    visibleCategoryId,
  } = useSyncList(sectionProducts, data.categoryes);

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
      const headerHeight = 52;
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
    <View style={styles.wrapper}>
      <CategoryList
        ref={categoryListRef}
        style={styles.categoryList}
        data={data.categoryes}
        visibleCategoryId={visibleCategoryId}
        onItemPress={setCategoryListCategoryId}
      />
      <VirtualizedList
        getItemLayout={getItemLayout}
        ref={menuListRef}
        data={sectionProducts}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        contentInset={contentInset}
        getItemCount={itemData => itemData.length}
        getItem={(itemData, index) => itemData[index]}
        scrollIndicatorInsets={scrollIndicatorInsets}
        onEndReached={handleEndReached}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({
          item,
        }: {
          item: (typeof sectionProducts)[number];
          index: number;
        }) => (
          <View key={item.title} style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.itemsList}>
              {item.data.map(product => (
                <View style={styles.productPreviewCard} key={product.id}>
                  <ProductPreviewCard data={product} />
                </View>
              ))}
            </View>
          </View>
        )}
      />
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
  },

  // productPreviewCardLeft: {
  //   paddingLeft: INDENTS.main,
  //   paddingRight: SHIFT,
  // },
  // productPreviewCardRight: {
  //   paddingRight: INDENTS.main,
  //   paddingLeft: SHIFT,
  // },

  // itemsList: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
});

// <View
//   style={[
//     styles.productPreviewCard,
//     index % 2 === 0
//       ? styles.productPreviewCardLeft
//       : styles.productPreviewCardRight,
//   ]}>
//   <ProductPreviewCard key={index} data={item} />
// </View>
