import sweetAlert from './sweetAlerts';

export const inputValidation = (): boolean => {
  let errors = '';
  const requiredInputs: HTMLCollection = document.getElementsByClassName('required');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < requiredInputs.length; i++) {
    const element: HTMLInputElement = requiredInputs[i] as HTMLInputElement;
    const { name, value, placeholder } = element;
    if (!value) {
      const label = document.getElementById(`${name}-label`);
      errors += `- O campo de <b>${
        placeholder || label?.textContent?.replaceAll(': *', '')
      }</b> é necessário! </br>`;
      element.classList.add('is-invalid');
    }
  }
  if (errors.length) sweetAlert('warn', 'Opss...', null, errors);
  return !errors.length;
};

export const clearError = (inputName: string): void => {
  const element = document.getElementsByName(inputName);
  if (element && element?.length) {
    if (element[0]?.classList?.length) element[0].classList.remove('is-invalid');
    else element[1].classList.remove('is-invalid');
  }
};
