/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { InputFile, InputText } from '@/components';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { updateMask as updateMaskCash, unmask as unMaskCash } from '@/helpers/masks/cash';
import { SectorTicketMainSettingsContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
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

export const BatchContent: React.FC<Pick<SectorTicketMainSettingsContainerProps, 'formBatchs'>> = ({
  formBatchs,
}) => {
  const { formData, formErrors, onChangeFormInput, onChangeFormFileInput, formNameFiles } =
    formBatchs;

  return (
    <Fragment>
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
            placeholder="Digite o nome do lote"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
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
                value={formData[FormInputName.startDate]}
                onChange={e => onChangeFormInput(FormInputName.startDate)(e.target.value)}
                error={formErrors.startDate && formErrors.startDate[0]}
              />
            </FormGroup>
          </Col>
          <Col md={6} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                type="date"
                name="endDate"
                label="Data Fim da Venda"
                value={formData[FormInputName.endDate]}
                onChange={e => onChangeFormInput(FormInputName.endDate)(e.target.value)}
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
                value={formData[FormInputName.startTime]}
                onChange={e => onChangeFormInput(FormInputName.startTime)(e.target.value)}
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
                value={formData[FormInputName.endTime]}
                onChange={e => onChangeFormInput(FormInputName.endTime)(e.target.value)}
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
            maxLength={3}
            value={formData[FormInputName.commission]}
            onChange={e =>
              onChangeFormInput(FormInputName.commission)(e.target.value.replace(/\D/g, ''))
            }
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
                maxLength={15}
                value={formData[FormInputName.amount]}
                onChange={e => {
                  onChangeFormInput(FormInputName.amount)(e.target.value.replace(/\D/g, ''));
                  onChangeFormInput(FormInputName.totalValue)(
                    String(+e.target.value * +unMaskCash(formData[FormInputName.unitValue])),
                  );
                }}
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
                value={updateMaskCash(formData[FormInputName.unitValue])}
                onChange={e => {
                  onChangeFormInput(FormInputName.unitValue)(
                    String(updateMaskCash(e.target.value)),
                  );
                  onChangeFormInput(FormInputName.totalValue)(
                    String(+unMaskCash(e.target.value) * +formData[FormInputName.amount]),
                  );
                }}
                error={formErrors.unitValue && formErrors.unitValue[0]}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <InputText
            name="totalValue"
            label="Valor total estimado"
            placeholder="Ex: 20,00"
            value={updateMaskCash(formData[FormInputName.totalValue])}
            onChange={() => undefined}
            error={formErrors.totalValue && formErrors.totalValue[0]}
            disabled
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputFile
            name="imageUrl"
            label="Imagem do lote (opcional)"
            fileName={formNameFiles?.imageUrl}
            onChange={e =>
              onChangeFormFileInput(FormInputName.imageUrl)(
                (e.target as HTMLInputElement)?.files?.[0],
              )
            }
            error={formErrors.imageUrl && formErrors.imageUrl[0]}
          />
        </FormGroup>
      </Form>
    </Fragment>
  );
};
