export const deleteFalseFromArr = <T extends unknown>(arr: T[]) => {
  return arr.filter((item) => item !== false);
};
