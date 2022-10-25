import React, { useRef } from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, ButtonGroup, SelectCustom, InputFile, Button } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { isValid as isValidCEP } from '@/helpers/masks/cep';
import cep from 'cep-promise';
import { statesUf } from '@/constant/states';
import { ContractorControllerUser, NameFiles } from '@/features/pdv/types';
import { CustomTable } from '@/components/Table';
import { ReactComponent as CloseX } from '@/assets/images/svg/closeX.svg';
import { columnsUser } from '@/features/contractor/screens/List/ui/table';
import User from '@/model/User';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  nameFiles: NameFiles;
  onChangeFormInput: OnChangeFormInput;
  setErrorsPdv: (errors: FormErrors) => void;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
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
  mapBase64 = 'mapBase64',
  user = 'user',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  nameFiles,
  setErrorsPdv,
  onChangeFormInput,
  onChangeFileInput,
  controllerAppendUser,
}) => {
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
          <FormGroup className="mb-2">
            <InputText
              name="name"
              label="Nome do PDV"
              placeholder="Digite o nome do PDV"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
              error={formErrors.name && formErrors.name[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="document"
              label="CPF/CNPJ"
              placeholder="Digite o CPF ou CNPJ do PDV"
              maxLength={18}
              value={formData[FormInputName.document]}
              onChange={e => onChangeFormInput(FormInputName.document)(e.target.value)}
              error={formErrors.document && formErrors.document[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="zipCode"
              label="CEP"
              placeholder="Digite o CEP do PDV"
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

                    setErrorsPdv({
                      ...formErrors,
                      zipCode: [''],
                      state: [''],
                      city: [''],
                      district: [''],
                      street: [''],
                      // TODO: Melhorar esta solução
                      name: [''],
                      document: [''],
                      number: [''],
                      telephone: [''],
                      email: [''],
                      mapBase64: [''],
                      batchClosed: [''],
                      askPasswordInactivity: [''],
                      inactivityTimeout: [''],
                    });
                  });
                }
              }}
              onBlur={e => onChangeFormInput(FormInputName.zipCode)(e.target.value)}
              error={formErrors.zipCode && formErrors.zipCode[0]}
            />
          </FormGroup>
          {/* TO-DO: add select state and city */}
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

          <h5 className="border-bottom-title mb-5 ">Informações complementares e usuário</h5>
          <FormGroup className="mb-2">
            <InputText
              name="telephone"
              label="Telefone celular"
              placeholder="(00) 0 0000-0000"
              maxLength={15}
              value={formData[FormInputName.telephone]}
              onChange={e => onChangeFormInput(FormInputName.telephone)(e.target.value)}
              error={formErrors.telephone && formErrors.telephone[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="email"
              label="E-mail PDV (opcional)"
              placeholder="email@teste.com.br"
              value={formData[FormInputName.email]}
              onChange={e => onChangeFormInput(FormInputName.email)(e.target.value)}
              error={formErrors.email && formErrors.email[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="instagramUrl"
              label="Instagram do PDV (opcional)"
              placeholder=""
              value={formData[FormInputName.instagramUrl]}
              onChange={e => onChangeFormInput(FormInputName.instagramUrl)(e.target.value)}
              error={formErrors.instagramUrl && formErrors.instagramUrl[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="facebookUrl"
              label="Facebook do PDV (opcional)"
              placeholder=""
              value={formData[FormInputName.facebookUrl]}
              onChange={e => onChangeFormInput(FormInputName.facebookUrl)(e.target.value)}
              error={formErrors.facebookUrl && formErrors.facebookUrl[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="linkedinUrl"
              label="LinkedIn do PDV (opcional)"
              placeholder=""
              value={formData[FormInputName.linkedinUrl]}
              onChange={e => onChangeFormInput(FormInputName.linkedinUrl)(e.target.value)}
              error={formErrors.linkedinUrl && formErrors.linkedinUrl[0]}
            />
          </FormGroup>
          {/* TO-DO: add input file Map and Image PDV */}

          <FormGroup className="mb-2">
            <InputFile
              name="mapBase64"
              label="Mapa"
              placeholder=""
              fileName={nameFiles?.mapBase64}
              onChange={e =>
                onChangeFileInput(FormInputName.mapBase64)(
                  (e.target as HTMLInputElement)?.files?.[0],
                )
              }
              error={formErrors.mapBase64 && formErrors.mapBase64[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputFile
              name="imageBase64"
              label="Imagem do PDV"
              placeholder=""
              fileName={nameFiles?.imageBase64}
              onChange={e =>
                onChangeFileInput(FormInputName.imageBase64)(
                  (e.target as HTMLInputElement)?.files?.[0],
                )
              }
              error={formErrors.imageBase64 && formErrors.imageBase64[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <ButtonGroup
              label="Lote encerrado?"
              name="batchClosed"
              value={formData[FormInputName.batchClosed]}
              onChange={e => onChangeFormInput(FormInputName.batchClosed)(e.target.value)}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={formErrors.batchClosed && formErrors.batchClosed[0]}
            />
          </FormGroup>

          <Row>
            <Col md={6} className="pl-0">
              <FormGroup className="mb-2">
                <ButtonGroup
                  label="Pedir senha após inatividade?"
                  name="askPasswordInactivity"
                  value={formData[FormInputName.askPasswordInactivity]}
                  onChange={e =>
                    onChangeFormInput(FormInputName.askPasswordInactivity)(e.target.value)
                  }
                  options={[
                    { value: true, label: 'Sim' },
                    { value: false, label: 'Não' },
                  ]}
                  error={formErrors.askPasswordInactivity && formErrors.askPasswordInactivity[0]}
                />
              </FormGroup>
            </Col>
            <Col md={6} className="pr-0">
              <FormGroup className="mb-2">
                <InputText
                  type="time"
                  name="inactivityTimeout"
                  label="Tempo limite de inatividade"
                  placeholder="00:00"
                  max={5}
                  value={formData[FormInputName.inactivityTimeout]}
                  onChange={e => onChangeFormInput(FormInputName.inactivityTimeout)(e.target.value)}
                  error={formErrors.inactivityTimeout && formErrors.inactivityTimeout[0]}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <h5 className="mt-5 mb-5 border-bottom-title fw-700">Usuários do PDV</h5>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <FormGroup className="mb-2">
            <SelectCustom
              name="user"
              label="Usuário do PDV"
              placeholder="Digite ou selecione o usuário do PDV"
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
          <h5 className="mb-4 border-bottom-title fw-400">Usuários inseridos no PDV</h5>
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
                Você ainda não inseriu nenhum usuário neste PDV.
              </div>
              <div style={{ color: '#A5A5A5', paddingBottom: '30px' }}>
                Aqui será exibida uma lista dos usuários inseridos neste PDV.
              </div>
            </>
          )}
        </Col>
      </Row>
    </Form>
  );
};
