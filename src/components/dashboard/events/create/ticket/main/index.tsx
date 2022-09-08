/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState } from 'react';
import { Container, FormGroup, Label, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import SuperInput from '../../../../../sharedComponents/SuperInput';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';
import DoubleTicketIcon from '../../../../../../assets/images/svg/DoubleTicket';
import thirdTitleLine from '../../../../../../assets/images/svg/thirdTitleLine.svg';
import EventTicketMainConfiguration from '../../../../../../model/EventTicketMainConfiguration';
import { ticketMainConfigurationRequest } from '../../../../../../store/ducks/event/actions';
import TicketBatch from '../../../../../../model/TicketBatch';
import Printer from '../../../../../../model/Printer';
import Section from '../../../../../../model/Section';
import { EventState } from '../../../../../../store/ducks/event/types';
import { ApplicationState } from '../../../../../../store';
import NewSector from '../../../../../modal/NewSector';
import { PrinterState } from '../../../../../../store/ducks/printer/types';
import LoteCollapse from '../../../../../sharedComponents/collapse/LoteCollapse';
import BackOnTop from '../../../../../sharedComponents/BackOnTop';
import InputFile from '../../../../../sharedComponents/InputFile';

interface CreateTicket {
  id: string;
  eventSection: Section;
  name: string;
  hasHalfPrice: boolean;
  percentageHalfPrice: number;
  amountHalfPrice: number;
  hasCourtesy: boolean;
  amountCourtesy: number;
  numberTickets: boolean;
  printLayoutBase64: string;
  printImageBase64: string;
  printer: any;
  copies: number;
  reprint: boolean;
  printBatchNumber: boolean;
  observation: string;
  batchs: TicketBatch[];
  level?: any;
}

const Sample = (): JSX.Element => {
  const event = useSelector<ApplicationState, EventState>(store => store.event);
  const printer = useSelector<ApplicationState, PrinterState>(store => store.printer);
  const dispatch = useDispatch();
  const [hasHalfPrice, setHasHalfPrice] = useState(true);
  const [showNewSector, setShowNewSector] = useState(false);
  const [hasCourtesy, setHasCourtesy] = useState(true);
  const [numberTickets, setNumberTickets] = useState(true);
  const [reprint, setReprint] = useState(true);
  const [printBatchNumber, setPrintBatchNumber] = useState(true);
  const [form, setForm] = useState<CreateTicket>({} as CreateTicket);
  const [selected, setSelected] = useState('first');
  const [selected2, setSelected2] = useState('first');
  const [selected3, setSelected3] = useState('first');
  const [selected4, setSelected4] = useState('first');
  const [selected5, setSelected5] = useState('first');
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [startHour, setStartHour] = useState(Date);
  const [endHour, setEndHour] = useState(Date);
  const [batchs, setBatchs] = useState([]);

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
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const dateStart = `${startDate}T${startHour}:00.000Z` as unknown as Date;
  const dateEnd = `${endDate}T${endHour}:00.000Z` as unknown as Date;

  const handleSubmit = async (): Promise<void> => {
    // const newPrinter = printer?.data?.page?.list?.find(c => c.id === form.id) || ({} as Printer);
    const createTicketMainConfiguration: EventTicketMainConfiguration = {
      id: '',
      eventSection: form.eventSection,
      name: form.name,
      hasHalfPrice,
      percentageHalfPrice: form.percentageHalfPrice,
      amountHalfPrice: form.amountHalfPrice,
      hasCourtesy,
      amountCourtesy: form.amountCourtesy,
      numberTickets,
      printLayoutBase64: form.printLayoutBase64,
      printImageBase64: form.printImageBase64,
      printer: { ...form.printer, id: '-', name: '-', description: '-' },
      copies: form.copies,
      reprint,
      printBatchNumber,
      observation: form.observation,
      batchs: form.batchs,
    };
    console.log(createTicketMainConfiguration);
    // dispatch(
    //   ticketMainConfigurationRequest(
    //     event.data.eventGeneralInformation.id,
    //     createTicketMainConfiguration,
    //   ),
    // );
  };

  // const addBatchs = (): void => {
  //   const newBatchs = {
  //     batchs: form.batchs,
  //   };
  //   setForm({
  //     ...form,
  //     batchs: [...form?.batchs, newBatchs],
  //   });
  // };

  return (
    <Fragment>
      <NewSector show={showNewSector} setShowNewSector={setShowNewSector} />
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <FormGroup>
          <Row lg="2" md="1">
            <Col>
              <div className="fieldSpacing">
                <div className="fieldLabel">
                  <Label className="fieldLabel" for="name">
                    Nome do setor
                  </Label>
                </div>
                <SuperInput
                  onChange={onChangeForm('eventSection')}
                  // style={{ width: '546px' }}
                  placeholder="Digite ou selecione o nome do setor"
                  name="name"
                  id="name"
                ></SuperInput>
                <div
                  className="auxSucessText"
                  style={{ paddingTop: '20px' }}
                  onClick={() => setShowNewSector(true)}
                >
                  + cadastrar novo setor
                </div>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="name">
                  Nome do ingresso
                </Label>
                <SuperInput
                  id="name"
                  name="name"
                  onChange={onChangeForm()}
                  placeholder="Digite o nome do ingresso"
                />
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir meia entrada?</Label>
                <div className="d-flex" style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setHasHalfPrice(true);
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
                      setHasHalfPrice(false);
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
              <Row>
                <Col>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="percentageHalfPrice">
                      Porcentagem de meia entrada (%)
                    </Label>
                    <SuperInput
                      // style={{ width: '135px' }}
                      id="percentageHalfPrice"
                      name="percentageHalfPrice"
                      placeholder="0%"
                      type="number"
                      onChange={onChangeForm()}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="amountHalfPrice">
                      Quantidade de ingressos meia entrada
                    </Label>
                    <SuperInput
                      // style={{ width: '232px' }}
                      id="amountHalfPrice"
                      name="amountHalfPrice"
                      placeholder="20000"
                      type="number"
                      onChange={onChangeForm()}
                    />
                  </div>
                </Col>
              </Row>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir ingresso cortesia?</Label>
                <div className="d-flex" style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setHasCourtesy(true);
                      setSelected2('first');
                    }}
                    style={
                      selected2 === 'first'
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
                      setHasCourtesy(false);
                      setSelected2('second');
                    }}
                    style={
                      selected2 === 'second'
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
              <Row lg="3" md="1">
                <Col>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="amountCourtesy">
                      Quantidade de ingressos cortesia
                    </Label>
                    <SuperInput
                      id="amountCourtesy"
                      name="amountCourtesy"
                      placeholder="Ex: 20000"
                      type="number"
                      onChange={onChangeForm()}
                    />
                  </div>
                </Col>
              </Row>
              <div className="groupButton">
                <Label className="fieldLabel">Numerar ingressos?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setNumberTickets(true);
                      setSelected3('first');
                    }}
                    style={
                      selected3 === 'first'
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
                      setNumberTickets(false);
                      setSelected3('second');
                    }}
                    style={
                      selected3 === 'second'
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
                </ButtonGroup>
              </div>
              <div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="printLayoutBase64">
                    Layout de impressão
                  </Label>
                  <SuperInput
                    id="printLayoutBase64"
                    placeholder="Nenhum arquivo selecionado"
                    name="printLayoutBase64"
                    type="file"
                    onChange={onChangeForm()}
                  />
                </div>
              </div>
              <div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="printImageBase64">
                    Imagem de impressão
                  </Label>
                  <SuperInput
                    id="printImageBase64"
                    placeholder="Nenhum arquivo selecionado"
                    name="printImageBase64"
                    type="file"
                    onChange={onChangeForm()}
                  />
                </div>
              </div>
              <div className="fieldSpacing" style={{ display: 'grid' }}>
                <Label className="fieldLabel" for="printer">
                  Impressora
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  placeholder="Selecione a impressora para impressão"
                  id="printer"
                  name="printer"
                  type="select"
                  value={form.printer}
                >
                  <option value="">Selecione uma Impressora</option>
                  {printer?.data?.page?.list?.map((option: any) => (
                    <option value={option.id} key={option.id} id={option.id}>
                      {option.name}
                    </option>
                  ))}
                </SuperInput>
              </div>
              <Row lg="3" md="1">
                <Col>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="copies">
                      Número de vias
                    </Label>
                    <SuperInput
                      // style={{ width: '171px' }}
                      id="copies"
                      name="copies"
                      placeholder="Ex: 200"
                      type="number"
                      onChange={onChangeForm()}
                    />
                  </div>
                </Col>
              </Row>
              <div className="groupButton">
                <Label className="fieldLabel">Reimprimir ingresso?</Label>
                <div className="d-flex" style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setReprint(true);
                      setSelected4('first');
                    }}
                    style={
                      selected4 === 'first'
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
                      setReprint(true);
                      setSelected4('second');
                    }}
                    style={
                      selected4 === 'second'
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
                <Label className="fieldLabel">Imprimir número do lote?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setPrintBatchNumber(true);
                      setSelected5('first');
                    }}
                    style={
                      selected5 === 'first'
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
                      setPrintBatchNumber(false);
                      setSelected5('second');
                    }}
                    style={
                      selected5 === 'second'
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
                </ButtonGroup>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="observation">
                  Observação
                </Label>
                <SuperInput
                  style={{ height: '343px' }}
                  id="observation"
                  placeholder="Digite aqui observações que irão aparecer no ingresso"
                  name="observation"
                  type="textarea"
                  onChange={onChangeForm()}
                />
              </div>
            </Col>
          </Row>
          <div className="pageTitle">Lotes</div>
          <img src={thirdTitleLine} style={{ paddingTop: '-20px', marginBottom: '25px' }} alt="" />
          <div className="secondPageTitle">Cadastrar lote</div>
          <div className="whiteContainer">
            <Row lg="2" md="1">
              <Col>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="name">
                    Nome do lote
                  </Label>
                  <SuperInput
                    id="name"
                    name="name"
                    onChange={onChangeForm('batchs')}
                    placeholder="Digite o nome do lote"
                  />
                </div>
                <Row>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="startDate">
                        Data Início da Venda
                      </Label>
                      <SuperInput
                        id="startDate"
                        name="startDate"
                        placeholder="DD/MM/AAAA"
                        type="date"
                        onChange={e => {
                          setStartDate(e.target.value);
                          onChangeForm('batchs');
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="endDate">
                        Data Fim da Venda
                      </Label>
                      <SuperInput
                        id="endDate"
                        name="endDate"
                        placeholder="DD/MM/AAAA"
                        type="date"
                        onChange={e => {
                          setEndDate(e.target.value);
                          onChangeForm('batchs');
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="exampleDatetime">
                        Hora Início do Evento
                      </Label>
                      <SuperInput
                        id="exampleTime"
                        name="time"
                        placeholder="time placeholder"
                        type="time"
                        onChange={e => {
                          setStartHour(e.target.value);
                          onChangeForm('batchs');
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="exampleDatetime">
                        Hora Fim do Evento
                      </Label>
                      <SuperInput
                        id="exampleTime"
                        name="time"
                        placeholder="time placeholder"
                        type="time"
                        onChange={e => {
                          setEndHour(e.target.value);
                          onChangeForm('batchs');
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row md="1">
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="commission">
                        Porcentagem de Comissão (%)
                      </Label>
                      <SuperInput
                        id="commission"
                        name="commission"
                        onChange={onChangeForm('batchs')}
                        placeholder="0%"
                        type="number"
                      />
                    </div>
                  </Col>
                  <Col></Col>
                </Row>

                <Row>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="amount">
                        Quantidade de ingressos
                      </Label>
                      <SuperInput
                        // style={{ width: '232px' }}
                        id="amount"
                        name="number"
                        onChange={onChangeForm('batchs')}
                        placeholder="Ex: 20000"
                        type="number"
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="unitValue">
                        Valor unitário
                      </Label>
                      <SuperInput
                        // style={{ width: '232px' }}
                        id="unitValue"
                        name="unitValue"
                        placeholder="Ex: 20,00"
                        onChange={onChangeForm('batchs')}
                        type="number"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="totalValue">
                    Valor total estimado
                  </Label>
                  <SuperInput
                    id="totalValue"
                    name="totalValue"
                    placeholder="Ex: 200,00"
                    type="number"
                    onChange={onChangeForm('batchs')}
                  />
                </div>
                <div>
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="imageUrl">
                      Imagem do lote (opcional)
                    </Label>
                    <SuperInput
                      id="imageUrl"
                      placeholder="Nenhum arquivo selecionado"
                      name="imageUrl"
                      type="file"
                      onChange={onChangeForm('batchs')}
                    />
                  </div>
                  <div className="nextPageButton">
                    <div className="auxSucessText" style={{ paddingTop: '20px' }}>
                      + cadastrar lote
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: '50px' }}>
            <LoteCollapse
              title="Lotes cadastrados"
              content="Nenhum lote foi cadastrado. Aqui será exibida uma lista dos seus lotes cadastrados"
              leftIcon={DoubleTicketIcon}
            />
          </div>
          <div className="nextPageButton" style={{ marginTop: '50px' }}>
            <div style={{ marginRight: '25px', paddingTop: '5px' }}>
              <BackOnTop />
            </div>
            <div style={{ color: '#fff' }}>
              <Button
                style={{
                  height: '50px',
                  width: '250px',
                  borderColor: '#A5A5A5',
                }}
                variant="outline-light"
                onClick={handleSubmit}
              >
                <div className="greyNormalText">Próxima etapa</div>
              </Button>
            </div>
          </div>
        </FormGroup>
      </Container>
    </Fragment>
  );
};

export default Sample;
