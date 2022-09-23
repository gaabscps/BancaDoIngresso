// function convert 'true' or 'false' to boolean
export const convertToBoolean = (value: string): boolean => {
  if (value === 'true') {
    return true;
  }
  return false;
};
