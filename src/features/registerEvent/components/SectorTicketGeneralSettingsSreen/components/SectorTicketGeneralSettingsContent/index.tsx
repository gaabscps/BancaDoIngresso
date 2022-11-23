/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, InputText, SelectCustom } from '@/components';
import { Form, FormGroup } from 'reactstrap';
import { SectorTicketGeneralSettingsContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  sendTicketWhatsApp = 'sendTicketWhatsApp',
  codeType = 'codeType',
  printType = 'printType',
  entranceGate = 'entranceGate',
  nameBeforePurchase = 'nameBeforePurchase',
  printNameTicket = 'printNameTicket',
  requestCpf = 'requestCpf',
  printCpfTicket = 'printCpfTicket',
  validateCpf = 'validateCpf',
  purchaseLimitCpf = 'purchaseLimitCpf',
}

export const SectorTicketGeneralSettingsContent: React.FC<
  Pick<SectorTicketGeneralSettingsContainerProps, 'formGeneralSettings'>
> = ({ formGeneralSettings }) => {
  const { formData, formErrors, onChangeFormInput } = formGeneralSettings;

  const codeTypeOptions = [
    { value: '0', label: 'BarCode' },
    { value: '1', label: 'QrCode' },
  ];

  const printTypeOptions = [
    { value: '0', label: 'Vertical' },
    { value: '1', label: 'Horizontal' },
  ];

  return (
    <Fragment>
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Enviar ingresso por WhatsApp?"
            name="sendTicketWhatsApp"
            value={formData[FormInputName.sendTicketWhatsApp]}
            onChange={e => {
              onChangeFormInput(FormInputName.sendTicketWhatsApp)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.sendTicketWhatsApp && formErrors.sendTicketWhatsApp[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <SelectCustom
            name="codeType"
            label="Tipo do código"
            placeholder="Digite ou selecione o tipo do código"
            value={formData[FormInputName.codeType]}
            onChange={e => onChangeFormInput(FormInputName.codeType)(e?.value as string)}
            error={formErrors.codeType && formErrors.codeType[0]}
            options={codeTypeOptions}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <SelectCustom
            name="printType"
            label="Tipo de impressão"
            placeholder="Digite ou selecione o tipo de impressão"
            value={formData[FormInputName.printType]}
            onChange={e => onChangeFormInput(FormInputName.printType)(e?.value as string)}
            error={formErrors.printType && formErrors.printType[0]}
            options={printTypeOptions}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="entranceGate"
            label="Portão de entrada (opcional)"
            placeholder="Digite o nome do portão de entrada"
            value={formData[FormInputName.entranceGate]}
            onChange={e => onChangeFormInput(FormInputName.entranceGate)(e.target.value)}
            error={formErrors.entranceGate && formErrors.entranceGate[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Pedir nome antes da compra?"
            name="nameBeforePurchase"
            value={formData[FormInputName.nameBeforePurchase]}
            onChange={e => {
              onChangeFormInput(FormInputName.nameBeforePurchase)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.nameBeforePurchase && formErrors.nameBeforePurchase[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Imprimir nome no ingresso?"
            name="printNameTicket"
            value={formData[FormInputName.printNameTicket]}
            onChange={e => {
              onChangeFormInput(FormInputName.printNameTicket)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.printNameTicket && formErrors.printNameTicket[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Pedir CPF?"
            name="requestCpf"
            value={formData[FormInputName.requestCpf]}
            onChange={e => {
              onChangeFormInput(FormInputName.requestCpf)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.requestCpf && formErrors.requestCpf[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Imprimir CPF no ingresso?"
            name="printCpfTicket"
            value={formData[FormInputName.printCpfTicket]}
            onChange={e => {
              onChangeFormInput(FormInputName.printCpfTicket)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.printCpfTicket && formErrors.printCpfTicket[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Consultar CPF? "
            name="validateCpf"
            value={formData[FormInputName.validateCpf]}
            onChange={e => {
              onChangeFormInput(FormInputName.validateCpf)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.validateCpf && formErrors.validateCpf[0]}
          />
        </FormGroup>
        <FormGroup>
          <InputText
            name="purchaseLimitCpf"
            label="Limite de compra por CPF (max: 50)"
            placeholder="Ex: 10"
            className="w-25"
            maxLength={2}
            value={formData[FormInputName.purchaseLimitCpf]}
            onChange={e =>
              onChangeFormInput(FormInputName.purchaseLimitCpf)(e.target.value.replace(/\D/g, ''))
            }
            error={formErrors.purchaseLimitCpf && formErrors.purchaseLimitCpf[0]}
          />
        </FormGroup>
      </Form>
    </Fragment>
  );
};
