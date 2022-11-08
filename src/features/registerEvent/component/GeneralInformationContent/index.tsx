/* eslint-disable import/no-unresolved */
import React from 'react';
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
  const TypeEventsOptions = [
    { value: '0', label: 'Mono' },
    { value: '1', label: 'Pai' },
    { value: '2', label: 'Filho' },
  ];

  const isValidAddresswithCEP = (): boolean => {
    const { zipCode } = formGeneralInformation.formData;
    return !(zipCode?.length === 9 && isValidCEP(zipCode));
  };

  const contratorDataSelected = contractorState.contractorList.find(
    item => item.id === formGeneralInformation.formData.contractor,
  );

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
            name="eventType"
            label="Tipo de evento"
            placeholder="Digite ou selecione o tipo do evento"
            onChange={e => {
              formGeneralInformation.onChangeFormInput(FormInputName.eventType)(e?.value as string);
            }}
            error={
              formGeneralInformation.formErrors.eventType &&
              formGeneralInformation.formErrors.eventType[0]
            }
            value={formGeneralInformation.formData[FormInputName.eventType]}
            options={TypeEventsOptions}
          />
          {formGeneralInformation.formData[FormInputName.eventType] === '2' && (
            <div className="d-flex flex-column mb-5" style={{ marginTop: '-20px' }}>
              <span
                className="link-event-father d-flex"
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
            name="name"
            label="Nome do Evento"
            placeholder="Digite o nome do evento. Ex: Baile do Dennis DJ"
            maxLength={18}
            value={formGeneralInformation.formData[FormInputName.name]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.name)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.name && formGeneralInformation.formErrors.name[0]
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="namePos"
            label="Nome do Evento (POS)"
            placeholder="Digite o nome do evento na POS. Ex: Baile do DN.DJ"
            maxLength={12}
            value={formGeneralInformation.formData[FormInputName.namePos]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.namePos)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.namePos &&
              formGeneralInformation.formErrors.namePos[0]
            }
          />
          <div className="d-flex flex-column d-relative" style={{ marginTop: '-40px' }}>
            <span className="d-flex flex-end justify-content-end link-grey d-absolute">
              {formGeneralInformation.formData[FormInputName.namePos]?.length || 0}/12
            </span>
          </div>
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="establishmentName"
            label="Nome do estabelecimento"
            placeholder="Digite o nome do estabelecimento evento. Ex: Folk Valley"
            maxLength={18}
            value={formGeneralInformation.formData[FormInputName.establishmentName]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.establishmentName)(
                e.target.value,
              )
            }
            error={
              formGeneralInformation.formErrors.establishmentName &&
              formGeneralInformation.formErrors.establishmentName[0]
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="eventPlace"
            label="Local do evento"
            placeholder="Digite o nome do estabelecimento evento. Ex: Folk Valley"
            maxLength={18}
            value={formGeneralInformation.formData[FormInputName.eventPlace]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.eventPlace)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.eventPlace &&
              formGeneralInformation.formErrors.eventPlace[0]
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="zipCode"
            label="CEP"
            placeholder="Digite o CEP da empresa"
            maxLength={9}
            value={formGeneralInformation.formData[FormInputName.zipCode]}
            onChange={e => {
              formGeneralInformation.onChangeFormInput(FormInputName.zipCode)(e.target.value);
              if (e.target.value.length === 9 && isValidCEP(e.target.value)) {
                cep(e.target.value).then(data => {
                  formGeneralInformation.onChangeFormInput(FormInputName.state)(data.state);
                  formGeneralInformation.onChangeFormInput(FormInputName.city)(data.city);
                  formGeneralInformation.onChangeFormInput(FormInputName.district)(
                    data.neighborhood,
                  );
                  formGeneralInformation.onChangeFormInput(FormInputName.street)(data.street);
                });
              }
            }}
            error={
              formGeneralInformation.formErrors.zipCode &&
              formGeneralInformation.formErrors.zipCode[0]
            }
          />
        </FormGroup>

        <Row>
          <Col md={4} className="pl-0">
            <FormGroup className="mb-2">
              <SelectCustom
                name="state"
                label="Estado"
                placeholder="SP"
                value={formGeneralInformation.formData[FormInputName.state]}
                onChange={e =>
                  formGeneralInformation.onChangeFormInput(FormInputName.state)(
                    e?.target?.value as string,
                  )
                }
                error={
                  formGeneralInformation.formErrors.state &&
                  formGeneralInformation.formErrors.state[0]
                }
                options={statesUf}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={8} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                name="city"
                label="Cidade"
                placeholder="Campinas"
                value={formGeneralInformation.formData[FormInputName.city]}
                onChange={e =>
                  formGeneralInformation.onChangeFormInput(FormInputName.city)(
                    e?.target.value as string,
                  )
                }
                error={
                  formGeneralInformation.formErrors.city &&
                  formGeneralInformation.formErrors.city[0]
                }
                disabled
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup className="mb-2">
          <InputText
            name="district"
            label="Bairro"
            placeholder="Centro"
            value={formGeneralInformation.formData[FormInputName.district]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.district)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.district &&
              formGeneralInformation.formErrors.district[0]
            }
            disabled
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="street"
            label="Logradouro"
            placeholder="Rua 123 da Costa"
            value={formGeneralInformation.formData[FormInputName.street]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.street)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.street &&
              formGeneralInformation.formErrors.street[0]
            }
            disabled
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="number"
            label="Número"
            placeholder="Ex: 789"
            maxLength={6}
            value={formGeneralInformation.formData[FormInputName.number]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.number)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.number &&
              formGeneralInformation.formErrors.number[0]
            }
            disabled={isValidAddresswithCEP()}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="complement"
            label="Complemento (opcional)"
            placeholder="Ex: Apto 12"
            value={formGeneralInformation.formData[FormInputName.complement]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.complement)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.complement &&
              formGeneralInformation.formErrors.complement[0]
            }
            disabled={isValidAddresswithCEP()}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="latitude"
            label="Latitude (opcional)"
            placeholder="Ex: 0º"
            maxLength={9}
            value={formGeneralInformation.formData[FormInputName.latitude]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.latitude)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.latitude &&
              formGeneralInformation.formErrors.latitude[0]
            }
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="longitude"
            label="Longitude (opcional)"
            placeholder="Ex: 0º"
            maxLength={9}
            value={formGeneralInformation.formData[FormInputName.longitude]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.longitude)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.longitude &&
              formGeneralInformation.formErrors.longitude[0]
            }
          />
        </FormGroup>
        <Row>
          <Col md={6} className="pl-0">
            <FormGroup className="mb-2">
              <InputText
                type="date"
                name="startDate"
                label="Data Início do Evento"
                placeholder="DD/MM/AAAA"
                value={formGeneralInformation.formData[FormInputName.startDate]}
                onChange={e =>
                  formGeneralInformation.onChangeFormInput(FormInputName.startDate)(e.target.value)
                }
                error={
                  formGeneralInformation.formErrors.startDate &&
                  formGeneralInformation.formErrors.startDate[0]
                }
              />
            </FormGroup>
          </Col>
          <Col md={6} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                type="date"
                name="endDate"
                label="Data Fim do Evento"
                placeholder="DD/MM/AAAA"
                value={formGeneralInformation.formData[FormInputName.endDate]}
                onChange={e =>
                  formGeneralInformation.onChangeFormInput(FormInputName.endDate)(e.target.value)
                }
                error={
                  formGeneralInformation.formErrors.endDate &&
                  formGeneralInformation.formErrors.endDate[0]
                }
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="pl-0">
            <FormGroup className="mb-2">
              <InputText
                type="time"
                name="startTime"
                label="Hora Início do Evento"
                placeholder="DD/MM/AAAA"
                value={formGeneralInformation.formData[FormInputName.startTime]}
                onChange={e =>
                  formGeneralInformation.onChangeFormInput(FormInputName.startTime)(e.target.value)
                }
                error={
                  formGeneralInformation.formErrors.startTime &&
                  formGeneralInformation.formErrors.startTime[0]
                }
              />
            </FormGroup>
          </Col>
          <Col md={6} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                type="time"
                name="endTime"
                label="Hora Fim do Evento"
                placeholder="DD/MM/AAAA"
                value={formGeneralInformation.formData[FormInputName.endTime]}
                onChange={e =>
                  formGeneralInformation.onChangeFormInput(FormInputName.endTime)(e.target.value)
                }
                error={
                  formGeneralInformation.formErrors.endTime &&
                  formGeneralInformation.formErrors.endTime[0]
                }
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="mb-2">
          <SelectCustom
            name="eventCategory"
            label="Categoria do evento"
            placeholder="Digite ou selecione a categoria do evento"
            onChange={e => {
              formGeneralInformation.onChangeFormInput(FormInputName.eventCategory)(
                e?.value as string,
              );
            }}
            error={
              formGeneralInformation.formErrors.eventCategory &&
              formGeneralInformation.formErrors.eventCategory[0]
            }
            value={formGeneralInformation.formData[FormInputName.eventCategory]}
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
                  if (formGeneralInformation.formData[FormInputName.eventCategory] !== '') {
                    const categorySelected = categoryStates.categoryList.find(
                      category =>
                        category.id ===
                        formGeneralInformation.formData[FormInputName.eventCategory],
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
            name="contractor"
            label="Empresa ou contratante"
            placeholder="Digite ou selecione a empresa/contratante"
            onChange={e => {
              formGeneralInformation.onChangeFormInput(FormInputName.contractor)(
                e?.value as string,
              );
            }}
            error={
              formGeneralInformation.formErrors.contractor &&
              formGeneralInformation.formErrors.contractor[0]
            }
            value={formGeneralInformation.formData[FormInputName.contractor]}
            options={contractorState.contractorList?.map(optionContractor => ({
              value: optionContractor.id,
              label: optionContractor.name,
            }))}
          />
          <ContractorScreen
            contractorSelected={contratorDataSelected}
            contractorActions={contractorActions}
          />
          {/* <div className="d-flex flex-column mb-5" style={{ marginTop: '-20px' }}>
            <span className="d-flex">
              <div className="mr-5 link-green">+ cadastrar nova empresa ou contratante</div>
              <div className="link-grey">
                <Pen height={12} width={12} /> editar
              </div>
            </span>
          </div> */}
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="censure"
            label="Censura do evento"
            placeholder="Digite a idade de censura. Ex: 16"
            maxLength={2}
            value={formGeneralInformation.formData[FormInputName.censure]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.censure)(
                e.target.value.replace(/\D/g, ''),
              )
            }
            error={
              formGeneralInformation.formErrors.censure &&
              formGeneralInformation.formErrors.censure[0]
            }
          />
        </FormGroup>

        <h5 className="mb-2 border-bottom-title mb-5">Informações complementares</h5>
        <FormGroup className="mb-2">
          <InputText
            name="facebookUrl"
            label="Facebook do evento (opcional)"
            placeholder="Copie e cole o link do Facebook do evento"
            value={formGeneralInformation.formData[FormInputName.facebookUrl]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.facebookUrl)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.facebookUrl &&
              formGeneralInformation.formErrors.facebookUrl[0]
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="instagramUrl"
            label="Instagram do evento (opcional)"
            placeholder="Copie e cole o link do Instagram do evento"
            value={formGeneralInformation.formData[FormInputName.instagramUrl]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.instagramUrl)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.instagramUrl &&
              formGeneralInformation.formErrors.instagramUrl[0]
            }
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
            fileName={formGeneralInformation.formNameFiles?.imageBase64}
            onChange={e =>
              formGeneralInformation.onChanfeFormFileInput(FormInputName.imageBase64)(
                (e.target as HTMLInputElement)?.files?.[0],
              )
            }
            error={
              formGeneralInformation.formErrors.imageBase64 &&
              formGeneralInformation.formErrors.imageBase64[0]
            }
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
            fileName={formGeneralInformation.formNameFiles?.imagePosBase64}
            onChange={e =>
              formGeneralInformation.onChanfeFormFileInput(FormInputName.imagePosBase64)(
                (e.target as HTMLInputElement)?.files?.[0],
              )
            }
            error={
              formGeneralInformation.formErrors.imagePosBase64 &&
              formGeneralInformation.formErrors.imagePosBase64[0]
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Publicar evento no site?"
            name="publishWebsite"
            value={formGeneralInformation.formData[FormInputName.publishWebsite]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.publishWebsite)(e.target.value)
            }
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={
              formGeneralInformation.formErrors.publishWebsite &&
              formGeneralInformation.formErrors.publishWebsite[0]
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Tamanho do texto"
            name="textSize"
            value={formGeneralInformation.formData[FormInputName.textSize]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.textSize)(e.target.value)
            }
            options={[
              { value: '0', label: 'Pequeno' },
              { value: '1', label: 'Médio' },
              { value: '2', label: 'Grange' },
            ]}
            error={
              formGeneralInformation.formErrors.textSize &&
              formGeneralInformation.formErrors.textSize[0]
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <TextArea
            name="ticketPhrase"
            label="Frase do ingresso (opcional)"
            placeholder="Digite a frase que irá aparecer no ingresso"
            maxLength={250}
            rows={3}
            value={formGeneralInformation.formData[FormInputName.ticketPhrase]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.ticketPhrase)(e.target.value)
            }
            error={
              formGeneralInformation.formErrors.ticketPhrase &&
              formGeneralInformation.formErrors.ticketPhrase[0]
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <TextArea
            name="websiteDescription"
            label="Descrição para o site (opcional)"
            placeholder="Digite aqui a descrição que irá aparecer no site"
            maxLength={250}
            rows={4}
            value={formGeneralInformation.formData[FormInputName.websiteDescription]}
            onChange={e =>
              formGeneralInformation.onChangeFormInput(FormInputName.websiteDescription)(
                e.target.value,
              )
            }
            error={
              formGeneralInformation.formErrors.websiteDescription &&
              formGeneralInformation.formErrors.websiteDescription[0]
            }
          />
        </FormGroup>
      </div>
      <hr />
      <div className="footer-register-event">
        <Button title="Voltar" theme="noneBorder" onClick={() => {}} />
        <Button type="submit" title="Avançar para Setor e ingresso" onClick={() => {}} />
      </div>
    </Form>
  );
};
