const UNAVAILABLE_ORG_IDS: string[] = [
  '648961769f4011233bbbda7c',
  '64412f23323c491a61c079e7',
  '67b48c5ca77efbab40c55597',
];

export const isOrgApiAvailable = (orgId: string) => {
  return !UNAVAILABLE_ORG_IDS.includes(orgId);
};
