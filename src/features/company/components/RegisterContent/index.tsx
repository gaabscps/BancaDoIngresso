import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Company from '@/model/Company';
import { statesUf } from '@/constant/states';
import { CustomTable } from '@/components/Table';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { colors } from '@/styles/colors';
import { ArrowLeft } from 'react-feather';
import { ReactComponent as CloseX } from '@/assets/images/svg/closeX.svg';
import { columnsBankAccount } from '../../screens/List/ui/table';
import { DataRowBankAccount, ShouldShowModal } from '../../screens/List/ui';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  listCompanyType: any[];
  listBankAccount: DataRowBankAccount[];
  onShouldShowModal: ({
    value,
    newTitleModal,
    company,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    company?: Company;
  }) => void;
  onDeleteRowBankAccount: (bankAccount: any) => void;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  document = 'document',
  companyType = 'companyType',
  telephone = 'telephone',
  email = 'email',
  zipCode = 'zipCode',
  state = 'state',
  city = 'city',
  district = 'district',
  street = 'street',
  number = 'number',
  complement = 'complement',
  latitude = 'latitude',
  longitude = 'longitude',
  pix = 'pix',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  listBankAccount,
  onChangeFormInput,
  onShouldShowModal,
  onDeleteRowBankAccount,
  listCompanyType,
}) => {
  const dataTableBankAccount = listBankAccount?.map(item => ({
    id: item.id,
    name: item.name,
    agencia: item.agencia,
    conta: item.conta,
    actions: (
      <React.Fragment>
        <Pen
          className="mr-2 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.registerBankAccount,
              newTitleModal: (
                <div className="d-flex">
                  <div
                    className="m-auto"
                    onClick={() => {
                      onShouldShowModal({
                        value: ShouldShowModal.registerCompany,
                        newTitleModal: 'Cadastrar nova empresa',
                      });
                    }}
                  >
                    <ArrowLeft color={colors.black} width="30" height="30" className="m-auto" />
                  </div>
                  <h5 className="header-title-text modal__title ml-3 mb-0">
                    Adicionar conta bancária
                  </h5>
                </div>
              ),
            })
          }
        />
        <CloseX
          className="mr-2 svg-icon action-icon"
          onClick={() => {
            onDeleteRowBankAccount(item);
          }}
        />
      </React.Fragment>
    ),
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
              name="document"
              label="CPF/CNPJ"
              placeholder="Digite o CPF ou CNPJ do cliente"
              value={formData[FormInputName.document]}
              onChange={e => onChangeFormInput(FormInputName.document)(e.target.value)}
              error={formErrors.document && formErrors.document[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <SelectCustom
              name="companyType"
              label="Tipo da empresa"
              placeholder="Selecione ou digite o tipo da empresa"
              onChange={e => onChangeFormInput(FormInputName.companyType)(e?.value as string)}
              error={formErrors.companyType && formErrors.companyType[0]}
              value={formData[FormInputName.companyType]}
              options={listCompanyType.map(item => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="telephone"
              label="Telefone celular"
              placeholder="(00) 0 000-0000"
              value={formData[FormInputName.telephone]}
              onChange={e => onChangeFormInput(FormInputName.telephone)(e.target.value)}
              error={formErrors.telephone && formErrors.telephone[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="email"
              label="E-mail da empresa"
              placeholder="email@email.com"
              value={formData[FormInputName.email]}
              onChange={e => onChangeFormInput(FormInputName.email)(e.target.value)}
              error={formErrors.email && formErrors.email[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="zipCode"
              label="CEP (opcional)"
              placeholder="Digite o CEP da empresa"
              value={formData[FormInputName.zipCode]}
              onChange={e => onChangeFormInput(FormInputName.zipCode)(e.target.value)}
              error={formErrors.zipCode && formErrors.zipCode[0]}
            />
          </FormGroup>

          <Row>
            <Col md={4} className="pl-0">
              <FormGroup className="mb-2">
                <SelectCustom
                  name="state"
                  label="Estado"
                  placeholder="SP"
                  value={formData[FormInputName.state]}
                  onChange={e => onChangeFormInput(FormInputName.state)(e?.target?.value as string)}
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
                  placeholder="Campinas"
                  value={formData[FormInputName.city]}
                  onChange={e => onChangeFormInput(FormInputName.city)(e?.target.value as string)}
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
              value={formData[FormInputName.district]}
              onChange={e => onChangeFormInput(FormInputName.district)(e.target.value)}
              error={formErrors.district && formErrors.district[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="street"
              label="Logradouro"
              placeholder="Rua 123 da Costa"
              value={formData[FormInputName.street]}
              onChange={e => onChangeFormInput(FormInputName.street)(e.target.value)}
              error={formErrors.street && formErrors.street[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="number"
              label="Número"
              placeholder="Ex: 789"
              maxLength={6}
              value={formData[FormInputName.number]}
              onChange={e => onChangeFormInput(FormInputName.number)(e.target.value)}
              error={formErrors.number && formErrors.number[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="complement"
              label="Complemento"
              placeholder="Ex: Apto 12"
              value={formData[FormInputName.complement]}
              onChange={e => onChangeFormInput(FormInputName.complement)(e.target.value)}
              error={formErrors.complement && formErrors.complement[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="latitude"
              label="Latitude (opcional)"
              placeholder="Ex: 0º"
              maxLength={9}
              value={formData[FormInputName.latitude]}
              onChange={e => onChangeFormInput(FormInputName.latitude)(e.target.value)}
              error={formErrors.latitude && formErrors.latitude[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="longitude"
              label="Longitude (opcional)"
              placeholder="Ex: 0º"
              maxLength={9}
              value={formData[FormInputName.longitude]}
              onChange={e => onChangeFormInput(FormInputName.longitude)(e.target.value)}
              error={formErrors.longitude && formErrors.longitude[0]}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <FormGroup className="mb-2">
          <h5 className="mb-2">Informações financeiras</h5>
            <InputText
              name="pix"
              label="Chave PIX (opcional)"
              placeholder="CPF/CNPJ, telefone, e-mail ou chave aleatória"
              maxLength={18}
              value={formData[FormInputName.pix]}
              onChange={e => onChangeFormInput(FormInputName.pix)(e.target.value)}
            />
          </FormGroup>
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
                progressPending={false}
                numberRowsPerPage={15}
              />
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
              onShouldShowModal({
                value: ShouldShowModal.registerBankAccount,
                newTitleModal: (
                  <div className="d-flex">
                    <div
                      className="m-auto"
                      onClick={() => {
                        onShouldShowModal({
                          value: ShouldShowModal.registerCompany,
                          newTitleModal: 'Cadastrar nova empresa',
                        });
                      }}
                    >
                      <ArrowLeft color={colors.black} width="30" height="30" className="m-auto" />
                    </div>
                    <h5 className="header-title-text modal__title ml-3 mb-0">
                      Adicionar conta bancária
                    </h5>
                  </div>
                ),
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
