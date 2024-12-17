import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Orientation from 'react-native-orientation-locker';
import SplashScreen from 'react-native-splash-screen';
import {Providers} from './Providers';
import {Cities, screenOptions as citiesScreenOptions} from './src/pages/cities';
import {
  Organisations,
  screenOptions as organisationsScreenOptions,
} from './src/pages/organisations';
import {Routes, STACK_NAVIGATOR_OPTIONS} from './src/shared/routes';

import {Appearance} from 'react-native';
import {YaMap} from 'react-native-yamap';
import {
  Address,
  screenOptions as addressScreenOptions,
} from './src/pages/address';
import {Cart, ScreenOptions as CartScreenOptions} from './src/pages/cart';
import {
  Contacts,
  ScreenOptions as ContactsScreenOptions,
} from './src/pages/contacts';
import {Menu, ScreenOptions as MenuScreenOptions} from './src/pages/menu';
import {Order, screenOptions as orderScreenOptions} from './src/pages/order';
import {
  OrderHistory,
  screenOptions as orderHistoryScreenOptions,
} from './src/pages/orderHistory';
import {
  OrderStatus,
  screenOptions as orderStatusScreenOptions,
} from './src/pages/orderStatus';
import {
  PaymentList,
  screenOptions as paymentScreenOptions,
} from './src/pages/payment';
import {
  StreetsList,
  screenOptions as streetsScreenOptions,
} from './src/pages/streets';
import {screenOptions as tabNavigatorOptions} from './src/shared/configs/menuScreenOptions';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

YaMap.init('9319733b-bbba-48e7-af52-8410be35c07d');

const TabScreens = () => {
  return (
    <Tab.Navigator screenOptions={tabNavigatorOptions}>
      <Tab.Screen
        name={Routes.Menu}
        options={MenuScreenOptions}
        component={Menu}
      />
      <Tab.Screen
        options={ContactsScreenOptions}
        name={Routes.Contacts}
        component={Contacts}
      />
      <Tab.Screen
        options={orderHistoryScreenOptions}
        name={Routes.OrderHistory}
        component={OrderHistory}
      />
      <Tab.Screen
        options={CartScreenOptions}
        name={Routes.Cart}
        component={Cart}
      />
    </Tab.Navigator>
  );
};

const OrganisationsScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={STACK_NAVIGATOR_OPTIONS}
      initialRouteName={Routes.Cities}>
      <Stack.Screen
        options={citiesScreenOptions}
        name={Routes.Cities}
        component={Cities}
      />
      <Stack.Screen
        options={organisationsScreenOptions}
        name={Routes.Organisations}
        component={Organisations}
      />
    </Stack.Navigator>
  );
};

const App = (): React.JSX.Element => {
  useEffect(() => {
    SplashScreen.hide();

    Orientation.lockToPortrait();
    Appearance.setColorScheme('light');
  }, []);

  return (
    <Providers
      organisationsSlot={<OrganisationsScreens />}
      homeSlot={
        <Stack.Navigator
          screenOptions={STACK_NAVIGATOR_OPTIONS}
          initialRouteName={Routes.TabScreens}>
          <Stack.Screen
            options={{headerShown: false}}
            name={Routes.TabScreens}
            component={TabScreens}
          />
          <Stack.Screen
            name={Routes.Order}
            options={orderScreenOptions}
            component={Order}
          />
          <Stack.Screen
            options={addressScreenOptions}
            name={Routes.Address}
            component={Address}
          />
          <Stack.Screen
            options={paymentScreenOptions}
            name={Routes.Payment}
            component={PaymentList}
          />
          <Stack.Screen
            options={streetsScreenOptions}
            name={Routes.Streets}
            component={StreetsList}
          />
          <Stack.Screen
            options={orderStatusScreenOptions}
            name={Routes.OrderStatus}
            component={OrderStatus}
          />
        </Stack.Navigator>
      }
    />
  );
};

export default App;
