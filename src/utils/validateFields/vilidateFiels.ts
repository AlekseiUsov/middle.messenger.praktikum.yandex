import { formFiels, TFormValues } from "../../types/formFiels";

const formatInputName = (name: string) => {
  const result = [];
  const arr = name.split("_");
  for (const el of arr) {
    const formatedName = el.charAt(0).toUpperCase() + el.slice(1);
    result.push(formatedName);
  }
  return result.join("");
};

export const validateForm = (element: HTMLElement) => {
  const errors: formFiels[] = [];
  const fieldsInput = element.querySelectorAll("input");
  for (const input of fieldsInput) {
    const regEx = new RegExp(input.pattern);
    if (!regEx.test(input.value)) {
      const nameChild = formatInputName(input.name) as formFiels;
      errors.push(nameChild);
    }
  }
  return errors;
};

export const getFormValues = (element: HTMLElement) => {
  const formValues: TFormValues = {};
  const fieldsInput = element.querySelectorAll("input");
  for (const input of fieldsInput) {
    formValues[input.name as formFiels] = input.value;
  }
  console.log(formValues);
  return formValues;
};
