import React from 'react';
import {StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
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
import {Menu, screenOptions as menuScreenOptions} from './src/pages/menu';
import {Cart} from './src/pages/cart';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useCurrentOrg} from './src/features/organisations';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  const currentOrgId = useCurrentOrg(state => state.orgId);

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            {currentOrgId ? (
              <Tab.Navigator screenOptions={menuScreenOptions}>
                <Tab.Screen name={Routes.Menu} component={Menu} />
                <Tab.Screen name={Routes.Cart} component={Cart} />
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
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});

export default App;
