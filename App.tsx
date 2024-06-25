import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Routes} from './src/shared/routes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Cities, screenOptions as citiesScreenOptions} from './src/pages/cities';
import {
  Organisations,
  screenOptions as organisationsScreenOptions,
} from './src/pages/organisations';
import {Cart, screenOptions as cartScreenOptions} from './src/pages/cart';
import {
  Profile,
  screenOptions as profileScreenOptions,
} from './src/pages/profile';
import {
  Contacts,
  screenOptions as contactsScreenOptions,
} from './src/pages/contacts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Menu, screenOptions as menuScreenOptions} from './src/pages/menu';
import {useCurrentOrgIds} from './src/features/organisations';
import {screenOptions as tabNavigatorOptions} from './src/shared/configs/menuScreenOptions';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  const currentOrgId = useCurrentOrgIds(state => state.orgId);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            {currentOrgId ? (
              <Tab.Navigator screenOptions={tabNavigatorOptions}>
                <Tab.Screen
                  name={Routes.Menu}
                  options={menuScreenOptions}
                  component={Menu}
                />
                {/*<Tab.Screen*/}
                {/*  options={profileScreenOptions}*/}
                {/*  name={Routes.Profile}*/}
                {/*  component={Profile}*/}
                {/*/>*/}
                <Tab.Screen
                  options={contactsScreenOptions}
                  name={Routes.Contacts}
                  component={Contacts}
                />
                <Tab.Screen
                  options={cartScreenOptions}
                  name={Routes.Cart}
                  component={Cart}
                />
              </Tab.Navigator>
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
