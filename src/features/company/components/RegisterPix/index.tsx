import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormErrors } from '@/hooks/useForm';
import { X } from 'react-feather';
import { CompanyControllerPix } from '../../types';
import { updateMask as updateMaskAccountAgency } from '@/helpers/masks/AccountAgency';

interface RegisterContentProps {
  formErrors?: FormErrors;
  controllerInputAppendPix: CompanyControllerPix;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  idInstitution = 'idInstitution',
  nameInstitution = 'nameInstitution',
  idType = 'idType',
  nameType = 'nameType',
  pix = 'pix',
}

export const RegisterPix: React.FC<RegisterContentProps> = ({
  formErrors,
  controllerInputAppendPix,
}) => (
  <Form
    noValidate={true}
    onSubmit={(e): void => {
      e.preventDefault();
    }}
  >
    <>
      {controllerInputAppendPix.pix.map((item, index) => (
        <Row key={index}>
          <Col md={5}>
            <FormGroup className="mb-2">
              <SelectCustom
                name="institution"
                label="Instituição"
                placeholder="Selecione ou digite a instituição"
                onChange={e => {
                  controllerInputAppendPix.handleChangePix(
                    FormInputName.idInstitution,
                    index,
                    String(e?.value),
                  );
                  controllerInputAppendPix.handleChangePix(
                    FormInputName.nameInstitution,
                    index,
                    String(e?.label),
                  );
                }}
                error={formErrors?.name && formErrors.name[0]}
                value={item.id}
                options={controllerInputAppendPix.listBank.map(item => ({
                  label: item.fullName,
                  value: item.id,
                }))}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="mb-2">
              <SelectCustom
                name="type"
                label="Tipo"
                placeholder="Selecione ou digite a instituição"
                onChange={e => {
                  controllerInputAppendPix.handleChangePix(
                    FormInputName.idType,
                    index,
                    String(e?.value),
                  );
                  controllerInputAppendPix.handleChangePix(
                    FormInputName.nameType,
                    index,
                    String(e?.label),
                  );
                }}
                error={formErrors?.name && formErrors.name[0]}
                value={item.id}
                options={[
                  { value: 0, label: 'CPF/CNPJ' },
                  { value: 1, label: 'Telefone' },
                  { value: 2, label: 'E-mail' },
                  { value: 3, label: 'Chave aletória' },
                ]}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="mb-2">
              <InputText
                name="pix"
                label="Pix"
                placeholder="Digite a chave pix"
                value={item.pix}
                maxLength={40}
                onChange={e =>
                  controllerInputAppendPix.handleChangePix(
                    FormInputName.pix,
                    index,
                    e?.target.value,
                  )
                }
                error={formErrors?.pix && formErrors.pix[0]}
              />
            </FormGroup>
          </Col>
          <Col md={1} className="pt-5">
            <X onClick={() => controllerInputAppendPix.handleRemovePix(index)} />
          </Col>
        </Row>
      ))}
      <Row>
        <Col md={11}>
          <div
            className="d-flex"
            style={{ justifyContent: 'flex-end' }}
            // onClick={() => addBankData}
            onClick={() => controllerInputAppendPix.handleAddPix()}
          >
            adicionar pix
          </div>
        </Col>
      </Row>
    </>
  </Form>
);
