import React, { useRef } from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { Button, InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { isValid as isValidCEP } from '@/helpers/masks/cep';
// import subPdv from '@/model/SubPdv';
import cep from 'cep-promise';
import { statesUf } from '@/constant/states';
import { CustomTable } from '@/components/Table';
import { ReactComponent as CloseX } from '@/assets/images/svg/closeX.svg';
import User from '@/model/User';
import { columnsUser } from '../../screens/List/ui/table';
import { ContractorControllerUser } from '../../types';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  controllerAppendUser: ContractorControllerUser;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  document = 'document',
  telephone = 'telephone',
  email = 'email',
  imageBase64 = 'imageBase64',
  facebookUrl = 'facebookUrl',
  instagramUrl = 'instagramUrl',
  twitterUrl = 'twitterUrl',
  linkedinUrl = 'linkedinUrl',
  address = 'address',
  zipCode = 'zipCode',
  state = 'state',
  city = 'city',
  district = 'district',
  street = 'street',
  complement = 'complement',
  number = 'number',
  latitude = 'latitude',
  longitude = 'longitude',
  batchClosed = 'batchClosed',
  askPasswordInactivity = 'askPasswordInactivity',
  inactivityTimeout = 'inactivityTimeout',
  pdv = 'pdv',
  user = 'user',
}

export const RegisterContentSubPdv: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
  controllerAppendUser,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refSelectUser = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onClearSelectUser = () => {
    if (refSelectUser) {
      refSelectUser?.current.clearValue();
    }
  };

  const dataTableUser = controllerAppendUser.usersSelected?.map((item, index) => ({
    id: item.id,
    name: item.name,
    login: item.cpf,
    actions: (
      <CloseX
        className="mr-2 svg-icon action-icon"
        onClick={() => {
          controllerAppendUser.handleRemoveUser(index);
        }}
      />
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
          <h5 className="mb-5 border-bottom-title">Informações gerais e endereço</h5>
          <InputText
            name="name"
            label="Nome do Sub PDV"
            placeholder="Digite o nome do Sub PDV"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
          <InputText
            name="document"
            label="CPF/CNPJ"
            placeholder="Digite o CPF ou CNPJ do Sub PDV"
            maxLength={18}
            value={formData[FormInputName.document]}
            onChange={e => onChangeFormInput(FormInputName.document)(e.target.value)}
            error={formErrors.document && formErrors.document[0]}
          />
          <InputText
            name="zipCode"
            label="CEP"
            placeholder="Digite o CEP do Sub PDV"
            maxLength={9}
            value={formData[FormInputName.zipCode]}
            onChange={e => {
              onChangeFormInput(FormInputName.zipCode)(e.target.value);
              if (e.target.value.length === 9 && isValidCEP(e.target.value)) {
                cep(e.target.value).then(data => {
                  onChangeFormInput(FormInputName.state)(data.state);
                  onChangeFormInput(FormInputName.city)(data.city);
                  onChangeFormInput(FormInputName.district)(data.neighborhood);
                  onChangeFormInput(FormInputName.street)(data.street);
                });
              }
            }}
            error={formErrors.zipCode && formErrors.zipCode[0]}
          />
          {/* TO-DO: add select state and city */}
          <Row>
            <Col md={4} className="pl-0">
              <SelectCustom
                id="subpdvState"
                name="state"
                label="Estado"
                placeholder="SP"
                value={formData[FormInputName.state]}
                onChange={e => onChangeFormInput(FormInputName.state)(e?.target?.value as string)}
                error={formErrors.state && formErrors.state[0]}
                options={statesUf}
              />
            </Col>
            <Col md={8} className="pr-0">
              <InputText
                id="subpdvCity"
                name="city"
                label="Cidade"
                placeholder="Campinas"
                value={formData[FormInputName.city]}
                onChange={e => onChangeFormInput(FormInputName.city)(e?.target.value as string)}
                error={formErrors.city && formErrors.city[0]}
              />
            </Col>
          </Row>
          <InputText
            name="district"
            label="Bairro"
            placeholder="Centro"
            value={formData[FormInputName.district]}
            onChange={e => onChangeFormInput(FormInputName.district)(e.target.value)}
            error={formErrors.district && formErrors.district[0]}
          />
          <InputText
            name="street"
            label="Logradouro"
            placeholder="Rua 123 da Costa"
            value={formData[FormInputName.street]}
            onChange={e => onChangeFormInput(FormInputName.street)(e.target.value)}
            error={formErrors.street && formErrors.street[0]}
          />
          <InputText
            name="number"
            label="Número"
            placeholder="Ex: 789"
            maxLength={6}
            value={formData[FormInputName.number]}
            onChange={e => onChangeFormInput(FormInputName.number)(e.target.value)}
            error={formErrors.number && formErrors.number[0]}
          />
          <InputText
            name="complement"
            label="Complemento"
            placeholder="Ex: Apto 12"
            value={formData[FormInputName.complement]}
            onChange={e => onChangeFormInput(FormInputName.complement)(e.target.value)}
            error={formErrors.complement && formErrors.complement[0]}
          />
          <InputText
            name="latitude"
            label="Latitude (opcional)"
            placeholder="Ex: 0º"
            maxLength={9}
            value={formData[FormInputName.latitude]}
            onChange={e => onChangeFormInput(FormInputName.latitude)(e.target.value)}
            error={formErrors.latitude && formErrors.latitude[0]}
          />
          <InputText
            name="longitude"
            label="Longitude (opcional)"
            placeholder="Ex: 0º"
            maxLength={9}
            value={formData[FormInputName.longitude]}
            onChange={e => onChangeFormInput(FormInputName.longitude)(e.target.value)}
            error={formErrors.longitude && formErrors.longitude[0]}
          />
          <h5 className="mb-5 border-bottom-title">Informações complementares</h5>
          <InputText
            name="telephone"
            label="Telefone celular"
            placeholder="(00) 0 0000-0000"
            maxLength={15}
            value={formData[FormInputName.telephone]}
            onChange={e => onChangeFormInput(FormInputName.telephone)(e.target.value)}
            error={formErrors.telephone && formErrors.telephone[0]}
          />
          <InputText
            name="email"
            label="E-mail Sub PDV (opcional)"
            placeholder="email@teste.com.br"
            value={formData[FormInputName.email]}
            onChange={e => onChangeFormInput(FormInputName.email)(e.target.value)}
            error={formErrors.email && formErrors.email[0]}
          />
          <InputText
            name="instagramUrl"
            label="Instagram do Sub PDV (opcional)"
            placeholder=""
            value={formData[FormInputName.instagramUrl]}
            onChange={e => onChangeFormInput(FormInputName.instagramUrl)(e.target.value)}
            error={formErrors.instagramUrl && formErrors.instagramUrl[0]}
          />
          <InputText
            name="facebookUrl"
            label="Facebook do Sub PDV (opcional)"
            placeholder=""
            value={formData[FormInputName.facebookUrl]}
            onChange={e => onChangeFormInput(FormInputName.facebookUrl)(e.target.value)}
            error={formErrors.facebookUrl && formErrors.facebookUrl[0]}
          />
          <InputText
            name="telephone"
            label="LinkedIn do Sub PDV (opcional)"
            placeholder=""
            value={formData[FormInputName.linkedinUrl]}
            onChange={e => onChangeFormInput(FormInputName.linkedinUrl)(e.target.value)}
            error={formErrors.linkedinUrl && formErrors.linkedinUrl[0]}
          />
          {/* TO-DO: add input file Map and Image SubPdv */}
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <h5 className="mt-5 mb-5 border-bottom-title fw-700">Usuários do Sub PDV</h5>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <FormGroup className="mb-2">
            <SelectCustom
              name="user"
              label="Usuário do Sub PDV"
              placeholder="Digite ou selecione o usuário do Sub PDV"
              refSelect={refSelectUser}
              value={formData[FormInputName.user]}
              onChange={e => onChangeFormInput(FormInputName.user)(e?.value as string)}
              error={formErrors.user && formErrors.user[0]}
              options={controllerAppendUser.listUsers.map((itemUser: User) => ({
                label: itemUser.name,
                value: itemUser.id,
              }))}
              isClearable
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <div style={{ padding: '37px 0' }}>
            <Button
              title="Inserir usuário"
              theme="noneBorder"
              onClick={() => {
                controllerAppendUser.handleAddUser(formData[FormInputName.user]);
                onClearSelectUser();
              }}
              disabled={
                formData[FormInputName.user] === undefined ||
                formData[FormInputName.user] === '' ||
                formData[FormInputName.user] === null
              }
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={7}>
          <h5 className="mb-4 border-bottom-title fw-400">Usuários inseridos no Sub PDV</h5>
          {controllerAppendUser.usersSelected.length > 0 ? (
            <CustomTable
              columns={columnsUser}
              data={dataTableUser}
              theme="tertiary"
              progressPending={false}
              numberRowsPerPage={1}
            />
          ) : (
            <>
              <div style={{ padding: '10px 0 20px 0', color: '#A5A5A5' }}>
                Você ainda não inseriu nenhum usuário neste Sub PDV.
              </div>
              <div style={{ color: '#A5A5A5', paddingBottom: '30px' }}>
                Aqui será exibida uma lista dos usuários inseridos neste Sub PDV.
              </div>
            </>
          )}
        </Col>
      </Row>
    </Form>
  );
};
