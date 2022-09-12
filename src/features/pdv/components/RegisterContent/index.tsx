import React from 'react';
import { Col, Form, Row } from 'reactstrap';
import { InputText } from '@/components';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPF } from '@/helpers/masks/cpf';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';

interface RegisterContentProps {
  onSubmit: (value: boolean) => boolean;
}

// eslint-disable-next-line no-shadow
enum FormInputName {
  document = 'document',
  zipcode = 'zipcode',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({ onSubmit }) => {
  const { formData, formErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      document: '',
      zipcode: '',
    },
    validators: {
      document: [validators.required],
      zipcode: [validators.required, validators.cep],
    },
    formatters: {
      document: updateMaskCPF,
      zipcode: updateMaskCEP,
    },
  });

  const handleOnRegister = (): void => {
    onSubmit(isFormValid());
  };

  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
        handleOnRegister();
      }}
    >
      <Row>
        <Col>
          <InputText
            name="document"
            label="CPF"
            placeholder="000.000.000-00"
            maxLength={14}
            value={formData[FormInputName.document]}
            onChange={e => onChangeFormInput(FormInputName.document)(e.target.value)}
            error={formErrors.document && formErrors.document[0]}
          />
        </Col>

        <Col>
          <InputText
            name="zipcode"
            label="CEP"
            placeholder="00000-000"
            maxLength={9}
            value={formData[FormInputName.zipcode]}
            onChange={e => onChangeFormInput(FormInputName.zipcode)(e.target.value)}
            error={formErrors.zipcode && formErrors.zipcode[0]}
          />
        </Col>
      </Row>
    </Form>
  );
};
