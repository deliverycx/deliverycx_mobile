import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
  );
};

export default App;
