import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type State = {
  orgId: string | null;
  cityId: string | null;
};

type Actions = {
  setOrgInfo: (cityId: string, orgId: string) => void;
  deleteOrgInfo: () => void;
};

export const useCurrentOrgStore = create<State & Actions>()(
  immer(set => ({
    orgId: null,
    cityId: null,
    setOrgInfo: (cityId: string, orgId: string) => {
      set({
        cityId,
        orgId,
      });
    },
    deleteOrgInfo: () =>
      set({
        orgId: null,
        cityId: null,
      }),
  })),
);
