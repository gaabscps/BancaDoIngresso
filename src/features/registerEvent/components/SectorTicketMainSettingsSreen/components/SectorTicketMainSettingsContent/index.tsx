/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, InputFile, InputText, SelectCustom, TextArea } from '@/components';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { SectorTicketMainSettingsContainerProps, ShouldShowModal } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  eventSection = 'eventSection',
  hasHalfPrice = 'hasHalfPrice',
  percentageHalfPrice = 'percentageHalfPrice',
  amountHalfPrice = 'amountHalfPrice',
  hasCourtesy = 'hasCourtesy',
  amountCourtesy = 'amountCourtesy',
  numberTickets = 'numberTickets',
  printLayoutBase64 = 'printLayoutBase64',
  printImageBase64 = 'printImageBase64',
  printer = 'printer',
  copies = 'copies',
  reprint = 'reprint',
  printBatchNumber = 'printBatchNumber',
  observation = 'observation',
}

export const SectorTicketMainSettingsContent: React.FC<
  Pick<SectorTicketMainSettingsContainerProps, 'formMainSettings' | 'modalConfig' | 'sectorStates'>
> = ({ formMainSettings, modalConfig, sectorStates }) => {
  const { formData, formErrors, onChangeFormInput, onChangeFormFileInput, formNameFiles } =
    formMainSettings;

  return (
    <Fragment>
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <FormGroup className="mb-2">
          <SelectCustom
            name="eventSection"
            label="Nome do setor"
            placeholder="Digite ou selecione o nome do setor"
            value={formData[FormInputName.eventSection]}
            onChange={e =>
              onChangeFormInput(FormInputName.eventSection)(e?.target?.value as string)
            }
            error={formErrors.eventSection && formErrors.eventSection[0]}
            options={sectorStates.sectorList.map(sector => ({
              value: sector.id,
              label: sector.name,
            }))}
          />
          <div className="d-flex flex-column mb-5" style={{ marginTop: '-20px' }}>
            <span className="d-flex">
              <div
                className="mr-5 link-green"
                onClick={(): void => {
                  modalConfig.onToggle();
                  modalConfig.onShouldShowModal({
                    value: ShouldShowModal.sector,
                    newTitleModal: 'Cadastrar novo setor',
                  });
                }}
              >
                + cadastrar novo setor
              </div>
              {/* <div
                className="link-grey"
                onClick={(): void => {
                  if (!contractorSelected) {
                    toast.warn('Selecione uma empresa ou contratante para continuar');
                  } else {
                    onToggle();
                    onShouldShowModal({
                      value: ShouldShowModal.registerContractor,
                      newTitleModal: contractorSelected?.id
                        ? contractorSelected?.name
                        : 'Cadastrar nova empresa (contratante)',
                      contractor: contractorSelected,
                    });
                  }
                }}
              >
                <Pen height={12} width={12} /> editar
              </div> */}
            </span>
          </div>
        </FormGroup>
        <FormGroup>
          <InputText
            name="name"
            label="Nome do ingresso"
            placeholder="Digite o nome do ingresso"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Permitir meia entrada?"
            name="hasHalfPrice"
            value={formData[FormInputName.hasHalfPrice]}
            onChange={e => {
              onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value);
              if (e.target.value === 'false') {
                onChangeFormInput(FormInputName.percentageHalfPrice)('');
                onChangeFormInput(FormInputName.amountHalfPrice)('');
              }
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
          />
        </FormGroup>
        <Row>
          <Col md={6} className="pl-0">
            <FormGroup className="mb-2">
              <InputText
                name="percentageHalfPrice"
                label="Porcentagem de meia entrada (%)"
                placeholder="0"
                value={formData[FormInputName.percentageHalfPrice]}
                onChange={e =>
                  onChangeFormInput(FormInputName.percentageHalfPrice)(e?.target.value as string)
                }
                error={formErrors.percentageHalfPrice && formErrors.percentageHalfPrice[0]}
                disabled={
                  !formData[FormInputName.hasHalfPrice] ||
                  formData[FormInputName.hasHalfPrice] === 'false'
                }
              />
            </FormGroup>
          </Col>
          <Col md={6} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                name="numbeHalfPrice"
                label="Quantidade de ingressos meia entrada"
                placeholder="2000"
                value={formData[FormInputName.amountHalfPrice]}
                onChange={e =>
                  onChangeFormInput(FormInputName.amountHalfPrice)(e?.target.value as string)
                }
                error={formErrors.amountHalfPrice && formErrors.amountHalfPrice[0]}
                disabled={
                  !formData[FormInputName.hasHalfPrice] ||
                  formData[FormInputName.hasHalfPrice] === 'false'
                }
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Permitir ingresso cortesia?"
            name="hasCourtesy"
            value={formData[FormInputName.hasCourtesy]}
            onChange={e => {
              onChangeFormInput(FormInputName.hasCourtesy)(e.target.value);
              if (e.target.value === 'false') {
                onChangeFormInput(FormInputName.amountCourtesy)('');
              }
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.hasCourtesy && formErrors.hasCourtesy[0]}
          />
        </FormGroup>
        <Row>
          <Col md={6} className="pl-0">
            <FormGroup className="mb-2">
              <InputText
                name="amountCourtesy"
                label="Quantidade de ingressos cortesia"
                placeholder="Ex: 2000"
                value={formData[FormInputName.amountCourtesy]}
                onChange={e =>
                  onChangeFormInput(FormInputName.amountCourtesy)(e?.target.value as string)
                }
                error={formErrors.amountCourtesy && formErrors.amountCourtesy[0]}
                disabled={
                  !formData[FormInputName.hasCourtesy] ||
                  formData[FormInputName.hasCourtesy] === 'false'
                }
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Numerar ingressos?"
            name="numberTickets"
            value={formData[FormInputName.numberTickets]}
            onChange={e => onChangeFormInput(FormInputName.numberTickets)(e.target.value)}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.numberTickets && formErrors.numberTickets[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputFile
            name="printLayoutBase64"
            label="Layout de impressão (opcional)"
            fileName={formNameFiles?.printLayoutBase64}
            onChange={e =>
              onChangeFormFileInput(FormInputName.printLayoutBase64)(
                (e.target as HTMLInputElement)?.files?.[0],
              )
            }
            error={formErrors.printLayoutBase64 && formErrors.printLayoutBase64[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputFile
            name="printImageBase64"
            label="Imagem de impressão (opcional)"
            fileName={formNameFiles?.printImageBase64}
            onChange={e =>
              onChangeFormFileInput(FormInputName.printImageBase64)(
                (e.target as HTMLInputElement)?.files?.[0],
              )
            }
            error={formErrors.printImageBase64 && formErrors.printImageBase64[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <SelectCustom
            name="printer"
            label="Impressora (opcional)"
            placeholder="Selecione a impressora para impressão"
            value={formData[FormInputName.printer]}
            onChange={e => onChangeFormInput(FormInputName.printer)(e?.target?.value as string)}
            error={formErrors.printer && formErrors.printer[0]}
            options={[]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <SelectCustom
            name="copies"
            label="Número de vias (opcional)"
            placeholder="1"
            value={formData[FormInputName.copies]}
            onChange={e => onChangeFormInput(FormInputName.copies)(e?.target?.value as string)}
            error={formErrors.copies && formErrors.copies[0]}
            options={[]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Reimprimir ingresso? (opcional)"
            name="reprint"
            value={formData[FormInputName.reprint]}
            onChange={e => onChangeFormInput(FormInputName.reprint)(e.target.value)}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.reprint && formErrors.reprint[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Imprimir número do lote? (opcional)"
            name="printBatchNumber"
            value={formData[FormInputName.printBatchNumber]}
            onChange={e => onChangeFormInput(FormInputName.printBatchNumber)(e.target.value)}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.printBatchNumber && formErrors.printBatchNumber[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <TextArea
            name="observation"
            label="Observação (opcional)"
            placeholder="Digite aqui observações que irão aparecer no ingresso"
            maxLength={250}
            rows={4}
            value={formData[FormInputName.observation]}
            onChange={e => onChangeFormInput(FormInputName.observation)(e.target.value)}
            error={formErrors.observation && formErrors.observation[0]}
          />
        </FormGroup>
      </Form>
    </Fragment>
  );
};
