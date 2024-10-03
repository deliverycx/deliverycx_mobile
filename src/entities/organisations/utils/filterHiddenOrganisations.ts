import {OrganisationsResponseModel} from '../types/organisationsTypes';

export const filterHiddenOrganisations = (data: OrganisationsResponseModel) => {
  return data.filter(({isHidden}) => !isHidden);
};
