import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { OptionProps } from '@/components/Select';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  cpf = 'cpf',
  rg = 'rg',
  cellPhone = 'cellPhone',
  telephone = 'telephone',
  email = 'email',
  gender = 'gender',
  birthDate = 'birthDate',
  motherName = 'motherName',
  imageBase64 = 'imageBase64',
  zipCode = 'zipCode',
  state = 'state',
  city = 'city',
  district = 'district',
  street = 'street',
  complement = 'complement',
  number = 'number',
}

const stateOptions: OptionProps[] = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapa' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceara' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espirito Santo' },
  { value: 'GO', label: 'Goias' },
  { value: 'MA', label: 'Maranhao' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Para' },
  { value: 'PB', label: 'Paraiba' },
  { value: 'PR', label: 'Parana' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piaui' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondonia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'Sao Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
}) => (
  <Form
    noValidate={true}
    onSubmit={(e): void => {
      e.preventDefault();
    }}
  >
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="name"
            label="Nome do cliente"
            placeholder="Digite o nome do client"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            value={formData[FormInputName.cpf]}
            onChange={e => onChangeFormInput(FormInputName.cpf)(e.target.value)}
            error={formErrors.cpf && formErrors.cpf[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="rg"
            label="RG"
            placeholder="Digite o RG do client"
            value={formData[FormInputName.rg]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.rg)(e.target.value)}
            error={formErrors.rg && formErrors.rg[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="cellPhone"
            label="Celular"
            placeholder="(00) 00000-0000"
            value={formData[FormInputName.cellPhone]}
            onChange={e => onChangeFormInput(FormInputName.cellPhone)(e.target.value)}
            error={formErrors.cellPhone && formErrors.cellPhone[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="telephone"
            label="Telefone"
            placeholder="(00) 0000-0000"
            value={formData[FormInputName.telephone]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.telephone)(e.target.value)}
            error={formErrors.telephone && formErrors.telephone[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="email"
            label="E-mail"
            placeholder="Digite o e-mail do client"
            value={formData[FormInputName.email]}
            onChange={e => onChangeFormInput(FormInputName.email)(e.target.value)}
            error={formErrors.email && formErrors.email[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <SelectCustom
            name="gender"
            label="Gênero"
            value={formData[FormInputName.gender]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.gender)(e?.value as string)}
            options={[
              {
                value: 'O',
                label: 'Outros',
              },
              {
                value: 'M',
                label: 'Masculino',
              },
              {
                value: 'F',
                label: 'Feminino',
              },
            ]}
            error={formErrors.gender && formErrors.gender[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="birthDate"
            label="Data de Nascimento"
            placeholder="00/00/0000"
            disabled={true}
            value={formData[FormInputName.birthDate]}
            onChange={e => onChangeFormInput(FormInputName.birthDate)(e.target.value)}
            error={formErrors.birthDate && formErrors.birthDate[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="motherName"
            label="Nome da mãe"
            placeholder="Digite o nome da mãe do client"
            value={formData[FormInputName.motherName]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.motherName)(e.target.value)}
            error={formErrors.motherName && formErrors.motherName[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <h5 className="mb-2 border-bottom-title mb-5">Endereço</h5>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="zipCode"
            label="CEP"
            placeholder="Digite o CEP"
            value={formData[FormInputName.zipCode]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.zipCode)(e.target.value)}
            error={formErrors.zipCode && formErrors.zipCode[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <SelectCustom
            name="state"
            label="Estado"
            value={formData[FormInputName.state]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.state)(e?.value as string)}
            options={stateOptions}
            error={formErrors.state && formErrors.state[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="city"
            label="Cidade"
            placeholder="Digite a cidade"
            value={formData[FormInputName.city]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.city)(e.target.value)}
            error={formErrors.city && formErrors.city[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="district"
            label="Bairro"
            placeholder="Digite o bairro"
            value={formData[FormInputName.district]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.district)(e.target.value)}
            error={formErrors.district && formErrors.district[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="street"
            label="Logradouro"
            placeholder="Digite o logradouro"
            value={formData[FormInputName.street]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.street)(e.target.value)}
            error={formErrors.street && formErrors.street[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="number"
            label="Número"
            placeholder="Digite o número"
            value={formData[FormInputName.number]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.number)(e.target.value)}
            error={formErrors.number && formErrors.number[0]}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="complement"
            label="Complemento"
            placeholder="Digite o complemento"
            value={formData[FormInputName.complement]}
            disabled={true}
            onChange={e => onChangeFormInput(FormInputName.complement)(e.target.value)}
            error={formErrors.complement && formErrors.complement[0]}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);
