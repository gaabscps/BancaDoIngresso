/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { Container, Input, FormGroup, Label, Button } from 'reactstrap';
import { ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import SuperInput from '../../../../../sharedComponents/SuperInput';
import DiscountTicket from '../../../../../modal/DiscountTicket';
import TicketIcon from '../../../../../../assets/images/svg/Ticket';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';
import titleLine from '../../../../../../assets/images/svg/titleLine.svg';
import BackOnTop from '../../../../../sharedComponents/BackOnTop';
import TicketPayment from '../../../../../../entities/TicketPayment';
import CardFees from '../../../../../../entities/CardFees';
import DiscountCoupon from '../../../../../../entities/DiscountCoupon';
import EventTicketSimple from '../../../../../../entities/EventTicketSimple';
import PaymentGateway from '../../../../../../entities/PaymentGateway';
import { getAllSuccess, ticketPaymentRequest } from '../../../../../../store/ducks/event/actions';

interface CreateTicket {
  id: string;
  eventTickets: EventTicketSimple[];
  posGateway: PaymentGateway;
  websiteGateway: PaymentGateway;
  websiteInstallmentLimit: number;
  posInstallmentLimit: number;
  allowFractionalPayment: boolean;
  allowVariableRate: boolean;
  allowVariableValue: boolean;
  allowPaymentPIX: boolean;
  allowContactlessPayment: boolean;
  allowSellingWebsite: boolean;
  allowSellingPos: boolean;
  printReceipt: boolean;
  physicalSale: CardFees;
  websiteSale: CardFees;
  allowDiscount: boolean;
  allowDiscountCoupon: boolean;
  discountCoupons: DiscountCoupon[];
}

const Sample = (): JSX.Element => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<CreateTicket>({} as CreateTicket);
  const [show, setShow] = useState(false);
  const [allowFractionalPayment, setAllowFractionalPayment] = useState(true);
  const [allowVariableRate, setAllowllowVariableRate] = useState(true);
  const [allowVariableValue, setAllowVariableValue] = useState(true);
  const [allowPaymentPIX, setAllowPaymentPIX] = useState(true);
  const [allowContactlessPayment, setAllowContactlessPayment] = useState(true);
  const [allowSellingWebsite, setAllowSellingWebsite] = useState(true);
  const [allowSellingPos, setAllowSellingPos] = useState(true);
  const [printReceipt, setPrintReceipt] = useState(true);
  const [websiteSale, setWebsiteSaleAllowCreditCardPayment] = useState(true);
  const [allowDiscount, setAllowDiscount] = useState(true);
  const [allowDiscountCoupon, setAllowDiscountCoupon] = useState(true);
  const [physicalSale, setPhysicalSaleAllowCreditCardPayment] = useState(true);
  const [selectElements, setSelectElements] = useState([]);
  const [selected, setSelected] = useState('first');
  const [selected2, setSelected2] = useState('first');
  const [selected3, setSelected3] = useState('first');
  const [selected4, setSelected4] = useState('first');
  const [selected5, setSelected5] = useState('first');
  const [selected6, setSelected6] = useState('first');
  const [selected7, setSelected7] = useState('first');
  const [selected8, setSelected8] = useState('first');

  // const handleRadioChange = (e: any) => {
  //   if (e.target.checked) {
  //     setSelectElements([...selectElements, e.target.value]);
  //   } else {
  //     setSelectElements(selectElements.filter(element => element !== e.target.value));
  //   }
  // };

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
    // console.log('form', form);
  };

  const handleSubmit = async (): Promise<void> => {
    const createTicketPayment: TicketPayment = {
      id: '',
      eventTickets: form.eventTickets,
      posGateway: form.posGateway,
      websiteGateway: form.websiteGateway,
      websiteInstallmentLimit: form.websiteInstallmentLimit,
      posInstallmentLimit: form.posInstallmentLimit,
      allowFractionalPayment,
      allowVariableRate,
      allowVariableValue,
      allowPaymentPIX,
      allowContactlessPayment,
      allowSellingWebsite,
      allowSellingPos,
      printReceipt,
      physicalSale: form.physicalSale,
      websiteSale: form.websiteSale,
      allowDiscount,
      allowDiscountCoupon,
      discountCoupons: form.discountCoupons,
      allowPaymentBankSlip: false,
    };
    // dispatch(ticketPaymentRequest(eventId, createTicketPayment));
  };

  return (
    <Fragment>
      <DiscountTicket show={show} setShow={setShow} />
      <Container className="subContainer" fluid={true}>
        <hr className="divider" />
        <FormGroup style={{ marginTop: '50px' }}>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="posGateway">
              Gateway Pagamento POS
            </Label>
            <div className="checkFieldSpacing">
              <Input name={'posGateway'} id="posGateway" onChange={onChangeForm()} type="radio" />
              <Label check className="checkLabel">
                Paypal
              </Label>
            </div>
            <div className="checkFieldSpacing">
              <Input name={'posGateway'} id="posGateway" onChange={onChangeForm()} type="radio" />
              <Label check className="checkLabel">
                Pagseguro
              </Label>
            </div>
            <div className="checkFieldSpacing">
              <Input name={'posGateway'} id="posGateway" onChange={onChangeForm()} type="radio" />
              <Label check className="checkLabel">
                Picpay
              </Label>
            </div>
            <div className="checkFieldSpacing">
              <Input name={'posGateway'} id="posGateway" onChange={onChangeForm()} type="radio" />
              <Label check className="checkLabel">
                Rico
              </Label>
            </div>
            <div className="checkFieldSpacing">
              <Input name={'posGateway'} id="posGateway" onChange={onChangeForm()} type="radio" />
              <Label check className="checkLabel">
                Ricopay
              </Label>
            </div>
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="websiteGateway">
              Gateway Pagamento SITE
            </Label>
            <div className="checkFieldSpacing">
              <Input
                id="paypal"
                name="websiteGateway"
                // onChange={handleRadioChange}
                type="checkbox"
              />
              <Label check className="checkLabel">
                Paypal
              </Label>
            </div>
            <div className="checkFieldSpacing">
              <Input
                id="pagseguro"
                name="websiteGateway"
                // onChange={handleRadioChange}
                type="checkbox"
              />
              <Label check className="checkLabel">
                Pagseguro
              </Label>
            </div>
            <div className="checkFieldSpacing">
              <Input
                id="picpay"
                name="websiteGateway"
                // onChange={handleRadioChange}
                type="checkbox"
              />
              <Label check className="checkLabel">
                Picpay
              </Label>
            </div>
            <div className="checkFieldSpacing">
              <Input
                id="rico"
                name="websiteGateway"
                // onChange={handleRadioChange}
                type="checkbox"
              />
              <Label check className="checkLabel">
                Rico
              </Label>
            </div>
            <div className="checkFieldSpacing">
              <Input
                id="ricopay"
                name="websiteGateway"
                // onChange={handleRadioChange}
                type="checkbox"
              />
              <Label check className="checkLabel">
                Ricopay
              </Label>
            </div>
          </div>
          <div className="fieldSpacing" style={{ display: 'grid' }}>
            <Label className="fieldLabel" for="websiteInstallmentLimit">
              Limite de parcelamento online
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              placeholder="0"
              id="websiteInstallmentLimit"
              name="websiteInstallmentLimit"
              type="select"
              onChange={onChangeForm()}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </SuperInput>
          </div>
          <div className="fieldSpacing" style={{ display: 'grid' }}>
            <Label className="fieldLabel" for="posInstallmentLimit">
              Limite de parcelamento POS
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              placeholder="0"
              id="posInstallmentLimit"
              name="posInstallmentLimit"
              onChange={onChangeForm()}
              type="select"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </SuperInput>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir pagamento fracionado?</Label>
            <div className="d-flex" style={{ width: '100px' }}>
              <Button
                onClick={() => {
                  setAllowFractionalPayment(true);
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
                onClick={() => {
                  setAllowFractionalPayment(false);
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
            <Label className="fieldLabel">Permitir taxa variavel?</Label>
            <div className="d-flex" style={{ width: '100px' }}>
              <Button
                onClick={() => {
                  setAllowllowVariableRate(true);
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
                onClick={() => {
                  setAllowllowVariableRate(false);
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
          <div className="groupButton">
            <Label className="fieldLabel">Permitir valor variavel?</Label>
            <div className="d-flex" style={{ width: '100px' }}>
              <Button
                onClick={() => {
                  setAllowVariableValue(true);
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
                onClick={() => {
                  setAllowVariableValue(false);
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
            </div>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir pagamento com PIX?</Label>
            <div className="d-flex" style={{ width: '100px' }}>
              <Button
                onClick={() => {
                  setAllowPaymentPIX(true);
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
                onClick={() => {
                  setAllowPaymentPIX(false);
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
            <Label className="fieldLabel">Permitir pagamento por aproximação?</Label>
            <div className="d-flex" style={{ width: '100px' }}>
              <Button
                onClick={() => {
                  setAllowContactlessPayment(true);
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
                onClick={() => {
                  setAllowContactlessPayment(false);
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
            </div>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir vender online?</Label>
            <div className="d-flex" style={{ width: '100px' }}>
              <Button
                onClick={() => {
                  setAllowSellingWebsite(true);
                  setSelected6('first');
                }}
                style={
                  selected6 === 'first'
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
                onClick={() => {
                  setAllowSellingWebsite(false);
                  setSelected6('second');
                }}
                style={
                  selected6 === 'second'
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
            <Label className="fieldLabel">Permitir vender na POS?</Label>
            <div className="d-flex" style={{ width: '100px' }}>
              <Button
                onClick={() => {
                  setAllowSellingWebsite(true);
                  setSelected7('first');
                }}
                style={
                  selected7 === 'first'
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
                onClick={() => {
                  setAllowSellingWebsite(false);
                  setSelected7('second');
                }}
                style={
                  selected7 === 'second'
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
            <Label className="fieldLabel">Imprimir recibo (POS)?</Label>
            <div className="d-flex" style={{ width: '100px' }}>
              <Button
                onClick={() => {
                  setPrintReceipt(true);
                  setSelected8('first');
                }}
                style={
                  selected8 === 'first'
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
                onClick={() => {
                  setPrintReceipt(false);
                  setSelected8('second');
                }}
                style={
                  selected8 === 'second'
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

          <div className="secondPageTitle">Taxas de cartão</div>
          <img src={titleLine} style={{ paddingTop: '-40px', marginBottom: '25px' }} />
          <div className="pageSubTitle">Venda física</div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir venda com cartão?</Label>
            <ButtonGroup style={{ width: '100px' }}>
              <Button
                variant="outline-dark"
                style={{ height: '62px', width: '100px' }}
                onClick={() => setPhysicalSaleAllowCreditCardPayment(true)}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: '62px', width: '100px' }}
                onClick={() => setPhysicalSaleAllowCreditCardPayment(false)}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="debit">
              Débito
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              id="debit"
              name="debit"
              placeholder="0%"
              type="number"
            />
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="credit">
              Crédito
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              id="credit"
              name="credit"
              placeholder="0%"
              type="number"
            />
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="pix">
              PIX
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              id="pix"
              name="pix"
              placeholder="0%"
              type="number"
            />
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="administrateTax">
              Taxa administrativa
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              id="administrateTax"
              name="administrateTax"
              placeholder="0%"
              type="number"
            />
          </div>
          <div className="d-flex">
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="installments">
                Qtd parcelas
              </Label>
              <SuperInput
                style={{ width: '135px' }}
                id="installments"
                name="installments"
                placeholder="Ex: 2"
                type="number"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="fee">
                Juros ao mês
              </Label>
              <SuperInput
                style={{ width: '135px' }}
                id="fee"
                name="fee"
                placeholder="Ex: 2%"
                type="number"
              />
            </div>
          </div>
          <div className="pageSubTitle">Venda e-commerce</div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir venda com cartão?</Label>
            <ButtonGroup style={{ width: '100px' }}>
              <Button
                variant="outline-dark"
                style={{ height: '62px', width: '100px' }}
                onClick={() => setWebsiteSaleAllowCreditCardPayment(true)}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: '62px', width: '100px' }}
                onClick={() => setWebsiteSaleAllowCreditCardPayment(false)}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="websiteSaleBankSlip">
              Boleto
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              id="websiteSaleBankSlip"
              name="websiteSaleBankSlip"
              placeholder="0%"
              type="number"
            />
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="websiteSaleCredit">
              Crédito
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              id="websiteSaleCredit"
              name="websiteSaleCredit"
              placeholder="0%"
              type="number"
            />
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="websiteSalePix">
              PIX
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              id="websiteSalePix"
              name="websiteSalePix"
              placeholder="0%"
              type="number"
            />
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="websiteSaleAdministrateTax">
              Taxa administrativa
            </Label>
            <SuperInput
              style={{ width: '135px' }}
              id="websiteSaleAdministrateTax"
              name="websiteSaleAdministrateTax"
              placeholder="0%"
              type="number"
            />
          </div>
          <div className="d-flex">
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="websiteSaleInstallments">
                Qtd parcelas
              </Label>
              <SuperInput
                style={{ width: '135px' }}
                id="websiteSaleInstallments"
                name="websiteSaleInstallments"
                placeholder="Ex: 2"
                type="number"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="websiteSaleFee">
                Juros ao mês
              </Label>
              <SuperInput
                style={{ width: '135px' }}
                id="websiteSaleFee"
                name="websiteSaleFee"
                placeholder="Ex: 2%"
                type="number"
              />
            </div>
          </div>
          <div style={{ display: 'grid', paddingBottom: '40px' }}>
            <div className="pageTitle">Cupons e descontos</div>
            <img src={titleLine} style={{ paddingTop: '-20px' }} />
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir desconto?</Label>
            <ButtonGroup style={{ width: '100px' }}>
              <Button
                variant="outline-dark"
                style={{ height: '62px', width: '100px' }}
                onClick={() => setAllowDiscount(true)}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: '62px', width: '100px' }}
                onClick={() => setAllowDiscount(false)}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir cupom de desconto?</Label>
            <ButtonGroup style={{ width: '100px' }}>
              <Button
                variant="outline-dark"
                style={{ height: '62px', width: '100px' }}
                onClick={() => setAllowDiscountCoupon(true)}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: '62px', width: '100px' }}
                onClick={() => setAllowDiscountCoupon(false)}
              >
                Não
              </Button>
            </ButtonGroup>
            <div
              className="auxSucessText"
              style={{ paddingTop: '20px' }}
              onClick={() => setShow(true)}
            >
              + adicionar cupom de desconto
            </div>
            <div style={{ marginTop: '50px' }}>
              <SuperCollapse
                title="Cupons de desconto adicionados"
                content="Nenhum cupom de desconto foi adicionado. Aqui será exibida uma lista dos seus cupons adicionados"
                leftIcon={TicketIcon}
              />
            </div>
          </div>
          <div className="nextPageButton">
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
