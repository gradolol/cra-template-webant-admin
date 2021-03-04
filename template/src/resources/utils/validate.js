import isEmpty from "./isEmpty";

const validate = (values, translate, poles) => {
  const errors = {};
  const passMinLength = 8;
  const phoneMinLength = 6;
  const phoneMaxLength = 15;
  const RegExp = /^[a-zA-Z0-9][a-zA-Z0-9_\-.]+@[a-zA-Z0-9]+(.[a-zA-Z]+)+$/g;

  poles.forEach((key) => {
    switch (key) {
      case "phone":
        const isCorrectPhone = !!(
          +values[key] &&
          values[key]?.length >= phoneMinLength &&
          phoneMaxLength >= values[key]?.length
        );
        if (!isCorrectPhone)
          errors[key] = translate("ra.validation.phone", {
            min: phoneMinLength,
            max: phoneMaxLength,
          });
        break;
      case "email":
        if (!RegExp.test(values[key]))
          errors[key] = translate("ra.validation.email");
        break;
      case "plainPassword":
        if (values[key]?.length < passMinLength)
          errors[key] = translate("ra.validation.minLength", {
            min: passMinLength,
          });
      default:
        break;
    }
    if (isEmpty(values[key])) errors[key] = translate("ra.validation.required");
  });
  return errors;
};

export default validate;
