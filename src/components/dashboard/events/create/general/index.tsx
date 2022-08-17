/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Form, Label, FormText, Row, Button, ButtonGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import SuperInput from '../../../../sharedComponents/SuperInput';
import step1 from '../../../../../assets/images/svg/stepByStep/step1.svg';
// import titleLine from '../../../../../assets/images/svg/titleLine.svg';
import auxSucess from '../../../../../assets/images/svg/auxSucess.svg';
import secondTitleLine from '../../../../../assets/images/svg/secondTitleLine.svg';
import NewCategory from '../../../../modal/NewCategory';
import RegisterCompany from '../../../../modal/RegisterCompany';
import ParentEvent from '../../../../modal/ParentEvent';
import SuperButton from '../../../../sharedComponents/SuperButton';
import { ApplicationState } from '../../../../../store';
import { EventState } from '../../../../../store/ducks/event/types';
import { generalInformationRequest } from '../../../../../store/ducks/event/actions';
import EventGeneralInformation from '../../../../../entities/EventGeneralInformation';
import { states } from '../../../../../constant/states';
import { cities } from '../../../../../constant/cities';
import { listRequestCategory } from '../../../../../store/ducks/event-category/actions';
import { EventCategoryState } from '../../../../../store/ducks/event-category/types';
import { ContractorState } from '../../../../../store/ducks/contractor/types';
import { listRequestContractor } from '../../../../../store/ducks/contractor/actions';
import Contractor from '../../../../../entities/Contractor';
import EventCategory from '../../../../../entities/EventCategory';
import InputFile from '../../../../sharedComponents/InputFile';

interface CreateEvent {
  eventType: number;
  name: string;
  posName: string;
  establishmentName: string;
  addressId: any;
  eventCategory: any;
  contractor: any;
  censure: number;
  instagramUrl: string;
  facebookUrl: string;
  imageBase64: string;
  imagePosBase64: string;
  textSize: number;
  ticketPhrase: string;
  websiteDescription: string;
  startDate: any;
  endDate: any;
  publishWebsite: boolean;
}

const Sample = (): JSX.Element => {
  const category = useSelector<ApplicationState, EventCategoryState>(store => store.eventCategory);
  const contractor = useSelector<ApplicationState, ContractorState>(store => store.contractor);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showParentEvent, setShowParentEvent] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState('');
  const [startHour, setStartHour] = useState(Date);
  const [endHour, setEndHour] = useState('');
  const [eventType, setEventType] = useState(0);
  const [publishWebsite, setPublishWebsite] = useState(true);
  const [form, setForm] = useState<CreateEvent | any>({} as CreateEvent);
  const [selected, setSelected] = useState('first');
  const [selectedText, setSelectedText] = useState('medium');

  const typeEventOptions = [
    { value: 0, label: 'Único' },
    { value: 1, label: 'Mútiplo' },
  ];

  const nextStep = (): void => {
    history('/event/ticket');
  };
  const goBack = (): void => {
    history(-1);
  };

  const onChangeForm = (level?: any) => (e: any) => {
    if (!level) {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    } else {
      setForm({
        ...form,
        [level]: {
          ...form[level],
          [e.target.name]: e.target.value,
        },
      });
    }
    // console.log('form', form);
  };

  useEffect(() => {
    console.log('form', form);
  }, [form]);

  /**
   * Transforma arquivo de imagem em base64
   *
   * @export
   * @param {any} value
   * @returns promise
   */
  function toBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const onChangeSelect = (name: string) => (option: any) => {
    if (name.includes('.')) {
      const [level, field] = name.split('.');
      setForm({
        ...form,
        [level]: {
          ...form[level],
          [field]: option.value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: option.value,
      });
    }
  };

  const onChangeFileImage = (name: string) => (e: any) => {
    const fileUpload = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(fileUpload);
    img.onload = async () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const file = await toBase64(fileUpload);
      const fileBase64 = await Promise.resolve(file);
      URL.revokeObjectURL(img.src);
      setForm({
        ...form,
        [name]: {
          name: fileUpload.name,
          base64: fileBase64,
          width,
          height,
        },
      });
    };
  };

  const dateStart = `${startDate}T${startHour}:00.000Z` as unknown as Date;
  const dateEnd = `${endDate}T${endHour}:00.000Z` as unknown as Date;

  // const onChangeForm = (name: string, value: any): any => {
  //   const newForm = {
  //     ...form,
  //     [name]: value,
  //   };
  //   setForm(newForm);
  // };

  const handleSubmit = async (): Promise<void> => {
    const newCategory =
      category?.data?.page?.list?.find(c => c.id === form.category) || ({} as EventCategory);
    const newContractor =
      contractor?.data?.page?.list?.find(c => c.id === form.contractor) || ({} as Contractor);
    const createGeneralInformation: EventGeneralInformation = {
      eventType,
      name: form.name,
      posName: form.posName,
      establishmentName: form.establishmentName,
      address: { ...form.address, zipCode: '-', district: '-', number: '-' },
      eventCategory: newCategory,
      contractor: newContractor,
      censure: form.censure,
      instagramUrl: form.instagramUrl,
      facebookUrl: form.facebookUrl,
      imageBase64: form.imageBase64,
      imagePosBase64: form.imagePosBase64,
      textSize,
      ticketPhrase: form.ticketPhrase,
      websiteDescription: form.websiteDescription,
      startDate: dateStart,
      endDate: dateEnd,
      publishWebsite,
      id: '',
    };
    dispatch(generalInformationRequest(createGeneralInformation));
    nextStep();
  };

  useEffect(() => {
    dispatch(listRequestCategory({ page: 1, pageSize: 10 }));
    dispatch(listRequestContractor({ page: 1, pageSize: 10 }));
  }, []);

  useEffect(() => {
    console.log('contractor', contractor);
  }, [contractor]);

  return (
    <Fragment>
      <NewCategory show={showNewCategory} setShowNewCategory={setShowNewCategory} />
      <RegisterCompany show={showCompany} setShowCompany={setShowCompany} />
      <ParentEvent show={showParentEvent} setShowParentEvent={setShowParentEvent} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-center stepContainer">
          <img src={step1} />
        </div>
        <Row lg="2" md="1">
          <Col>
            <div className="titleStep">
              <Label className="pageTitle">Informações gerais</Label>
              <hr className="lineText" />
              {/* <img src={titleLine} style={{ paddingTop: '-20px' }} /> */}
            </div>
            <Form>
              <div className="fieldSpacing" style={{ display: 'grid' }}>
                <Label className="fieldLabel" for="eventType">
                  Tipo de evento
                </Label>
                {/* <SelectAutoComplete
                  options={typeEventOptions}
                  name="eventType"
                  onChange={onChangeSelect('eventType')}
                  // value={form.eventType}
                  placeholder="Digite ou selecione o tipo do evento"
                /> */}
                <div
                  className="auxSucessText"
                  style={{ paddingTop: '20px' }}
                  onClick={() => setShowParentEvent(true)}
                >
                  <img style={{ paddingRight: '6px' }} src={auxSucess} />
                  vincular evento Pai
                </div>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="name">
                  Nome do Evento
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  value={form.name}
                  id="name"
                  name="name"
                  placeholder="Digite o nome do evento. Ex: Baile do Dennis DJ"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="posName">
                  Nome do Evento (POS)
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  value={form.posName}
                  id="posName"
                  name="posName"
                  placeholder="Digite o nome do evento na POS. Ex: Baile do DN.DJ"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="establishmentName">
                  Nome do estabelecimento
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  value={form.establishmentName}
                  id="establishmentName"
                  name="establishmentName"
                  placeholder="Digite o nome do estabelecimento evento. Ex: Folk Valley"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="street">
                  Local do evento
                </Label>
                <SuperInput
                  onChange={onChangeForm('address')}
                  id="street"
                  name="street"
                  placeholder="Digite o local do evento. Ex: Rua Perimetral Leste, 123"
                />
              </div>
              <Row>
                <Col md="4">
                  <div className="fieldSpacing" style={{ display: 'grid' }}>
                    <Label className="fieldLabel" for="state">
                      Estado
                    </Label>
                    {/* <SelectAutoComplete
                      options={states}
                      name="state"
                      onChange={onChangeSelect('address.state')}
                      // value={form.eventType}
                      placeholder="Ex: SP"
                    /> */}
                  </div>
                </Col>
                <Col>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="city" style={{ display: 'grid' }}>
                      Cidade
                    </Label>
                    {/* <SelectAutoComplete
                      options={cities[form.address?.state]}
                      name="city"
                      onChange={onChangeSelect('address.city')}
                      // value={form.eventType}
                      placeholder="Selecione ou digite a cidade"
                    /> */}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="startDate">
                      Data Início do Evento
                    </Label>
                    <SuperInput
                      onChange={e => setStartDate(e.target.value)}
                      // style={{ width: '243px' }}
                      id="startDate"
                      name="startDate"
                      placeholder="DD/MM/AAAA"
                      type="date"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="endDate">
                      Data Fim do Evento
                    </Label>
                    <SuperInput
                      onChange={e => setEndDate(e.target.value)}
                      // style={{ width: '243px' }}
                      id="endDate"
                      name="endDate"
                      placeholder="DD/MM/AAAA"
                      type="date"
                    />
                  </div>
                </Col>
              </Row>

              <Row xs="1" sm="2" md="2">
                <Col>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="exampleDatetime">
                      Hora Início do Evento
                    </Label>
                    <SuperInput
                      onChange={e => setStartHour(e.target.value)}
                      // style={{ width: '243px' }}
                      id="exampleTime"
                      name="time"
                      placeholder="time placeholder"
                      type="time"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="exampleDatetime">
                      Hora Fim do Evento
                    </Label>
                    <SuperInput
                      onChange={e => setEndHour(e.target.value)}
                      // style={{ width: '243px' }}
                      id="exampleTime"
                      name="time"
                      placeholder="time placeholder"
                      type="time"
                    />
                  </div>
                </Col>
              </Row>
              <div className="fieldSpacing" style={{ display: 'grid' }}>
                <Label className="fieldLabel" for="category">
                  Categoria do evento
                </Label>
                {/* <SelectAutoComplete
                  options={category?.data?.page?.list?.map(value => ({value: value.id, label: value.name}))}
                  name="category"
                  onChange={onChangeSelect('category')}
                  // value={form.eventType}
                  placeholder="Digite ou selecione a categoria do evento"
                /> */}
                <div
                  className="auxSucessText"
                  style={{ paddingTop: '20px' }}
                  onClick={() => setShowNewCategory(true)}
                >
                  + cadastrar nova categoria
                </div>
              </div>
              <div className="fieldSpacing" style={{ display: 'grid' }}>
                <Label className="fieldLabel" for="contractor">
                  Empresa ou contratante
                </Label>

                {/* <SelectAutoComplete
                  options={contractor?.data?.page?.list?.map(value => ({value: value.id, label: value.name}))}
                  name="contractor"
                  onChange={onChangeSelect('contractor')}
                  // value={form.eventType}
                  placeholder="Digite ou selecione a empresa/contratante"
                /> */}
                <div
                  className="auxSucessText"
                  style={{ paddingTop: '20px' }}
                  onClick={() => setShowCompany(true)}
                >
                  + cadastrar nova empresa ou contratante
                </div>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="censure">
                  Censura do evento
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  value={form.censure}
                  id="censure"
                  name="censure"
                  placeholder="Digite a idade de censura. Ex: 16"
                  type="number"
                />
              </div>
            </Form>
            <div className="titleStep">
              <Label className="pageTitle">Informações complementares</Label>
              <hr className="lineText" />
              {/* <img src={secondTitleLine} style={{ paddingTop: '-20px' }} /> */}
            </div>
            <Form>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="facebookUrl">
                  Facebook do evento
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  value={form.facebookUrl}
                  id="facebookUrl"
                  name="facebookUrl"
                  placeholder="Copie e cole o link do Facebook do evento"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="instagramUrl">
                  Instagram do evento
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  value={form.instagramUrl}
                  id="instagramUrl"
                  name="instagramUrl"
                  placeholder="Copie e cole o link do Instagram do evento"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="establishmentName">
                  Nome do estabelecimento
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  value={form.establishmentName}
                  id="establishmentName"
                  name="establishmentName"
                  placeholder="Digite o nome do estabelecimento evento. Ex: Folk Valley"
                />
              </div>
              <div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="imagePosBase64">
                    Imagem POS (jpg ou png)
                    <FormText className="greyNormalText">Resolução: 384x168</FormText>
                  </Label>

                  <InputFile
                    name="imagePosBase64"
                    onChange={onChangeFileImage('imagePosBase64')}
                    fileName={form.imagePosBase64?.name}
                  />
                </div>
              </div>
              <div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="imageBase64">
                    Imagem principal do evento (jpg ou png)
                    <FormText className="greyNormalText">Resolução: 500x500</FormText>
                  </Label>
                  <InputFile
                    name="imageBase64"
                    onChange={onChangeFileImage('imageBase64')}
                    fileName={form.imageBase64?.name}
                  />
                </div>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Publicar evento no site?</Label>
                <div className="d-flex" style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setPublishWebsite(true);
                      setSelected('first');
                    }}
                    style={
                      selected === 'first'
                        ? {
                            height: '62px',
                            width: '100px',
                            backgroundColor: '#171A21',
                            color: 'white',
                          }
                        : { height: '62px', width: '100px' }
                    }
                  >
                    Sim
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setPublishWebsite(false);
                      setSelected('second');
                    }}
                    style={
                      selected === 'second'
                        ? {
                            height: '62px',
                            width: '100px',
                            backgroundColor: '#171A21',
                            color: 'white',
                          }
                        : { height: '62px', width: '100px' }
                    }
                  >
                    Não
                  </Button>
                </div>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Tamanho do texto</Label>
                <div className="d-flex" style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setTextSize(0);
                      setSelectedText('small');
                    }}
                    style={
                      selectedText === 'small'
                        ? {
                            height: '62px',
                            width: '121px',
                            backgroundColor: '#171A21',
                            color: 'white',
                          }
                        : { height: '62px', width: '121px' }
                    }
                  >
                    Pequeno
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setTextSize(1);
                      setSelectedText('medium');
                    }}
                    style={
                      selectedText === 'medium'
                        ? {
                            height: '62px',
                            width: '121px',
                            backgroundColor: '#171A21',
                            color: 'white',
                          }
                        : { height: '62px', width: '121px' }
                    }
                  >
                    Médio
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setTextSize(3);
                      setSelectedText('big');
                    }}
                    style={
                      selectedText === 'big'
                        ? {
                            height: '62px',
                            width: '121px',
                            backgroundColor: '#171A21',
                            color: 'white',
                          }
                        : { height: '62px', width: '121px' }
                    }
                  >
                    Grande
                  </Button>
                </div>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="ticketPhrase">
                  Frase do ingresso
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  value={form.ticketPhrase}
                  style={{ height: '188px' }}
                  id="ticketPhrase"
                  placeholder="Digite a frase que irá aparecer no ingresso"
                  name="ticketPhrase"
                  type="textarea"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="websiteDescription">
                  Descrição para o site
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  value={form.websiteDescription}
                  style={{ height: '343px' }}
                  id="websiteDescription"
                  placeholder="Digite aqui a descrição que irá aparecer no site"
                  name="websiteDescription"
                  type="textarea"
                />
              </div>
            </Form>
          </Col>
        </Row>
        <hr className="dividerUp"/>
        <div className="nextPageButton">
          <div style={{ color: '#fff' }}>
            <Button style={{ height: '50px' }} variant="outline-light" onClick={goBack}>
              Voltar
            </Button>
          </div>
          <SuperButton style={{ width: '278px' }} onClick={handleSubmit}>
            Avançar para Setor e ingresso
          </SuperButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
