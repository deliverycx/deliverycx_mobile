import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {FC, ReactNode} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {CartStateManager} from './src/entities/cart';
import {OrderFormProvider} from './src/entities/order';
import {
  OrgAlertsProvider,
  OrgAlertsSubscriber,
  useCurrentOrgStore,
} from './src/entities/organisations';
import {CreateUserManager, useUserStore} from './src/entities/user';
import {NetworkError} from './src/pages/network';
import {linking} from './src/shared/configs/linking';
import {useIsConnected} from './src/shared/hooks/useIsConnected.ts';
import {ToastProvider} from './src/shared/providers/ToastProvider';
import {AddressFormProvider} from './src/widgets/address';
import {OrderPaymentMethodValidator} from './src/widgets/order';

type Props = {
  organisationsSlot: ReactNode;
  homeSlot: ReactNode;
};

const queryClient = new QueryClient();

export const Providers: FC<Props> = ({organisationsSlot, homeSlot}) => {
  const {isConnected, fetchNetInfo} = useIsConnected();

  const currentOrgId = useCurrentOrgStore(state => state.orgId);
  const userId = useUserStore(state => state.user?.id);

  const isHomeSlotShown = !!(currentOrgId && userId);

  const isNetworkErrorShown = isConnected === false;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {isNetworkErrorShown ? (
        <NetworkError queryClient={queryClient} onRefetch={fetchNetInfo} />
      ) : (
        <>
          <CreateUserManager />
          <GestureHandlerRootView style={styles.gestureHandlerRootView}>
            <BottomSheetModalProvider>
              <OrgAlertsProvider>
                <NavigationContainer linking={linking}>
                  {isHomeSlotShown ? (
                    <>
                      <OrgAlertsSubscriber orgId={currentOrgId}>
                        <CartStateManager orgId={currentOrgId} userId={userId}>
                          <OrderFormProvider>
                            <OrderPaymentMethodValidator />
                            <AddressFormProvider>
                              {homeSlot}
                            </AddressFormProvider>
                          </OrderFormProvider>
                        </CartStateManager>
                      </OrgAlertsSubscriber>
                    </>
                  ) : (
                    organisationsSlot
                  )}
                </NavigationContainer>
              </OrgAlertsProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
          <ToastProvider />
        </>
      )}
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
