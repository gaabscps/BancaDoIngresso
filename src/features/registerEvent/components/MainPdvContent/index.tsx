import React from 'react';
import { Form, FormGroup } from 'reactstrap';
import { ButtonGroup, SelectCustom } from '@/components';
import Pdv from '@/model/Pdv';
import { PdvContainerProps } from '../../screens/Pdv/ui';
import { PdvScreen } from '../PdvScreen/screens/List';

// eslint-disable-next-line no-shadow
export enum FormInputName {
  pdv = 'pdv',
  allowMoney = 'allowMoney',
  allowAdvanceFee = 'allowAdvanceFee',
  allowDebit = 'allowDebit',
  allowCreditCard = 'allowCreditCard',
  // allowBankSlip = 'allowBankSlip',
  allowPix = 'allowPix',
  allowSellingWebsite = 'allowSellingWebsite',
  allowDiscount = 'allowDiscount',
}

export const MainPdvContent: React.FC<
  Pick<
    PdvContainerProps,
    | 'onChangeSelectedPdv'
    | 'formMainPdv'
    | 'mainPdvActions'
    | 'mainPdvStates'
    | 'inputRef'
    | 'numberTab'
  >
> = ({ onChangeSelectedPdv, formMainPdv, mainPdvActions, mainPdvStates, inputRef, numberTab }) => {
  const { formData, formErrors, onChangeFormInput } = formMainPdv;

  const pdvDataSelected = mainPdvStates?.mainPdvList.find((item: Pdv) => item.id === formData.pdv);

  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
      }}
    >
      <FormGroup className="mb-2">
        <SelectCustom
          refSelect={inputRef}
          disabled={numberTab !== 0}
          name="pdv"
          label="PDV"
          placeholder="Digite ou selecione o PDV"
          onChange={e => {
            onChangeFormInput(FormInputName.pdv)(e?.value as string);
            onChangeSelectedPdv(e?.value as string);
          }}
          error={formErrors.pdv && formErrors.pdv[0]}
          value={formData[FormInputName.pdv]}
          options={mainPdvStates.mainPdvList.map(item => ({
            value: item.id,
            label: item.name,
          }))}
        />
        <PdvScreen pdvActions={mainPdvActions} pdvSelected={pdvDataSelected} />
      </FormGroup>
      <FormGroup className="mb-2">
        <ButtonGroup
          label="Permitir dinheiro?"
          name="allowMoney"
          value={formData[FormInputName.allowMoney]}
          onChange={e => onChangeFormInput(FormInputName.allowMoney)(e.target.value)}
          options={[
            { value: true, label: 'Sim' },
            { value: false, label: 'Não' },
          ]}
          error={formErrors.allowMoney && formErrors.allowMoney[0]}
        />
      </FormGroup>
      <FormGroup className="mb-2">
        <ButtonGroup
          label="Permitir taxa antecipada?"
          name="allowAdvanceFee"
          value={formData[FormInputName.allowAdvanceFee]}
          onChange={e => onChangeFormInput(FormInputName.allowAdvanceFee)(e.target.value)}
          options={[
            { value: true, label: 'Sim' },
            { value: false, label: 'Não' },
          ]}
          error={formErrors.allowAdvanceFee && formErrors.allowAdvanceFee[0]}
        />
      </FormGroup>
      <FormGroup className="mb-2">
        <ButtonGroup
          label="Permitir débito?"
          name="allowDebit"
          value={formData[FormInputName.allowDebit]}
          onChange={e => onChangeFormInput(FormInputName.allowDebit)(e.target.value)}
          options={[
            { value: true, label: 'Sim' },
            { value: false, label: 'Não' },
          ]}
          error={formErrors.allowDebit && formErrors.allowDebit[0]}
        />
      </FormGroup>
      <FormGroup className="mb-2">
        <ButtonGroup
          label="Permitir crédito?"
          name="allowCreditCard"
          value={formData[FormInputName.allowCreditCard]}
          onChange={e => onChangeFormInput(FormInputName.allowCreditCard)(e.target.value)}
          options={[
            { value: true, label: 'Sim' },
            { value: false, label: 'Não' },
          ]}
          error={formErrors.allowCreditCard && formErrors.allowCreditCard[0]}
        />
      </FormGroup>
      <FormGroup className="mb-2">
        <ButtonGroup
          label="Permitir PIX?"
          name="allowPix"
          value={formData[FormInputName.allowPix]}
          onChange={e => onChangeFormInput(FormInputName.allowPix)(e.target.value)}
          options={[
            { value: true, label: 'Sim' },
            { value: false, label: 'Não' },
          ]}
          error={formErrors.allowPix && formErrors.allowPix[0]}
        />
      </FormGroup>
      <FormGroup className="mb-2">
        <ButtonGroup
          label="Permitir venda online?"
          name="allowSellingWebsite"
          value={formData[FormInputName.allowSellingWebsite]}
          onChange={e => onChangeFormInput(FormInputName.allowSellingWebsite)(e.target.value)}
          options={[
            { value: true, label: 'Sim' },
            { value: false, label: 'Não' },
          ]}
          error={formErrors.allowSellingWebsite && formErrors.allowSellingWebsite[0]}
        />
      </FormGroup>
      <FormGroup className="mb-2">
        <ButtonGroup
          label="Permitir desconto?"
          name="allowDiscount"
          value={formData[FormInputName.allowDiscount]}
          onChange={e => onChangeFormInput(FormInputName.allowDiscount)(e.target.value)}
          options={[
            { value: true, label: 'Sim' },
            { value: false, label: 'Não' },
          ]}
          error={formErrors.allowDiscount && formErrors.allowDiscount[0]}
        />
      </FormGroup>
    </Form>
  );
};
