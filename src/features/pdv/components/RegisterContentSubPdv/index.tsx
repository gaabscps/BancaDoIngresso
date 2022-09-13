import React from 'react';
import { Col, Form, Row } from 'reactstrap';
import { InputText, Button } from '@/components';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPF } from '@/helpers/masks/cpf';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
// import SelectAutoComplete from '@/components/Select';
import subPdv from '@/model/SubPdv';

interface RegisterContentProps {
  document?: string;
  onSubmit: (value: any) => void;
  dataList?: subPdv;
}

// eslint-disable-next-line no-shadow
enum FormInputName {
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
}

export const RegisterContentSubPdv: React.FC<RegisterContentProps> = ({
  document,
  onSubmit,
  dataList,
}) => {
  const { formData, formErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      name: dataList?.name ?? '',
      document: dataList?.document ?? '',

      zipCode: dataList?.address.zipCode ?? '',
      state: dataList?.address.state ?? '',
      city: dataList?.address.city ?? '',
      district: dataList?.address.district ?? '',
      street: dataList?.address.street ?? '',
      number: dataList?.address.number ?? '',
      complement: dataList?.address.complement ?? '',
      latitude: dataList?.address.latitude ?? '',
      longitude: dataList?.address.longitude ?? '',
      telephone: dataList?.telephone ?? '',
      email: dataList?.email ?? '',
      instagramUrl: dataList?.instagramUrl ?? '',
      facebookUrl: dataList?.facebookUrl ?? '',
      linkedinUrl: dataList?.linkedinUrl ?? '',
      twitterUrl: dataList?.twitterUrl ?? '',

      // users: [],
    },
    validators: {
      name: [validators.required],
      document: [validators.required, validators.cpf],
      zipCode: [validators.required, validators.cep],
      state: [validators.required],
      city: [validators.required],
      district: [validators.required],
      street: [validators.required],
      number: [validators.required],
      telephone: [validators.required, validators.mobilePhone],
      email: [validators.required, validators.email],
      // users: [validators.required],
    },
    formatters: {
      document: updateMaskCPF,
      zipCode: updateMaskCEP,
      telephone: updateMaskMobilePhone,
    },
  });

  const handleOnRegister = (): void => {
    console.log('form before valid', formData);
    if (isFormValid()) {
      // TODO: change type to subPdv

      const payload: any = {
        id: dataList?.id ?? null,
        name: formData[FormInputName.name],
        document: formData[FormInputName.document],
        telephone: formData[FormInputName.telephone],
        email: formData[FormInputName.email],
        facebookUrl: formData[FormInputName.facebookUrl],
        instagramUrl: formData[FormInputName.instagramUrl],
        twitterUrl: formData[FormInputName.twitterUrl],
        linkedinUrl: formData[FormInputName.linkedinUrl],
        address: {
          id: dataList?.address.id ?? null,
          zipCode: formData[FormInputName.zipCode],
          // zipCode: formData[FormInputName.zipCode],
          state: formData[FormInputName.state],
          city: formData[FormInputName.city],
          district: formData[FormInputName.district],
          street: formData[FormInputName.street],
          complement: formData[FormInputName.complement],
          number: formData[FormInputName.number],
          latitude: formData[FormInputName.latitude],
          longitude: formData[FormInputName.longitude],
        },
        pdv: {
          id: 'd0c9e4e4-6d56-4145-8a19-d6fa37425f35',
        },
        // users: [],
      };
      if (payload.id === null) {
        delete payload.id;
        delete payload.address.id;
      }
      onSubmit(payload);
    }
  };

  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
        handleOnRegister();
      }}
    >
      <Row>
        <Col md={10}>
          <h5>Informações gerais e endereço</h5>
          <InputText
            name="name"
            label="Nome do SubPdv"
            placeholder="Digite o nome do SubPdv"
            // maxLength={9}
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
          <InputText
            name="document"
            label="CPF/CNPJ"
            placeholder="Digite o CPF ou CNPJ do SubPdv"
            maxLength={14}
            value={formData[FormInputName.document]}
            onChange={e => onChangeFormInput(FormInputName.document)(e.target.value)}
            error={formErrors.document && formErrors.document[0]}
          />
          <InputText
            name="email"
            label="E-mail"
            placeholder="Digite o e-mail do SubPdv"
            value={formData[FormInputName.email]}
            onChange={e => onChangeFormInput(FormInputName.email)(e.target.value)}
            error={formErrors.email && formErrors.email[0]}
          />
          <InputText
            name="zipCode"
            label="CEP"
            placeholder="Digite o CEP do SubPdv"
            maxLength={9}
            value={formData[FormInputName.zipCode]}
            onChange={e => onChangeFormInput(FormInputName.zipCode)(e.target.value)}
            error={formErrors.zipCode && formErrors.zipCode[0]}
          />
          {/* TODO: add select state and city */}
          <InputText
            name="state"
            label="Estado"
            placeholder="Selecione o estado do SubPdv"
            value={formData[FormInputName.state]}
            onChange={e => onChangeFormInput(FormInputName.state)(e?.target.value as string)}
            error={formErrors.state && formErrors.state[0]}
          />
          <InputText
            name="city"
            label="Cidade"
            placeholder="Selecione o estado do SubPdv"
            value={formData[FormInputName.city]}
            onChange={e => onChangeFormInput(FormInputName.city)(e?.target.value as string)}
            error={formErrors.city && formErrors.city[0]}
          />
          <InputText
            name="street"
            label="Bairro"
            placeholder="Centro"
            value={formData[FormInputName.street]}
            onChange={e => onChangeFormInput(FormInputName.street)(e.target.value)}
            error={formErrors.street && formErrors.street[0]}
          />
          <InputText
            name="district"
            label="Logradouro"
            placeholder="Rua 123 da Costa"
            value={formData[FormInputName.district]}
            onChange={e => onChangeFormInput(FormInputName.district)(e.target.value)}
            error={formErrors.district && formErrors.district[0]}
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
          <h5>Informações complementares</h5>
          <InputText
            name="telephone"
            label="Telefone celular"
            placeholder="(00) 0 000-0000"
            maxLength={15}
            value={formData[FormInputName.telephone]}
            onChange={e => onChangeFormInput(FormInputName.telephone)(e.target.value)}
            error={formErrors.telephone && formErrors.telephone[0]}
          />
          <InputText
            name="instagramUrl"
            label="Instagram do SubPdv (opcional)"
            placeholder=""
            value={formData[FormInputName.instagramUrl]}
            onChange={e => onChangeFormInput(FormInputName.instagramUrl)(e.target.value)}
            error={formErrors.instagramUrl && formErrors.instagramUrl[0]}
          />
          <InputText
            name="facebookUrl"
            label="Facebook do SubPdv (opcional)"
            placeholder=""
            value={formData[FormInputName.facebookUrl]}
            onChange={e => onChangeFormInput(FormInputName.facebookUrl)(e.target.value)}
            error={formErrors.facebookUrl && formErrors.facebookUrl[0]}
          />
          <InputText
            name="telephone"
            label="LinkedIn do SubPdv (opcional)"
            placeholder=""
            value={formData[FormInputName.linkedinUrl]}
            onChange={e => onChangeFormInput(FormInputName.linkedinUrl)(e.target.value)}
            error={formErrors.linkedinUrl && formErrors.linkedinUrl[0]}
          />
          {/* TODO: add input file Map and Image SubPdv */}
        </Col>
      </Row>
      <hr />
      <div className="d-flex justify-content-end">
        {/* //:TODO !important add type props to "button" */}
        <h1>{document}</h1>
        <Button title="Salvar" type="button" onClick={handleOnRegister} />
      </div>
    </Form>
  );
};
