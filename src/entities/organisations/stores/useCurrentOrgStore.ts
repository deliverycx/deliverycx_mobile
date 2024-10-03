import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

type State = {
  orgId: string | null;
};

type Actions = {
  setOrgInfo: (orgId: string) => void;
  deleteOrgInfo: () => void;
};

export const useCurrentOrgStore = create<State & Actions>()(
  immer(
    persist(
      set => ({
        orgId: null,
        cityId: null,
        setOrgInfo: (orgId: string) => {
          set({
            orgId,
          });
        },
        deleteOrgInfo: () =>
          set({
            orgId: null,
          }),
      }),
      {
        name: 'current-org-store',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
