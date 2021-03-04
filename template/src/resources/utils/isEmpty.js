export default (value) => {
  if (value) {
    switch (typeof value) {
      case "string":
        return !value?.trim().length;
      case "number":
        return !value?.length;
      default:
        return !value.getTime();
    }
  } else return true;
};
