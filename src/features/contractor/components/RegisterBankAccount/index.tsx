import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormErrors } from '@/hooks/useForm';
import { X } from 'react-feather';
import { updateMask as updateMaskAccountAgency } from '@/helpers/masks/AccountAgency';
import { ContractorControllerBankAccount } from '../../types';

interface RegisterContentProps {
  formErrors?: FormErrors;
  controllerInputAppendBankAccount: ContractorControllerBankAccount;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  id = 'id',
  name = 'name',
  agencia = 'agencia',
  conta = 'conta',
}

export const RegisterBankAccount: React.FC<RegisterContentProps> = ({
  formErrors,
  controllerInputAppendBankAccount,
}) => (
  <Form
    noValidate={true}
    onSubmit={(e): void => {
      e.preventDefault();
    }}
  >
    <>
      {controllerInputAppendBankAccount.bankAccount.map((item, index) => (
        <Row key={index}>
          <Col md={5}>
            <FormGroup className="mb-2">
              <SelectCustom
                name="name"
                label="Instituição"
                placeholder="Selecione ou digite a instituição"
                onChange={e => {
                  controllerInputAppendBankAccount.handleChangeBanckAccount(
                    FormInputName.id,
                    index,
                    String(e?.value),
                  );
                  controllerInputAppendBankAccount.handleChangeBanckAccount(
                    FormInputName.name,
                    index,
                    String(e?.label),
                  );
                }}
                error={formErrors?.name && formErrors.name[0]}
                value={item.id}
                options={controllerInputAppendBankAccount.listBank.map(itemBank => ({
                  label: itemBank.fullName,
                  value: itemBank.id,
                }))}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="mb-2">
              <InputText
                name="agencia"
                label="Agência"
                placeholder="Digite a agência"
                value={item.agencia}
                maxLength={6}
                onChange={e =>
                  controllerInputAppendBankAccount.handleChangeBanckAccount(
                    FormInputName.agencia,
                    index,
                    e?.target.value,
                  )
                }
                error={formErrors?.agencia && formErrors.agencia[0]}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="mb-2">
              <InputText
                name="conta"
                label="Conta"
                placeholder="Digite a conta"
                value={item.conta}
                maxLength={13}
                onChange={e =>
                  controllerInputAppendBankAccount.handleChangeBanckAccount(
                    FormInputName.conta,
                    index,
                    updateMaskAccountAgency(e?.target.value),
                  )
                }
                error={formErrors?.conta && formErrors.conta[0]}
              />
            </FormGroup>
          </Col>
          <Col md={1} className="pt-5">
            <X onClick={() => controllerInputAppendBankAccount.handleRemoveBanckAccount(index)} />
          </Col>
        </Row>
      ))}
      <Row>
        <Col md={11}>
          <div
            className="d-flex"
            style={{ justifyContent: 'flex-end' }}
            onClick={() => controllerInputAppendBankAccount.handleAddBanckAccount()}
          >
            adicionar conta bancária
          </div>
        </Col>
      </Row>
    </>
  </Form>
);
