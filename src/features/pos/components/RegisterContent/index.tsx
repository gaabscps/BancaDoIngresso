import React from 'react';
import { Col, Form, Row } from 'reactstrap';
import { InputText, Button } from '@/components';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskCEP, isValid as isValidCEP } from '@/helpers/masks/cep';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import SelectAutoComplete from '@/components/Select';
import ButtonGroup from '@/components/ButtonGroup';
import cep from 'cep-promise';
import Pos from '@/model/Pos';

interface RegisterContentProps {
  document?: string;
  onSubmit: (value: any) => void;
  dataList?: Pos;
}

// eslint-disable-next-line no-shadow
enum FormInputName {
  name = 'name',
  serialNumber = 'serialNumber',
  status = 'status',
  expirationDate = 'expirationDate',
  pdv = 'pdv',
  model = 'model',
  telephoneOperator = 'telephoneOperator',
  cardOperator = 'cardOperator',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  document,
  onSubmit,
  dataList,
}) => {
  const { formData, formErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      name: dataList?.name ?? '',
      serialNumber: dataList?.serialNumber ?? '',
      status: dataList?.status ?? 0,
      pdv: dataList?.pdv.name ?? '',
      model: dataList?.model ?? '',
      telephoneOperator: dataList?.telephoneOperator ?? '',
      cardOperator: dataList?.cardOperator ?? '',
      expirationDate: dataList?.expirationDate ?? '',

      // users: [],
    },
    // validators: {
    //   document: [validators.required, validators.cpforcnpj],
    //   name: [validators.required],
    //   serialNumber: [validators.required],
    //   status: [validators.required],
    //   expirationDate: [validators.required],
    //   pdv: [validators.required],
    //   model: [validators.required],
    //   telephoneOperator: [validators.required],
    //   cardOperator: [validators.required],

    //   // users: [validators.required],
    // },
    formatters: {
      document: updateMaskCPFOrCNPJ,
      zipCode: updateMaskCEP,
      telephone: updateMaskMobilePhone,
    },
  });

  const handleOnRegister = (): void => {
    console.log('form before valid', formData);
    if (isFormValid()) {
      // TODO: change type to Pdv

      const payload: any = {
        id: dataList?.id ?? null,
        name: formData[FormInputName.name],
        serialNumber: formData[FormInputName.serialNumber],
        status: formData[FormInputName.status],
        expirationDate: formData[FormInputName.expirationDate],
        pdv: formData[FormInputName.pdv],
        model: formData[FormInputName.model],
        telephoneOperator: formData[FormInputName.telephoneOperator],
        cardOperator: formData[FormInputName.cardOperator],
        // users: formData[FormInputName.users],
      };
      if (payload.id === null) {
        delete payload.id;
      }
      onSubmit(payload);
    }
  };
  const statusOptions = [
    { value: 0, label: 'POS em estoque' },
    { value: 1, label: 'POS em uso' },
    { value: 2, label: 'POS reservada' },
    { value: 3, label: 'POS inativa' },
  ];

  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
        handleOnRegister();
      }}
    >
      <Row>
        <Col md={10}>
          <h5>Informações gerais e endereço</h5>
          <InputText
            name="name"
            label="Nome da POS"
            placeholder="Digite o nome da POS"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
          <InputText
            name="name"
            label="Nome da POS"
            placeholder="Digite o nome da POS"
            value={formData[FormInputName.serialNumber]}
            onChange={e => onChangeFormInput(FormInputName.serialNumber)(e.target.value)}
            error={formErrors.serialNumber && formErrors.serialNumber[0]}
          />
          <SelectAutoComplete
            label="Situação da POS"
            options={statusOptions}
            onChange={e => onChangeFormInput(FormInputName.status)(e.value)}
            error={formErrors.status && formErrors.status[0]}
            name="status"
            placeholder="Selecione ou digite a situação da POS"
            value={formData[FormInputName.status]}
          />
          <InputText
            name="PDV"
            label="Nome do PDV"
            placeholder="Digite o nome do PDV"
            value={formData[FormInputName.pdv]}
            onChange={e => onChangeFormInput(FormInputName.pdv)(e.target.value)}
            error={formErrors.pdv && formErrors.pdv[0]}
          />
        </Col>
      </Row>
      <hr />
      <div className="d-flex justify-content-end">
        {/* //:TODO !important add type props to "button" */}
        <h1>{document}</h1>
        <Button title="Salvar" type="button" onClick={handleOnRegister} />
      </div>
    </Form>
  );
};
