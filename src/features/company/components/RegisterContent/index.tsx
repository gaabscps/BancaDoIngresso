import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Company from '@/model/Company';
import Pdv from '@/model/Pdv';
import { CompanyControllerBankAccount } from '../../types';
import { columnsBankAccount, columnsCompany } from '../../screens/List/ui/table';
import { statesUf } from '@/constant/states';
import { CustomTable } from '@/components/Table';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  listCompany: Company[];
  listBankAccount: Pdv[];
  controllerInputAppendBankAccount: CompanyControllerBankAccount;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  serialNumber = 'serialNumber',
  status = 'status',
  expirationDate = 'expirationDate',
  pdv = 'pdv',
  model = 'model',
  telephoneOperator = 'telephoneOperator',
  cardOperator = 'cardOperator',
  pix = 'pix',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  listBankAccount,
  onChangeFormInput,
  controllerInputAppendBankAccount,
}) => {
  const dataTableBankAccount = listBankAccount?.map(item => ({
    id: item.id,
    // name: (
    //   <ColumnStatus statusColor={String(changeColorColumn(Number(item.)))}>
    //     {item.name}
    //   </ColumnStatus>
    // ),
    name: item.name,
    agencia: item.agencia,
    conta: item.conta,
    // actions: (
    //   // <React.Fragment>
    //   //   <Pen
    //   //     className="mr-2 svg-icon action-icon"
    //   //     onClick={(): void =>
    //   //       onShouldShowModal({
    //   //         value: ShouldShowModal.finnancials,
    //   //         newTitleModal: `Editar ${item.name}`,
    //   //         finnancials: item,
    //   //       })
    //   //     }
    //   //   />
    //   //   <CloseX
    //   //     className="mr-2 svg-icon action-icon"
    //   //     onClick={() => {
    //   //       // onShowDeleteCompany(item);
    //   //       undefined;
    //   //     }}
    //   //   />
    //   // </React.Fragment>
    // ),
  }));

  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
      }}
    >
      <Row>
        <Col md={8}>
          <h5 className="mb-2">Informações gerais e endereço</h5>
          <FormGroup className="mb-2">
            <InputText
              name="name"
              label="Nome da empresa (contratante)"
              placeholder="Digite o nome da empresa"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
              error={formErrors.name && formErrors.name[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="serialNumber"
              label="CPF/CNPJ"
              placeholder="Digite o CPF ou CNPJ do cliente"
              value={formData[FormInputName.serialNumber]}
              onChange={e => onChangeFormInput(FormInputName.serialNumber)(e.target.value)}
              error={formErrors.serialNumber && formErrors.serialNumber[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <SelectCustom
              name="status"
              label="Tipo da empresa"
              placeholder="Selecione ou digite o tipo da empresa"
              onChange={e => onChangeFormInput(FormInputName.status)(e?.value as string)}
              error={formErrors.status && formErrors.status[0]}
              value={formData[FormInputName.status]}
              options={[
                { value: '1', label: 'Pessoa Física' },
                { value: '2', label: 'Pessoa Jurídica' },
              ]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="model"
              label="Telefone celular"
              placeholder="(00) 0 000-0000"
              value={formData[FormInputName.model]}
              onChange={e => onChangeFormInput(FormInputName.model)(e.target.value)}
              error={formErrors.model && formErrors.model[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="telephoneOperator"
              label="E-mail da empresa"
              placeholder="email@email.com"
              value={formData[FormInputName.telephoneOperator]}
              onChange={e => onChangeFormInput(FormInputName.telephoneOperator)(e.target.value)}
              error={formErrors.telephoneOperator && formErrors.telephoneOperator[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="telephoneOperator"
              label="CEP (opcional)"
              placeholder="Digite o CEP da empresa"
              value={formData[FormInputName.cardOperator]}
              onChange={e => onChangeFormInput(FormInputName.cardOperator)(e.target.value)}
              error={formErrors.cardOperator && formErrors.cardOperator[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              type="date"
              name="expirationDate"
              label="Data de validade (opcional)"
              placeholder="DD/MM/AAAA"
              value={formData[FormInputName.expirationDate]}
              onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
              error={formErrors.expirationDate && formErrors.expirationDate[0]}
            />
          </FormGroup>

          <Row>
            <Col md={4} className="pl-0">
              <FormGroup className="mb-2">
                <SelectCustom
                  name="state"
                  label="Estado"
                  placeholder="Selecione o estado do PDV"
                  value={formData[FormInputName.expirationDate]}
                  onChange={e =>
                    onChangeFormInput(FormInputName.expirationDate)(e?.target?.value as string)
                  }
                  error={formErrors.state && formErrors.state[0]}
                  options={statesUf}
                />
              </FormGroup>
            </Col>
            <Col md={8} className="pr-0">
              <FormGroup className="mb-2">
                <InputText
                  name="city"
                  label="Cidade"
                  placeholder="Selecione o estado do PDV"
                  value={formData[FormInputName.expirationDate]}
                  onChange={e =>
                    onChangeFormInput(FormInputName.expirationDate)(e?.target.value as string)
                  }
                  error={formErrors.city && formErrors.city[0]}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup className="mb-2">
            <InputText
              name="district"
              label="Bairro"
              placeholder="Centro"
              value={formData[FormInputName.expirationDate]}
              onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
              error={formErrors.district && formErrors.district[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="street"
              label="Logradouro"
              placeholder="Rua 123 da Costa"
              value={formData[FormInputName.expirationDate]}
              onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
              error={formErrors.street && formErrors.street[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="number"
              label="Número"
              placeholder="Ex: 789"
              maxLength={6}
              value={formData[FormInputName.expirationDate]}
              onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
              error={formErrors.number && formErrors.number[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="complement"
              label="Complemento"
              placeholder="Ex: Apto 12"
              value={formData[FormInputName.expirationDate]}
              onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
              error={formErrors.complement && formErrors.complement[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="latitude"
              label="Latitude (opcional)"
              placeholder="Ex: 0º"
              maxLength={9}
              value={formData[FormInputName.expirationDate]}
              onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
              error={formErrors.latitude && formErrors.latitude[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="longitude"
              label="Longitude (opcional)"
              placeholder="Ex: 0º"
              maxLength={9}
              value={formData[FormInputName.expirationDate]}
              onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
              error={formErrors.longitude && formErrors.longitude[0]}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <FormGroup className="mb-2">
            <InputText
              name="document"
              label="CPF/CNPJ"
              placeholder="Digite o CPF ou CNPJ do PDV"
              maxLength={18}
              value={formData[FormInputName.pix]}
              onChange={e => onChangeFormInput(FormInputName.pix)(e.target.value)}
            />
          </FormGroup>
          <h5 className="mb-2">Informações financeiras</h5>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          <h6 style={{ paddingTop: '50px', paddingBottom: '30px' }}>
            Insira a(s) conta(s) bancárias(s) da empresa (opcional)
          </h6>
          {listBankAccount.length > 0 ? (
            <>
              <CustomTable
                columns={columnsBankAccount}
                data={dataTableBankAccount}
                theme="secondary"
              />
              {/* <Row style={{ width: '100%', display: 'block' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p
                      style={{
                        minWidth: '320px',
                        color: '#A5A5A5',
                        margin: '7px 9px 0px 0',
                        fontSize: '12px',
                      }}
                    >
                      Instituição
                    </p>
                    <p
                      style={{
                        minWidth: '100px',
                        color: '#A5A5A5',
                        margin: '7px 30px 0px 30px',
                        fontSize: '12px',
                      }}
                    >
                      Agencia
                    </p>
                    <p
                      style={{
                        minWidth: '151px',
                        color: '#A5A5A5',
                        margin: '7px 30px 0px 30px',
                        fontSize: '12px',
                      }}
                    >
                      Conta
                    </p>
                    <p style={{ minWidth: '151px' }}></p>
                  </div>
                </Row>
                {list.map((item: any) => (
                  <div className="finnancial" key={item.id}>
                    <div className="supdv-title-flex" style={{ maxWidth: '100%' }}>
                      <div
                        style={{ width: '100%' }}
                        className="subpdv-title-container d-flex-column space-between"
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            transition: '0.2s',
                          }}
                        >
                          <Row style={{ width: '100%', display: 'block' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <p
                                title={item.name}
                                style={{
                                  minWidth: '320px',
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  margin: '7px 9px 23px 0',
                                  fontSize: '12px',
                                }}
                              >
                                {item.name}
                              </p>
                              <p
                                style={{
                                  minWidth: '100px',
                                  margin: '7px 30px 23px 30px',
                                  fontSize: '12px',
                                }}
                              >
                                {item.agencia}
                              </p>
                              <p
                                style={{
                                  minWidth: '130px',
                                  margin: '7px 30px 23px 30px',
                                  fontSize: '12px',
                                }}
                              >
                                {item.conta}
                              </p>
                              <div
                                className="subpdv-icon-container"
                                style={{ marginTop: '9px', minWidth: '151px' }}
                              >
                                <Pen className="svg-icon" />
                                <CloseX className="svg-icon" />
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
            </>
          ) : (
            <>
              <div style={{ padding: '10px 0 20px 0', color: '#A5A5A5' }}>
                Você ainda não adicionou nenhuma conta bancária
              </div>
              <div style={{ color: '#A5A5A5', paddingBottom: '30px' }}>
                Aqui será exibida uma lista das contas bancárias inseridas.
              </div>
            </>
          )}
          <div
            style={{ margin: '0 0', cursor: 'pointer' }}
            className="subpdv-register-buttom"
            onClick={() => {
              onToggle();
              onShouldShowModal({
                value: ShouldShowModal.finnancials,
                newTitleModal: 'Nova conta bancária',
              });
            }}
          >
            + adicionar conta bancária
          </div>
        </Col>
      </Row>
    </Form>
  );
};
