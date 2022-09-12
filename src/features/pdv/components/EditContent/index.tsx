import React from 'react';
import { Col, Form, Row } from 'reactstrap';
import { InputText, Button } from '@/components';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPF } from '@/helpers/masks/cpf';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';

interface EditContentProps {
  data: any;
  onSubmit: (value: any) => void;
}

// eslint-disable-next-line no-shadow
enum FormInputName {
  document = 'document',
  zipcode = 'zipcode',
}

export const EditContent: React.FC<EditContentProps> = ({ data, onSubmit }) => {
  const { formData, formErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      document: data.document ?? '',
      zipcode: data.zipcode ?? '',
    },
    validators: {
      document: [validators.required, validators.cpf],
      zipcode: [validators.required, validators.cep],
    },
    formatters: {
      document: updateMaskCPF,
      zipcode: updateMaskCEP,
    },
  });

  const handleOnEdit = (): void => {
    if (isFormValid()) {
      const payload: any = {
        document: formData[FormInputName.document],
        zipcode: formData[FormInputName.zipcode],
      };
      onSubmit(payload);
    }
  };

  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
        handleOnEdit();
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

      <hr />

      <div className="d-flex justify-content-end">
        <Button title="Salvar" onClick={handleOnEdit} />
      </div>
    </Form>
  );
};
