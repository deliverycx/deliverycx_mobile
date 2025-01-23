type Organisation = {
  city: string;
  address: string;
};

export const getOrgFullAddress = (org: Organisation) => {
  return `${org.city}, ${org.address}`;
};
