/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, InputFile, InputText, Loading, SelectCustom, TextArea } from '@/components';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { formMainSettingsProps } from '../../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorTicketMainSettingsContainerProps {
  state: States;
  formMainSettings: formMainSettingsProps;
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

// eslint-disable-next-line no-shadow
export enum FormInputNameBatchs {
  name = 'name',
  startDate = 'startDate',
  endDate = 'endDate',
  startTime = 'startTime',
  endTime = 'endTime',
  commission = 'commission',
  amount = 'amount',
  unitValue = 'unitValue',
  totalValue = 'totalValue',
  imageUrl = 'imageUrl',
}

export const SectorTicketMainSettingsContainer: React.FC<
  SectorTicketMainSettingsContainerProps
> = ({ state, formMainSettings }) => {
  const { formData, formErrors, onChangeFormInput, onChangeFormFileInput, formNameFiles } =
    formMainSettings;

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="container-event">
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
                options={[]}
              />
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
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
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
                      onChangeFormInput(FormInputName.percentageHalfPrice)(
                        e?.target.value as string,
                      )
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
                onChange={e => onChangeFormInput(FormInputName.hasCourtesy)(e.target.value)}
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
        </div>

        <div className="container-event mb-4">
          <h5 className="mb-2 border-bottom-title mb-5">Lotes</h5>
          <p>Cadastrar lote</p>
        </div>

        <div style={{ background: '#FFF', borderRadius: '5px', padding: '50px 30px' }}>
          <div className="container-event">
            <Form
              noValidate={true}
              onSubmit={(e): void => {
                e.preventDefault();
              }}
            >
              <FormGroup>
                <InputText
                  name="name"
                  label="Nome do lote"
                  placeholder="Digite o nome do ingresso"
                  value={formData[FormInputNameBatchs.name]}
                  onChange={e => onChangeFormInput(FormInputNameBatchs.name)(e.target.value)}
                  error={formErrors.name && formErrors.name[0]}
                />
              </FormGroup>
              <Row>
                <Col md={6} className="pl-0">
                  <FormGroup className="mb-2">
                    <InputText
                      type="date"
                      name="startDate"
                      label="Data início da Venda"
                      value={formData[FormInputNameBatchs.startDate]}
                      onChange={e =>
                        onChangeFormInput(FormInputNameBatchs.startDate)(e.target.value)
                      }
                      error={formErrors.startDate && formErrors.startDate[0]}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} className="pr-0">
                  <FormGroup className="mb-2">
                    <InputText
                      type="date"
                      name="endDate"
                      label="Data fim da Venda"
                      value={formData[FormInputNameBatchs.endDate]}
                      onChange={e => onChangeFormInput(FormInputNameBatchs.endDate)(e.target.value)}
                      error={formErrors.endDate && formErrors.endDate[0]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="pl-0">
                  <FormGroup className="mb-2">
                    <InputText
                      type="time"
                      name="startTime"
                      label="Hora início da Venda"
                      value={formData[FormInputNameBatchs.startTime]}
                      onChange={e =>
                        onChangeFormInput(FormInputNameBatchs.startTime)(e.target.value)
                      }
                      error={formErrors.startTime && formErrors.startTime[0]}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} className="pr-0">
                  <FormGroup className="mb-2">
                    <InputText
                      type="time"
                      name="endTime"
                      label="Hora fim da Venda"
                      value={formData[FormInputNameBatchs.endTime]}
                      onChange={e => onChangeFormInput(FormInputNameBatchs.endTime)(e.target.value)}
                      error={formErrors.endTime && formErrors.endTime[0]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <InputText
                  name="commission"
                  label="Porcentagem de Comissão (%)"
                  placeholder="0"
                  value={formData[FormInputNameBatchs.commission]}
                  onChange={e => onChangeFormInput(FormInputNameBatchs.commission)(e.target.value)}
                  error={formErrors.commission && formErrors.commission[0]}
                />
              </FormGroup>
              <Row>
                <Col md={6} className="pl-0">
                  <FormGroup>
                    <InputText
                      name="amount"
                      label="Quantidade de ingressos"
                      placeholder="Ex: 20000"
                      value={formData[FormInputNameBatchs.amount]}
                      onChange={e => onChangeFormInput(FormInputNameBatchs.amount)(e.target.value)}
                      error={formErrors.amount && formErrors.amount[0]}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} className="pr-0">
                  <FormGroup>
                    <InputText
                      name="unitValue"
                      label="Valor unitário"
                      placeholder="Ex: 20,00"
                      value={formData[FormInputNameBatchs.unitValue]}
                      onChange={e =>
                        onChangeFormInput(FormInputNameBatchs.unitValue)(e.target.value)
                      }
                      error={formErrors.unitValue && formErrors.unitValue[0]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <InputText
                  name="totalValue"
                  label="Valor unitário"
                  placeholder="Ex: 20,00"
                  value={formData[FormInputNameBatchs.totalValue]}
                  onChange={e => onChangeFormInput(FormInputNameBatchs.totalValue)(e.target.value)}
                  error={formErrors.totalValue && formErrors.totalValue[0]}
                />
              </FormGroup>
              <FormGroup className="mb-2">
                <InputFile
                  name="imageUrl"
                  label="Layout de impressão (opcional)"
                  fileName={formNameFiles?.imageUrl}
                  onChange={e =>
                    onChangeFormFileInput(FormInputNameBatchs.imageUrl)(
                      (e.target as HTMLInputElement)?.files?.[0],
                    )
                  }
                  error={formErrors.imageUrl && formErrors.imageUrl[0]}
                />
              </FormGroup>
            </Form>
          </div>
          <div className="d-flex justify-content-end">
            <div className="link-green">+ cadastrar lote</div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};
