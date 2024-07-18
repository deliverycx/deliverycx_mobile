import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {immer} from 'zustand/middleware/immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import {User} from '../types/userTypes';

type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User) => void;
};

export const useUserStore = create<State & Actions>()(
  immer(
    persist(
      set => ({
        user: null,
        setUser: (user: User) => {
          set({
            user,
          });
        },
      }),
      {
        name: 'user-store',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
