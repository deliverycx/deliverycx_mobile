import {useEffect, useRef, useState} from 'react';
import {FlatList, VirtualizedList} from 'react-native';
import {Category, Product} from '../types/productsTypes';

type SectionProduct = {
  title: string;
  data: Product[];
  id: string;
};

const CATEGORY_LIST_SCROLL_MS = 500;

export const useSyncList = (
  menuList: SectionProduct[],
  categoryList: Category[],
) => {
  const [visibleCategoryId, setVisibleCategoryId] = useState<string | null>(
    null,
  );
  const isCategoryListScrollingRef = useRef(false);

  const timerIdRef = useRef<NodeJS.Timeout>();

  const menuMapRef = useRef<Record<string, number>>({});
  const categoryMapRef = useRef<Record<string, number>>({});

  const menuListRef = useRef<VirtualizedList<SectionProduct> | null>(null);
  const categoryListRef = useRef<FlatList | null>(null);

  useEffect(() => () => clearTimeout(timerIdRef.current), []);

  useEffect(() => {
    const obj: Record<string, number> = {};

    menuList.forEach((item, index) => {
      obj[item.id] = index;
    });

    menuMapRef.current = obj;
  }, [menuList]);

  useEffect(() => {
    const obj: Record<string, number> = {};

    categoryList.forEach((item, index) => {
      obj[item.id] = index;
    });

    categoryMapRef.current = obj;
  }, [categoryList]);

  return {
    visibleCategoryId,
    menuListRef,
    categoryListRef,
    setMenuListCategoryId: (categoryId: string) => {
      if (!categoryId || isCategoryListScrollingRef.current) {
        return;
      }

      setVisibleCategoryId(currentCategoryId => {
        if (currentCategoryId === categoryId) {
          return currentCategoryId;
        }

        categoryListRef.current?.scrollToIndex({
          index: categoryMapRef.current[categoryId],
          viewPosition: 0.5,
        });

        return categoryId;
      });
    },
    setCategoryListCategoryId: (categoryId: string) => {
      isCategoryListScrollingRef.current = true;

      setVisibleCategoryId(categoryId);

      categoryListRef.current?.scrollToIndex({
        index: categoryMapRef.current[categoryId],
        viewPosition: 0.5,
      });

      menuListRef.current?.scrollToIndex({
        index: menuMapRef.current[categoryId],
      });

      timerIdRef.current = setTimeout(() => {
        isCategoryListScrollingRef.current = false;
      }, CATEGORY_LIST_SCROLL_MS);
    },
  };
};
