import sweetAlert from "./sweetAlerts";

export const inputValidation = () => {
  let errors = "";
  const requiredInputs = document.getElementsByClassName("required");
  for (const element of requiredInputs) {
    const { name, value, placeholder } = element;
    if (!value) {
      const label = document.getElementById(`${name}-label`);
      errors += `- O campo de <b>${
        placeholder || label?.textContent?.replaceAll(": *", "")
      }</b> é necessário! </br>`;
      element.classList.add("is-invalid");
    }
  }
  if (errors.length) sweetAlert("warn", "Opss...", null, 3000, errors);
  return !errors.length;
};

export const clearError = (inputName) => {
  const element = document.getElementsByName(inputName);
  if (element && element?.length) {
    if (element[0]?.classList?.length)
      element[0].classList.remove("is-invalid");
    else element[1].classList.remove("is-invalid");
  }
};
