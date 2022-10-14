import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormErrors } from '@/hooks/useForm';
import { X } from 'react-feather';
import { ContractorControllerPix } from '../../types';

interface RegisterContentProps {
  formErrors?: FormErrors;
  controllerInputAppendPix: ContractorControllerPix;
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
                value={item.idInstitution}
                options={controllerInputAppendPix.listBank.map(itemBank => ({
                  label: itemBank.fullName,
                  value: itemBank.id,
                }))}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="mb-2">
              <SelectCustom
                name="nameType"
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
                error={formErrors?.idType && formErrors.idType[0]}
                value={String(item.idType)}
                options={controllerInputAppendPix.pixTypes.map(itemType => ({
                  label: itemType.type,
                  value: String(itemType.id),
                }))}
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
            onClick={() => controllerInputAppendPix.handleAddPix()}
          >
            adicionar pix
          </div>
        </Col>
      </Row>
    </>
  </Form>
);
