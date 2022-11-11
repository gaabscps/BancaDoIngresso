/* eslint-disable no-eval */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Button, ButtonGroup, InputFile, InputText, SelectCustom, TextArea } from '@/components';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { statesUf } from '@/constant/states';
import { ReactComponent as LinkIcon } from '@/assets/images/svg/Link.svg';
import { ReactComponent as Unlink } from '@/assets/images/svg/Unlink.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import '../../screens/GeneralInformation/ui/styles.scss';
import {
  ShouldShowModal,
  GeneralInformationContainerProps,
} from '@/features/registerEvent/screens/GeneralInformation/ui';
import { toast } from 'react-toastify';
import { isValid as isValidCEP } from '@/helpers/masks/cep';
import cep from 'cep-promise';
import { ContractorScreen } from '@/features/registerEvent/component/ContractorScreen';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  namePos = 'namePos',
  establishmentName = 'establishmentName',
  eventPlace = 'eventPlace',
  zipCode = 'zipCode',
  district = 'district',
  state = 'state',
  city = 'city',
  number = 'number',
  street = 'street',
  complement = 'complement',
  eventType = 'eventType',
  startDate = 'startDate',
  endDate = 'endDate',
  startTime = 'startTime',
  endTime = 'endTime',
  eventCategory = 'eventCategory',
  contractor = 'contractor',
  censure = 'censure',
  facebookUrl = 'facebookUrl',
  instagramUrl = 'instagramUrl',
  imageBase64 = 'imageBase64',
  imagePosBase64 = 'imagePosBase64',
  publishWebsite = 'publishWebsite',
  textSize = 'textSize',
  ticketPhrase = 'ticketPhrase',
  websiteDescription = 'websiteDescription',
  latitude = 'latitude',
  longitude = 'longitude',
}

// remove type formCategory of GeneralInformationContainerProps
export const GeneralInformationContent: React.FC<
  Omit<GeneralInformationContainerProps, 'formCategory' | 'formFatherEvent'>
> = ({
  formGeneralInformation,
  modalConfig,
  GeneralInformationActions,
  categoryStates,
  fatherEventStates,
  contractorState,
  contractorActions,
}) => {
  const history = useHistory();
  const {
    formData,
    onChangeFormFileInput,
    onChangeFormInput,
    setFormErrors,
    formErrors,
    formNameFiles,
  } = formGeneralInformation;

  const nameRef = React.useRef<HTMLInputElement>(null);
  const namePosRef = React.useRef<HTMLInputElement>(null);
  const establishmentNameRef = React.useRef<HTMLInputElement>(null);
  const eventPlaceRef = React.useRef<HTMLInputElement>(null);
  const zipCodeRef = React.useRef<HTMLInputElement>(null);
  const districtRef = React.useRef<HTMLInputElement>(null);
  const stateRef = React.useRef<HTMLSelectElement>(null);
  const cityRef = React.useRef<HTMLInputElement>(null);
  const numberRef = React.useRef<HTMLInputElement>(null);
  const streetRef = React.useRef<HTMLInputElement>(null);
  const complementRef = React.useRef<HTMLInputElement>(null);
  const eventTypeRef = React.useRef<HTMLSelectElement>(null);
  const startDateRef = React.useRef<HTMLInputElement>(null);
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const startTimeRef = React.useRef<HTMLInputElement>(null);
  const endTimeRef = React.useRef<HTMLInputElement>(null);
  const eventCategoryRef = React.useRef<HTMLSelectElement>(null);
  const contractorRef = React.useRef<HTMLSelectElement>(null);
  const censureRef = React.useRef<HTMLInputElement>(null);
  const facebookUrlRef = React.useRef<HTMLInputElement>(null);
  const instagramUrlRef = React.useRef<HTMLInputElement>(null);
  const publishWebsiteRef = React.useRef<HTMLInputElement>(null);
  const textSizeRef = React.useRef<HTMLInputElement>(null);
  const latitudeRef = React.useRef<HTMLInputElement>(null);
  const longitudeRef = React.useRef<HTMLInputElement>(null);

  const TypeEventsOptions = [
    { value: '0', label: 'Mono' },
    { value: '1', label: 'Pai' },
    { value: '2', label: 'Filho' },
  ];

  const isValidAddresswithCEP = (): boolean => {
    const { zipCode } = formData;
    return !(zipCode?.length === 9 && isValidCEP(zipCode));
  };

  const contratorDataSelected = contractorState.contractorList.find(
    item => item.id === formData.contractor,
  );

  const handleFocus = (): void => {
    const firstInputError = formErrors && Object.keys(formErrors).find(key => formErrors[key]);

    if (firstInputError) {
      const input = eval(`${firstInputError}Ref?.current`);
      // verify if return is element
      if (input instanceof Element) {
        input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        input?.inputRef?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  useEffect(() => {
    handleFocus();
  }, [formErrors]);

  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();

        GeneralInformationActions.onSave();
      }}
    >
      <div className="container-event">
        <h5 className="mb-2 border-bottom-title mb-5">Informações gerais</h5>
        <FormGroup className="mb-2">
          <SelectCustom
            // eslint-disable-next-line no-return-assign
            refSelect={eventTypeRef}
            name="eventType"
            label="Tipo de evento"
            placeholder="Digite ou selecione o tipo do evento"
            onChange={e => {
              onChangeFormInput(FormInputName.eventType)(e?.value as string);
            }}
            error={formErrors.eventType && formErrors.eventType[0]}
            value={formData[FormInputName.eventType]}
            options={TypeEventsOptions}
          />
          {formData[FormInputName.eventType] === '2' && (
            <div className="d-flex flex-column mb-5" style={{ marginTop: '-20px' }}>
              <span
                className="link-event-father text-success-link d-flex"
                onClick={() => {
                  modalConfig.onShouldShowModal({
                    value: ShouldShowModal.fatherEvent,
                    newTitleModal: 'Vincular evento Pai',
                  });
                }}
              >
                <div className="mt-1 mr-2">
                  <LinkIcon />
                </div>
                <div>vincular evento Pai</div>
              </span>
              {fatherEventStates?.fatherEvent ? (
                <span className="descrition-event-vinculation">
                  Evento Pai vinculado &gt;&gt;{' '}
                  <b className="linked-event">
                    {
                      fatherEventStates.fatherEventList.find(
                        valueFatherEvent => valueFatherEvent.id === fatherEventStates.fatherEvent,
                      ).name
                    }
                  </b>
                  <div
                    className="ml-4 link-black"
                    onClick={() => {
                      modalConfig.onShouldShowModal({
                        value: ShouldShowModal.fatherEvent,
                        newTitleModal: 'Alterar evento Pai',
                      });
                    }}
                  >
                    <Pen />
                  </div>
                  <div
                    className="ml-3 link-black"
                    onClick={() => {
                      fatherEventStates.setFatherEvent(null);
                      setFormErrors({
                        [FormInputName.eventType]: ['É necessário vincular o evento pai'],
                      });
                    }}
                  >
                    <Unlink title="Descincular" />
                  </div>
                </span>
              ) : null}
            </div>
          )}
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            refInput={nameRef}
            name="name"
            label="Nome do evento"
            placeholder="Digite o nome do evento. Ex: Baile do Dennis DJ"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            refInput={namePosRef}
            name="namePos"
            label="Nome do evento (POS)"
            placeholder="Digite o nome do evento na POS. Ex: Baile do DN.DJ"
            maxLength={12}
            value={formData[FormInputName.namePos]}
            onChange={e => onChangeFormInput(FormInputName.namePos)(e.target.value)}
            error={formErrors.namePos && formErrors.namePos[0]}
          />
          <div className="d-flex flex-column d-relative" style={{ marginTop: '-40px' }}>
            <span className="d-flex flex-end justify-content-end link-grey d-absolute">
              {formData[FormInputName.namePos]?.length || 0}/12
            </span>
          </div>
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            refInput={establishmentNameRef}
            name="establishmentName"
            label="Nome do estabelecimento"
            placeholder="Digite o nome do estabelecimento evento. Ex: Folk Valley"
            value={formData[FormInputName.establishmentName]}
            onChange={e => onChangeFormInput(FormInputName.establishmentName)(e.target.value)}
            error={formErrors.establishmentName && formErrors.establishmentName[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            refInput={eventPlaceRef}
            name="eventPlace"
            label="Local do evento"
            placeholder="Digite o local do evento. Ex: Rua Perimetral Leste, 123"
            value={formData[FormInputName.eventPlace]}
            onChange={e => onChangeFormInput(FormInputName.eventPlace)(e.target.value)}
            error={formErrors.eventPlace && formErrors.eventPlace[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            refInput={zipCodeRef}
            name="zipCode"
            label="CEP"
            placeholder="Digite o CEP da empresa"
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
        </FormGroup>

        <Row>
          <Col md={4} className="pl-0">
            <FormGroup className="mb-2">
              <SelectCustom
                refSelect={stateRef}
                name="state"
                label="Estado"
                placeholder="SP"
                value={formData[FormInputName.state]}
                onChange={e => onChangeFormInput(FormInputName.state)(e?.target?.value as string)}
                error={formErrors.state && formErrors.state[0]}
                options={statesUf}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={8} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                refInput={cityRef}
                name="city"
                label="Cidade"
                placeholder="Campinas"
                value={formData[FormInputName.city]}
                onChange={e => onChangeFormInput(FormInputName.city)(e?.target.value as string)}
                error={formErrors.city && formErrors.city[0]}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup className="mb-2">
          <InputText
            refInput={districtRef}
            name="district"
            label="Bairro"
            placeholder="Centro"
            value={formData[FormInputName.district]}
            onChange={e => onChangeFormInput(FormInputName.district)(e.target.value)}
            error={formErrors.district && formErrors.district[0]}
            disabled
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            refInput={streetRef}
            name="street"
            label="Logradouro"
            placeholder="Rua 123 da Costa"
            value={formData[FormInputName.street]}
            onChange={e => onChangeFormInput(FormInputName.street)(e.target.value)}
            error={formErrors.street && formErrors.street[0]}
            disabled
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            refInput={numberRef}
            name="number"
            label="Número"
            placeholder="Ex: 789"
            maxLength={6}
            value={formData[FormInputName.number]}
            onChange={e => onChangeFormInput(FormInputName.number)(e.target.value)}
            error={formErrors.number && formErrors.number[0]}
            disabled={isValidAddresswithCEP()}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            refInput={complementRef}
            name="complement"
            label="Complemento (opcional)"
            placeholder="Ex: Apto 12"
            value={formData[FormInputName.complement]}
            onChange={e => onChangeFormInput(FormInputName.complement)(e.target.value)}
            error={formErrors.complement && formErrors.complement[0]}
            disabled={isValidAddresswithCEP()}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            refInput={latitudeRef}
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
            refInput={longitudeRef}
            name="longitude"
            label="Longitude (opcional)"
            placeholder="Ex: 0º"
            maxLength={9}
            value={formData[FormInputName.longitude]}
            onChange={e => onChangeFormInput(FormInputName.longitude)(e.target.value)}
            error={formErrors.longitude && formErrors.longitude[0]}
          />
        </FormGroup>
        <Row>
          <Col md={6} className="pl-0">
            <FormGroup className="mb-2">
              <InputText
                refInput={startDateRef}
                type="date"
                name="startDate"
                label="Data início do Evento"
                value={formData[FormInputName.startDate]}
                onChange={e => onChangeFormInput(FormInputName.startDate)(e.target.value)}
                error={formErrors.startDate && formErrors.startDate[0]}
              />
            </FormGroup>
          </Col>
          <Col md={6} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                refInput={endDateRef}
                type="date"
                name="endDate"
                label="Data fim do Evento"
                value={formData[FormInputName.endDate]}
                onChange={e => onChangeFormInput(FormInputName.endDate)(e.target.value)}
                error={formErrors.endDate && formErrors.endDate[0]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="pl-0">
            <FormGroup className="mb-2">
              <InputText
                refInput={startTimeRef}
                type="time"
                name="startTime"
                label="Hora início do Evento"
                value={formData[FormInputName.startTime]}
                onChange={e => onChangeFormInput(FormInputName.startTime)(e.target.value)}
                error={formErrors.startTime && formErrors.startTime[0]}
              />
            </FormGroup>
          </Col>
          <Col md={6} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                refInput={endTimeRef}
                type="time"
                name="endTime"
                label="Hora fim do Evento"
                value={formData[FormInputName.endTime]}
                onChange={e => onChangeFormInput(FormInputName.endTime)(e.target.value)}
                error={formErrors.endTime && formErrors.endTime[0]}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="mb-2">
          <SelectCustom
            refSelect={eventCategoryRef}
            name="eventCategory"
            label="Categoria do evento"
            placeholder="Digite ou selecione a categoria do evento"
            onChange={e => {
              onChangeFormInput(FormInputName.eventCategory)(e?.value as string);
            }}
            error={formErrors.eventCategory && formErrors.eventCategory[0]}
            value={formData[FormInputName.eventCategory]}
            options={
              categoryStates?.categoryList?.map(optionCategory => ({
                value: optionCategory.id,
                label: optionCategory.name,
              })) || []
            }
          />
          <div className="d-flex flex-column mb-5" style={{ marginTop: '-20px' }}>
            <span className="d-flex">
              <div
                className="mr-5 link-green"
                onClick={() => {
                  modalConfig.onShouldShowModal({
                    value: ShouldShowModal.category,
                    newTitleModal: 'Cadastrar nova categoria',
                  });
                }}
              >
                + cadastrar nova categoria de evento
              </div>
              <div
                className="link-grey"
                onClick={() => {
                  if (formData[FormInputName.eventCategory] !== '') {
                    const categorySelected = categoryStates.categoryList.find(
                      category => category.id === formData[FormInputName.eventCategory],
                    );
                    modalConfig.onShouldShowModal({
                      value: ShouldShowModal.category,
                      newTitleModal: 'Editar categoria de evento',
                      category: categorySelected,
                    });
                  } else {
                    toast.warn('Selecione uma categoria para editar');
                  }
                }}
              >
                <Pen height={12} width={12} /> editar
              </div>
            </span>
          </div>
        </FormGroup>
        <FormGroup className="mb-2">
          <SelectCustom
            refSelect={contractorRef}
            name="contractor"
            label="Empresa ou contratante"
            placeholder="Digite ou selecione a empresa/contratante"
            onChange={e => {
              onChangeFormInput(FormInputName.contractor)(e?.value as string);
            }}
            error={formErrors.contractor && formErrors.contractor[0]}
            value={formData[FormInputName.contractor]}
            options={contractorState.contractorList?.map(optionContractor => ({
              value: optionContractor.id,
              label: optionContractor.name,
            }))}
          />
          <ContractorScreen
            contractorSelected={contratorDataSelected}
            contractorActions={contractorActions}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            refInput={censureRef}
            name="censure"
            label="Censura do evento"
            placeholder="Digite a idade de censura. Ex: 16"
            maxLength={2}
            value={formData[FormInputName.censure]}
            onChange={e =>
              onChangeFormInput(FormInputName.censure)(e.target.value.replace(/\D/g, ''))
            }
            error={formErrors.censure && formErrors.censure[0]}
          />
        </FormGroup>

        <h5 className="mb-2 border-bottom-title mb-5">Informações complementares</h5>
        <FormGroup className="mb-2">
          <InputText
            refInput={facebookUrlRef}
            name="facebookUrl"
            label="Facebook do evento (opcional)"
            placeholder="Copie e cole o link do Facebook do evento"
            value={formData[FormInputName.facebookUrl]}
            onChange={e => onChangeFormInput(FormInputName.facebookUrl)(e.target.value)}
            error={formErrors.facebookUrl && formErrors.facebookUrl[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            refInput={instagramUrlRef}
            name="instagramUrl"
            label="Instagram do evento (opcional)"
            placeholder="Copie e cole o link do Instagram do evento"
            value={formData[FormInputName.instagramUrl]}
            onChange={e => onChangeFormInput(FormInputName.instagramUrl)(e.target.value)}
            error={formErrors.instagramUrl && formErrors.instagramUrl[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputFile
            name="imageBase64"
            label={
              <>
                <span>Imagem principal do evento (jpg ou png) (opcional)</span>
                <br />
                <br />
                <span className="description-input">Resolução: 500x500</span>
              </>
            }
            fileName={formNameFiles?.imageBase64}
            onChange={e =>
              onChangeFormFileInput(FormInputName.imageBase64)(
                (e.target as HTMLInputElement)?.files?.[0],
              )
            }
            error={formErrors.imageBase64 && formErrors.imageBase64[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputFile
            name="imagePosBase64"
            label={
              <>
                <span>Imagem POS (jpg ou png) (opcional)</span>
                <br />
                <br />
                <span className="description-input mt-2">Resolução: 384x168</span>
                <br />
              </>
            }
            fileName={formNameFiles?.imagePosBase64}
            onChange={e =>
              onChangeFormFileInput(FormInputName.imagePosBase64)(
                (e.target as HTMLInputElement)?.files?.[0],
              )
            }
            error={formErrors.imagePosBase64 && formErrors.imagePosBase64[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            refButton={publishWebsiteRef}
            label="Publicar evento no site?"
            name="publishWebsite"
            value={formData[FormInputName.publishWebsite]}
            onChange={e => onChangeFormInput(FormInputName.publishWebsite)(e.target.value)}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.publishWebsite && formErrors.publishWebsite[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            refButton={textSizeRef}
            label="Tamanho do texto"
            name="textSize"
            value={formData[FormInputName.textSize]}
            onChange={e => onChangeFormInput(FormInputName.textSize)(e.target.value)}
            options={[
              { value: '0', label: 'Pequeno' },
              { value: '1', label: 'Médio' },
              { value: '2', label: 'Grande' },
            ]}
            error={formErrors.textSize && formErrors.textSize[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <TextArea
            name="ticketPhrase"
            label="Frase do ingresso (opcional)"
            placeholder="Digite a frase que irá aparecer no ingresso"
            maxLength={250}
            rows={3}
            value={formData[FormInputName.ticketPhrase]}
            onChange={e => onChangeFormInput(FormInputName.ticketPhrase)(e.target.value)}
            error={formErrors.ticketPhrase && formErrors.ticketPhrase[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <TextArea
            name="websiteDescription"
            label="Descrição para o site (opcional)"
            placeholder="Digite aqui a descrição que irá aparecer no site"
            maxLength={250}
            rows={4}
            value={formData[FormInputName.websiteDescription]}
            onChange={e => onChangeFormInput(FormInputName.websiteDescription)(e.target.value)}
            error={formErrors.websiteDescription && formErrors.websiteDescription[0]}
          />
        </FormGroup>
      </div>
      <hr />
      <div className="footer-register-event">
        <Button
          title="Voltar"
          theme="noneBorder"
          onClick={() => history.push('/dashboard/event')}
        />
        <Button type="submit" title="Avançar para Setor e ingresso" onClick={() => undefined} />
      </div>
    </Form>
  );
};
