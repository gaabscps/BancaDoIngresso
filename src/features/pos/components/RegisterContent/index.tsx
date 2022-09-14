import React from 'react';
import { Col, Form, Row } from 'reactstrap';
import { InputText, Button } from '@/components';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import SelectAutoComplete from '@/components/Select';
import Pos from '@/model/Pos';
import Pdv from '@/model/Pdv';

interface RegisterContentProps {
  document?: string;
  onSubmit: (value: any) => void;
  dataList?: Pos;
  dataListPdv?: any;
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
  dataListPdv,
}) => {
  const { formData, formErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      name: dataList?.name ?? '',
      serialNumber: dataList?.serialNumber ?? '',
      status: String(dataList?.status ?? 0),
      pdv: dataList?.pdv.name ?? '',
      model: dataList?.model ?? '',
      telephoneOperator: dataList?.telephoneOperator ?? '',
      cardOperator: dataList?.cardOperator ?? '',
      expirationDate: String(dataList?.expirationDate ?? ''),

      // users: [],
    },
    validators: {
      document: [validators.required, validators.cpforcnpj],
      name: [validators.required],
      serialNumber: [validators.required],
      status: [validators.required],
      expirationDate: [validators.required],
      pdv: [validators.required],
      model: [validators.required],
      telephoneOperator: [validators.required],
      cardOperator: [validators.required],
      users: [validators.required],
    },
    formatters: {
      document: updateMaskCPFOrCNPJ,
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
        pdv: {
          id: formData[FormInputName.pdv],
        },
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
    { value: '0', label: 'POS em estoque' },
    { value: '1', label: 'POS em uso' },
    { value: '2', label: 'POS reservada' },
    { value: '3', label: 'POS inativa' },
  ];

  console.log('error', formErrors);

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
            name="status"
            label="Situação da POS"
            options={statusOptions}
            placeholder="Selecione ou digite a situação da POS"
            value={formData[FormInputName.status]}
            onChange={e => onChangeFormInput(FormInputName.status)(e?.value as string)}
            error={formErrors.status && formErrors.status[0]}
          />
          <SelectAutoComplete
            label="PDV"
            options={
              dataListPdv && dataListPdv.map((item: any) => ({ value: item.id, label: item.name }))
            }
            onChange={e => onChangeFormInput(FormInputName.pdv)(e?.value as string)}
            error={formErrors.pdv && formErrors.pdv[0]}
            name="pdv"
            placeholder="Selecione ou digite a situação da POS"
            value={formData[FormInputName.status]}
          />
          {/* <InputText
            name="PDV"
            label="Nome do PDV"
            placeholder="Digite o nome do PDV"
            value={formData[FormInputName.pdv]}
            onChange={e => onChangeFormInput(FormInputName.pdv)(e.target.value)}
            error={formErrors.pdv && formErrors.pdv[0]}
          /> */}
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
