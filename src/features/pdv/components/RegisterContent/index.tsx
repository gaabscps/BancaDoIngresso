import React from 'react';
import { Col, Form, Row } from 'reactstrap';
import { InputText, Button } from '@/components';
import useForm from '@/hooks/useForm';
// import validators from '@/helpers/validators';
// import { updateMask as updateMaskCPF } from '@/helpers/masks/cpf';
// import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import SelectAutoComplete from '@/components/Select';
import ButtonGroup from '@/components/ButtonGroup';
import Pdv from '@/model/Pdv';

interface RegisterContentProps {
  document?: string;
  onSubmit: (value: any) => void;
  dataList?: Pdv;
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
  // users: string[];
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  document,
  onSubmit,
  dataList,
}) => {
  const { formData, formErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      name: dataList?.name ?? '',
      document: dataList?.document ?? '',
      telephone: dataList?.telephone ?? '',
      email: dataList?.email ?? '',
      imageBase64: dataList?.imageBase64 ?? '',
      facebookUrl: dataList?.facebookUrl ?? '',
      instagramUrl: dataList?.instagramUrl ?? '',
      twitterUrl: dataList?.twitterUrl ?? '',
      linkedinUrl: dataList?.linkedinUrl ?? '',
      zipCode: dataList?.address.zipCode ?? '',
      state: dataList?.address.state ?? '',
      city: dataList?.address.city ?? '',
      district: dataList?.address.district ?? '',
      street: dataList?.address.street ?? '',
      complement: dataList?.address.complement ?? '',
      number: dataList?.address.number ?? '',
      latitude: String(dataList?.address.latitude) ?? '',
      longitude: String(dataList?.address.longitude) ?? '',
      batchClosed: dataList?.batchClosed ?? '',
      askPasswordInactivity: dataList?.askPasswordInactivity ?? '',
      inactivityTimeout: dataList?.inactivityTimeout ?? '',
      // users: [],
    },
    validators: {
      // name: [validators.required],
      // state: [validators.required],
      // document: [validators.required, validators.cpf],
      // zipCode: [validators.required, validators.cep],
    },
    formatters: {
      //   document: updateMaskCPF,
      //   zipCode: updateMaskCEP,
    },
  });

  const handleOnRegister = (): void => {
    console.log('form before valid', formData);
    if (isFormValid()) {
      // TODO: change type to Pdv

      const payload: any = {
        id: dataList?.id ?? null,
        name: formData[FormInputName.name],
        document: formData[FormInputName.document],
        telephone: formData[FormInputName.telephone],
        email: formData[FormInputName.email],
        imageBase64: formData[FormInputName.imageBase64],
        facebookUrl: formData[FormInputName.facebookUrl],
        instagramUrl: formData[FormInputName.instagramUrl],
        twitterUrl: formData[FormInputName.twitterUrl],
        linkedinUrl: formData[FormInputName.linkedinUrl],
        batchClosed: formData[FormInputName.batchClosed],
        askPasswordInactivity: formData[FormInputName.askPasswordInactivity],
        inactivityTimeout: formData[FormInputName.inactivityTimeout],
        address: {
          id: dataList?.address.id ?? null,
          zipCode: formData[FormInputName.zipCode],
          state: formData[FormInputName.state],
          city: formData[FormInputName.city],
          district: formData[FormInputName.district],
          street: formData[FormInputName.street],
          complement: formData[FormInputName.complement],
          number: formData[FormInputName.number],
          latitude: formData[FormInputName.latitude],
          longitude: formData[FormInputName.longitude],
        },
        // users: [],
      };
      if (payload.id === null) {
        delete payload.id;
        delete payload.adrress.id;
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
            label="Nome do PDV"
            placeholder="Digite o nome do PDV"
            // maxLength={9}
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
          <InputText
            name="document"
            label="CPF/CNPJ"
            placeholder="Digite o CPF ou CNPJ do PDV"
            maxLength={14}
            value={formData[FormInputName.document]}
            onChange={e => onChangeFormInput(FormInputName.document)(e.target.value)}
            error={formErrors.document && formErrors.document[0]}
          />
          <InputText
            name="email"
            label="E-mail"
            placeholder="Digite o e-mail do PDV"
            maxLength={14}
            value={formData[FormInputName.email]}
            onChange={e => onChangeFormInput(FormInputName.email)(e.target.value)}
            error={formErrors.email && formErrors.email[0]}
          />
          <InputText
            name="zipCode"
            label="CEP"
            placeholder="Digite o CEP do PDV"
            maxLength={9}
            value={formData[FormInputName.zipCode]}
            onChange={e => onChangeFormInput(FormInputName.zipCode)(e.target.value)}
            error={formErrors.zipCode && formErrors.zipCode[0]}
          />
          {/* TODO: add select state and city */}
          <SelectAutoComplete
            name="state"
            label="Estado"
            options={[
              { value: 'SP', label: 'SP' },
              { value: 'RJ', label: 'RJ' },
              { value: 'MG', label: 'MG' },
            ]}
            placeholder="Selecione o estado do PDV"
            value={formData[FormInputName.state]}
            onChange={e => onChangeFormInput(FormInputName.state)(e?.value as string)}
            error={formErrors.state && formErrors.state[0]}
          />
          <SelectAutoComplete
            name="city"
            label="Cidade"
            options={[
              { value: 'SP city', label: 'Cidade São Paulo' },
              { value: 'RJ city', label: 'Cidade Rio de Janeiro' },
              { value: 'MG city', label: 'Cidade Minas Gerais' },
            ]}
            placeholder="Selecione o estado do PDV"
            value={formData[FormInputName.city]}
            onChange={e => onChangeFormInput(FormInputName.city)(e?.value as string)}
            error={formErrors.city && formErrors.city[0]}
          />
          <InputText
            name="street"
            label="Bairro"
            placeholder="Centro"
            maxLength={15}
            value={formData[FormInputName.street]}
            onChange={e => onChangeFormInput(FormInputName.street)(e.target.value)}
            error={formErrors.street && formErrors.street[0]}
          />
          <InputText
            name="district"
            label="Logradouro"
            placeholder="Rua 123 da Costa"
            maxLength={15}
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
            maxLength={15}
            value={formData[FormInputName.complement]}
            onChange={e => onChangeFormInput(FormInputName.complement)(e.target.value)}
            error={formErrors.complement && formErrors.complement[0]}
          />
          <InputText
            name="latitude"
            label="Latitude (opcional)"
            placeholder="Ex: 0º"
            maxLength={15}
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
            label="Instagram do PDV (opcional)"
            placeholder=""
            value={formData[FormInputName.instagramUrl]}
            onChange={e => onChangeFormInput(FormInputName.instagramUrl)(e.target.value)}
            error={formErrors.instagramUrl && formErrors.instagramUrl[0]}
          />
          <InputText
            name="facebookUrl"
            label="Facebook do PDV (opcional)"
            placeholder=""
            value={formData[FormInputName.facebookUrl]}
            onChange={e => onChangeFormInput(FormInputName.facebookUrl)(e.target.value)}
            error={formErrors.facebookUrl && formErrors.facebookUrl[0]}
          />
          <InputText
            name="telephone"
            label="LinkedIn do PDV (opcional)"
            placeholder=""
            value={formData[FormInputName.linkedinUrl]}
            onChange={e => onChangeFormInput(FormInputName.linkedinUrl)(e.target.value)}
            error={formErrors.linkedinUrl && formErrors.linkedinUrl[0]}
          />
          {/* TODO: add input file Map and Image PDV */}
          <ButtonGroup
            label="Lote encerrado?"
            name="batchClosed"
            onChange={e => onChangeFormInput(FormInputName.batchClosed)(e.target.value)}
            options={[
              { value: 0, label: 'Sim' },
              { value: 1, label: 'não' },
            ]}
            error={formErrors.batchClosed && formErrors.batchClosed[0]}
          />
          <ButtonGroup
            label="Pedir senha após inatividade?"
            name="askPasswordInactivity"
            onChange={e => onChangeFormInput(FormInputName.askPasswordInactivity)(e.target.value)}
            options={[
              { value: 0, label: 'Sim' },
              { value: 1, label: 'não' },
            ]}
            error={formErrors.askPasswordInactivity && formErrors.askPasswordInactivity[0]}
          />
          <InputText
            name="inactivityTimeout"
            label="Tempo limite de inatividade"
            placeholder="00:00"
            max={5}
            value={formData[FormInputName.inactivityTimeout]}
            onChange={e => onChangeFormInput(FormInputName.inactivityTimeout)(e.target.value)}
            error={formErrors.inactivityTimeout && formErrors.inactivityTimeout[0]}
          />
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
