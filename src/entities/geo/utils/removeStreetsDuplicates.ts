import {Street} from '../../../entities/geo';

export const removeStreetsDuplicates = (streets: Street[]) => {
  return streets.filter(
    (obj, index, self) =>
      index === self.findIndex(o => obj.classifierId === o.classifierId),
  );
};
