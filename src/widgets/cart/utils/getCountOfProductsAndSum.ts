import {getLastDigit} from '../../../shared/utils/getLastDigit';
import {getLastTwoDigits} from '../../../shared/utils/getLastTwoDigits.ts';

export const getCountOfProductsAndSum = (
  cartCount: number,
  displayTotalSum: string,
) => {
  const lastDigit = getLastDigit(cartCount);
  const lastTwoDigits = getLastTwoDigits(cartCount);

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${cartCount} товаров на ${displayTotalSum}`;
  }

  if (lastDigit === 1) {
    return `${cartCount} товар на ${displayTotalSum}`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${cartCount} товара на ${displayTotalSum}`;
  }

  return `${cartCount} товаров на ${displayTotalSum}`;
};
