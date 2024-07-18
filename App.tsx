import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Routes} from './src/shared/routes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Cities, screenOptions as citiesScreenOptions} from './src/pages/cities';
import {CreateUserManager} from './src/entities/user';
import {
  Organisations,
  screenOptions as organisationsScreenOptions,
} from './src/pages/organisations';
import {Cart, ScreenOptions as CartScreenOptions} from './src/pages/cart';
import {
  Contacts,
  screenOptions as contactsScreenOptions,
} from './src/pages/contacts';
import {Menu, screenOptions as menuScreenOptions} from './src/pages/menu';
import {
  OrgStatusAlertsProvider,
  OrgStatusAlerts,
  useCurrentOrgStore,
} from './src/entities/organisations';
import {screenOptions as tabNavigatorOptions} from './src/shared/configs/menuScreenOptions';
import {CartStateManager} from './src/entities/cart';
import {useUserStore} from './src/entities/user/stores/useUserStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  const currentOrgId = useCurrentOrgStore(state => state.orgId);
  const currentCityId = useCurrentOrgStore(state => state.cityId);
  const userId = useUserStore(state => state.user?.id);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CreateUserManager />
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <BottomSheetModalProvider>
          <OrgStatusAlertsProvider>
            <NavigationContainer>
              {currentOrgId && userId ? (
                <CartStateManager orgId={currentOrgId} userId={userId}>
                  <OrgStatusAlerts orgId={currentOrgId} cityId={currentCityId!}>
                    <Tab.Navigator screenOptions={tabNavigatorOptions}>
                      <Tab.Screen
                        name={Routes.Menu}
                        options={menuScreenOptions}
                        component={Menu}
                      />
                      <Tab.Screen
                        options={contactsScreenOptions}
                        name={Routes.Contacts}
                        component={Contacts}
                      />
                      <Tab.Screen
                        options={CartScreenOptions}
                        name={Routes.Cart}
                        component={Cart}
                      />
                    </Tab.Navigator>
                  </OrgStatusAlerts>
                </CartStateManager>
              ) : (
                <Stack.Navigator initialRouteName={Routes.Cities}>
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
              )}
            </NavigationContainer>
          </OrgStatusAlertsProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});

export default App;
