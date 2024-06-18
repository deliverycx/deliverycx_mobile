import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Routes} from './src/shared/routes';
import {Cities, screenOptions as citiesScreenOptions} from './src/pages/cities';
import {
  Organisations,
  screenOptions as organisationsScreenOptions,
} from './src/pages/organisations';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        </NavigationContainer>
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
