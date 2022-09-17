/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import { useState, useCallback } from 'react';
import * as R from 'ramda';

type FormDataValue = string;

export interface FormData {
  [key: string]: FormDataValue;
}

export interface FormErrors {
  [key: string]: string[] | null | undefined;
}

export type OnChangeFormInput = (inputName: string) => (data: FormDataValue) => void;
type SetFormErrors = (errors: FormErrors) => void;
type SetFormData = <FormData>(newFormData: FormData) => void;
type IsFormValid = () => boolean;
type RunAllValidators = () => FormErrors;
type SetErrors = (dynamicErrors: FormErrors) => void;

export interface UseFormReturn {
  onChangeFormInput: OnChangeFormInput;
  resetForm: () => void;
  formData: FormData;
  formErrors: FormErrors;
  setFormErrors: SetFormErrors;
  setFormData: SetFormData;
  isFormValid: IsFormValid;
  runAllValidators: RunAllValidators;
  setErrors: SetErrors;
}

type Validator = (formValue: FormDataValue, formData: FormData) => boolean | string;

export type IndexedValidators = {
  [formDataName: string]: Validator[];
};

type Formatter = (formDataValue: FormDataValue) => FormDataValue;

type IndexedFormatters = {
  [formDataName: string]: Formatter;
};

export interface UseFormParameters {
  initialData?: FormData;
  validators?: IndexedValidators;
  formatters?: IndexedFormatters;
  initialErrors?: FormErrors;
}

const useForm = ({
  initialData = {},
  validators = {},
  formatters = {},
  initialErrors = {},
}: UseFormParameters): UseFormReturn => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors);

  const updateFormData = useCallback((data: any) => {
    setFormData(oldData => ({ ...oldData, ...data }));
  }, []);

  const onChangeFormInput: OnChangeFormInput =
    inputName =>
    (data: FormDataValue): void => {
      const inputValidators = R.propOr<void[], IndexedValidators, Validator[]>(
        [],
        inputName,
        validators,
      );

      const validatorsResult: boolean[] = inputValidators
        .map(validator => validator(data, formData))
        .map(Boolean)
        .filter(R.identity);

      if (validatorsResult.length > 0) {
        updateFormData({
          [inputName]: validatorsResult[0],
        });
      } else {
        setFormErrors({
          ...formErrors,
          [inputName]: null,
        });
      }

      const formatter = R.propOr<Formatter, IndexedFormatters, Formatter>(
        R.identity,
        inputName,
        formatters,
      );

      updateFormData({
        [inputName]: formatter(data),
      });
    };

  const runAllValidators: RunAllValidators = () => {
    const errors = Object.keys(validators).reduce((errs, validatorName) => {
      const inputValidators = R.propOr<void[], IndexedValidators, Validator[]>(
        [],
        validatorName,
        validators,
      );

      const data = formData[validatorName];
      const validatorsResult = inputValidators
        .map(validator => validator(data, formData))
        .filter(Boolean);

      const errorList = validatorsResult.length > 0 ? validatorsResult : null;

      return {
        ...errs,
        [validatorName]: errorList,
      };
    }, {});

    return errors;
  };

  const isFormValid: IsFormValid = () => {
    const formErrs = runAllValidators();
    setFormErrors(formErrs);

    const errors = Object.keys(formErrs)
      .map(key => formErrs[key])
      .filter(error => error);

    return errors.length < 1;
  };

  const setErrors: SetFormErrors = dynamicFormErrors => {
    const formErrs = runAllValidators();
    const newErrors = R.mergeDeepWith(
      (dynamicFormErrorsValue: any, formErrsValue: any) => {
        if (!dynamicFormErrorsValue && !formErrsValue) {
          return null;
        }
        return R.concat(dynamicFormErrorsValue || [], formErrsValue || []);
      },
      dynamicFormErrors,
      formErrs,
    );
    setFormErrors(newErrors);
  };

  const resetForm = (): void => {
    setFormData(initialData);
    setFormErrors(initialErrors);
  };

  return {
    onChangeFormInput,
    resetForm,
    formData,
    formErrors,
    setFormErrors,
    setFormData: updateFormData,
    isFormValid,
    runAllValidators,
    setErrors,
  };
};

export default useForm;
