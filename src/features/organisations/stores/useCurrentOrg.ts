import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type State = {
  orgId: string | null;
};

type Actions = {
  setOrgId: (id: string) => void;
  deleteOrgId: () => void;
};

export const useCurrentOrg = create<State & Actions>()(
  immer(set => ({
    orgId: null,
    setOrgId: (id: string) => {
      set({
        orgId: id,
      });
    },
    deleteOrgId: () =>
      set({
        orgId: null,
      }),
  })),
);
