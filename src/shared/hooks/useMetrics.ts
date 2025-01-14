import {useCallback, useEffect} from 'react';
import {NativeModules, Platform} from 'react-native';

const {YandexMetrica} = NativeModules;

export const enum METRICS_EVENTS {
  CHANGE_CART = 'CHANGE_CART',
  CHOOSE_CITY = 'CHOOSE_CITY',
  CHOOSE_ORG = 'CHOOSE_ORG',
  CALL_ORG = 'CALL_ORG',
  PRESS_GOOD_PAGE = 'PRESS_GOOD_PAGE',
  LEAVE_ORG = 'LEAVE_ORG',
  PRESS_CATALOG_BUTTON = 'PRESS_CATALOG_BUTTON',
  OPEN_PRODUCT_PREVIEW = 'OPEN_PRODUCT_PREVIEW',
  OPEN_CONTACTS_PAGE = 'OPEN_CONTACTS_PAGE',
  DISLIKE_ORG = 'DISLIKE_ORG',
  LIKE_ORG = 'LIKE_ORG',
  OPEN_HISTORY_PAGE = 'OPEN_HISTORY_PAGE',
  OPEN_CART_PAGE = 'OPEN_CART_PAGE',
  CHANGE_CUTLERY = 'CHANGE_CUTLERY',
  SHOW_ORDER_TIME_PICKER = 'SHOW_ORDER_TIME_PICKER',
  ORDER_COMMENTS_BLUR = 'ORDER_COMMENTS_BLUR',
  CHANGE_ORDER_DELIVERY = 'CHANGE_ORDER_DELIVERY',
  PRESS_DELIVERY_ADDRESS = 'PRESS_CHOOSE_DELIVERY_ADDRESS',
  CHANGE_PAYMENT_METHOD = 'CHANGE_PAYMENT_METHOD',
  OPEN_ORDER_STATUS_PAGE = 'OPEN_ORDER_STATUS_PAGE',
  REVIEW_ORDER = 'REVIEW_ORDER',
}

type ChangeCartData = {
  source: 'menu' | 'detail' | 'cart';
};

type ChooseCityData = {
  city: string;
};

type ChooseOrgData = {
  address: string;
};

type CallOrgData = {
  address: string;
  source: 'preview' | 'menu' | 'contacts';
};

type PressGoodPlaceData = {
  address: string;
};

type LeaveOrgData = {
  address: string;
};

type DislikeOrgData = {
  address: string;
};

type LikeOrgData = {
  address: string;
};

type ChangeOrderDeliveryData = {
  delivery: 'pickup' | 'courier';
};

type ChangePaymentMethodData = {
  paymentMethod: string;
};

const sendEvent = (
  eventName: METRICS_EVENTS,
  data?: Record<string, number | string | boolean>,
) => {
  return YandexMetrica.sendEvent(eventName, {
    ...data,
    platform: Platform.OS,
  });
};

export const useMetrics = () => {
  const changeCart = useCallback((data: ChangeCartData) => {
    sendEvent(METRICS_EVENTS.CHANGE_CART, data);
  }, []);

  const chooseCity = useCallback((data: ChooseCityData) => {
    sendEvent(METRICS_EVENTS.CHOOSE_CITY, data);
  }, []);

  const chooseOrg = useCallback((data: ChooseOrgData) => {
    sendEvent(METRICS_EVENTS.CHOOSE_ORG, data);
  }, []);

  const callOrg = useCallback((data: CallOrgData) => {
    sendEvent(METRICS_EVENTS.CALL_ORG, data);
  }, []);

  const pressGoodPlace = useCallback((data: PressGoodPlaceData) => {
    sendEvent(METRICS_EVENTS.PRESS_GOOD_PAGE, data);
  }, []);

  const leaveOrg = useCallback((data: LeaveOrgData) => {
    sendEvent(METRICS_EVENTS.LEAVE_ORG, data);
  }, []);

  const pressCatalogButton = useCallback(() => {
    sendEvent(METRICS_EVENTS.PRESS_CATALOG_BUTTON);
  }, []);

  const dislikeOrg = useCallback((data: DislikeOrgData) => {
    sendEvent(METRICS_EVENTS.DISLIKE_ORG, data);
  }, []);

  const likeOrg = useCallback((data: LikeOrgData) => {
    sendEvent(METRICS_EVENTS.LIKE_ORG, data);
  }, []);

  const changeCutlery = useCallback(() => {
    sendEvent(METRICS_EVENTS.CHANGE_CUTLERY);
  }, []);

  const showOrderTimePicker = useCallback(() => {
    sendEvent(METRICS_EVENTS.SHOW_ORDER_TIME_PICKER);
  }, []);

  const orderCommentsBlur = useCallback(() => {
    sendEvent(METRICS_EVENTS.ORDER_COMMENTS_BLUR);
  }, []);

  const changeOrderDelivery = useCallback((data: ChangeOrderDeliveryData) => {
    sendEvent(METRICS_EVENTS.CHANGE_ORDER_DELIVERY, data);
  }, []);

  const pressDeliveryAddress = useCallback(() => {
    sendEvent(METRICS_EVENTS.PRESS_DELIVERY_ADDRESS);
  }, []);

  const changePaymentMethod = useCallback((data: ChangePaymentMethodData) => {
    sendEvent(METRICS_EVENTS.CHANGE_PAYMENT_METHOD, data);
  }, []);

  const reviewOrder = useCallback(() => {
    sendEvent(METRICS_EVENTS.REVIEW_ORDER);
  }, []);

  return {
    changeCart,
    chooseCity,
    chooseOrg,
    callOrg,
    pressGoodPlace,
    leaveOrg,
    pressCatalogButton,
    dislikeOrg,
    likeOrg,
    changeCutlery,
    showOrderTimePicker,
    orderCommentsBlur,
    changeOrderDelivery,
    pressDeliveryAddress,
    changePaymentMethod,
    reviewOrder,
  };
};

export const useMetricsMount = (eventName: METRICS_EVENTS) => {
  useEffect(() => {
    sendEvent(eventName);
  }, [eventName]);
};
