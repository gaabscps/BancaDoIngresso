import React from 'react';
import { Button, ButtonGroup, Dialog, InputFile, InputText, Loading, Switch } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import TicketIcon from '@/assets/images/svg/Ticket';
// import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
// import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { SelectCreateable } from '@/components/SelectCreateable';
import ProductSubgroup from '@/model/ProductSubgroup';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as ItemConfig } from '@/assets/images/svg/ItemConfig.svg';
import { ReactComponent as Info } from '@/assets/images/svg/infoTooltip.svg';
import ProductGroup from '@/model/ProductGroup';
import { X } from 'react-feather';
import { CustomTable } from '@/components/Table';
import { ActionProps } from '@/components/Dialog';
import DiscountCoupon from '@/model/DiscountCoupon';
import SectorProductComboProduct from '@/model/SectorProductComboProduct';
import SectorProductCombo from '@/model/SectorProductCombo';
import ReactTooltip from 'react-tooltip';
import { comboActionsProps, formComboConfigProps, formComboProps } from '../../types';
import { States } from '../../../ContractorScreen/screens/ui';
import { ShouldShowModal } from '..';
import { RegisterContentComboConfig } from '../../components/RegisterContentComboConfig';

interface SectorProductComboContainerProps {
  title: string | React.ReactNode;
  state: string;
  product: SectorProductComboProduct[];
  productList: SectorProductComboProduct[];
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  controllerFormCombo: formComboProps;
  controllerFormComboConfig: formComboConfigProps;
  controllerProductActions: comboActionsProps;
  listProductSubGroup: ProductSubgroup[];
  listProductGroup: ProductGroup[];
  combo: SectorProductCombo[];
  comboList: SectorProductCombo[];
  handleAddDiscountCoupon: () => void;
  handleChangeDiscountCoupon: (name: string, index: number, value: string) => void;
  handleRemoveDiscountCoupon: (index: number) => void;
  discountCoupon: DiscountCoupon[];
  onShouldShowModal: ({
    value,
    newTitleModal,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
  }) => void;
  onToggle: () => void;
  handleChangeProduct: (name: string, index: number, value: string | undefined) => void;
  handleAddProduct: () => Promise<void>;
  addProduct: (index: string) => void;
  removeProduct: (index: number) => void;
  handleFecthProductSubGroupList: (id: string) => Promise<void>;
  onChangeAllowOnlineSwitch: (comboSelected: any) => Promise<void>;
  onChangeComboSwitch: (comboSelected: any) => Promise<void>;
  onShowDeleteCombo: (comboSelected: any) => void;
}

export interface DataRowDiscountCoupon {
  group: string;
  subgroup: string;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  group = 'group',
  subGroup = 'subGroup',
  image = 'image',
  allowCombo = 'allowCombo',
  allowOnlineSale = 'allowOnlineSale',
  amount = 'amount',
  totalValue = 'totalValue',
  imageBase64 = 'imageBase64',
  product = 'product',
  productAmount = 'productAmount',
}

export const SectorProductComboContainer: React.FC<SectorProductComboContainerProps> = ({
  title,
  state,
  visible,
  product,
  shouldShowModal,
  controllerFormCombo,
  controllerFormComboConfig,
  listProductGroup,
  listProductSubGroup,
  discountCoupon,
  combo,
  // comboList,
  controllerProductActions,
  handleAddDiscountCoupon,
  handleChangeDiscountCoupon,
  handleRemoveDiscountCoupon,
  onToggle,
  handleChangeProduct,
  onShouldShowModal,
  handleFecthProductSubGroupList,
  handleAddProduct,
  addProduct,
  removeProduct,
  onChangeAllowOnlineSwitch,
  onChangeComboSwitch,
  onShowDeleteCombo,
}): JSX.Element => {
  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

  return (
    <>
      <Loading isVisible={state === States.loading} />

      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        isContentWithCard={true}
        actions={[
          {
            [ShouldShowModal.comboConfig]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.comboConfig]: {
              title: 'Salvar',
              onClick: () => undefined,
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.comboConfig]: (
              <RegisterContentComboConfig
                handleRemoveDiscountCoupon={handleRemoveDiscountCoupon}
                handleAddDiscountCoupon={handleAddDiscountCoupon}
                discountCoupon={discountCoupon}
                handleChangeDiscountCoupon={handleChangeDiscountCoupon}
                controllerFormComboConfig={controllerFormComboConfig}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>
      <Container style={{ maxWidth: '100%' }} className="mainContainer">
        <Row>
          <Col className="mb-4">
            <ButtonGroup
              label="Este evento terá combos?"
              name="allowCombo"
              value={controllerFormCombo.formDataCombo[FormInputName.allowCombo]}
              onChange={e =>
                controllerFormCombo.onChangeFormInputCombo(FormInputName.allowCombo)(e.target.value)
              }
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={
                controllerFormCombo.formErrorsCombo.allowCreditCardPayment &&
                controllerFormCombo.formErrorsCombo.allowCreditCardPayment[0]
              }
            />
          </Col>
        </Row>
        {controllerFormCombo.formDataCombo[FormInputName.allowCombo] === 'true' && (
          <>
            <h6 className="mb-4">Cadastrando combos</h6>
            <Container
              style={{ backgroundColor: 'white', borderRadius: '5px' }}
              className="mainContainer"
              fluid={true}
            >
              <Form>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <SelectCreateable
                        label="Grupo do combo"
                        name="groupName"
                        onChange={e => {
                          controllerFormCombo.onChangeFormInputCombo(FormInputName.group)(
                            e?.value as string,
                          );
                          handleFecthProductSubGroupList(e?.value as string);
                        }}
                        value={controllerFormCombo.formDataCombo[FormInputName.group]}
                        options={listProductGroup.map(item => ({
                          value: item.id,
                          label: item.name,
                        }))}
                        placeholder="Digite ou selecione o grupo do combo"
                        error={
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment &&
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment[0]
                        }
                      />
                      <SelectCreateable
                        label="Nome do subgrupo"
                        name="subGroup"
                        value={controllerFormCombo.formDataCombo[FormInputName.subGroup]}
                        onChange={e => {
                          controllerFormCombo.onChangeFormInputCombo(FormInputName.subGroup)(
                            e?.value as string,
                          );
                        }}
                        placeholder="Digite ou selecione o subgrupo do combo"
                        options={listProductSubGroup.map(item => ({
                          value: item.id,
                          label: item.name,
                        }))}
                        error={
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment &&
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment[0]
                        }
                      />
                      <InputText
                        name="name"
                        label="Nome do combo"
                        placeholder="Digite  o nome do combo"
                        value={controllerFormCombo.formDataCombo[FormInputName.name]}
                        onChange={e => {
                          controllerFormCombo.onChangeFormInputCombo(FormInputName.name)(
                            e?.target.value as string,
                          );
                        }}
                        error={
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment &&
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment[0]
                        }
                      />
                      <ButtonGroup
                        label="Vender online?"
                        name="allowOnlineSale"
                        value={controllerFormCombo.formDataCombo[FormInputName.allowOnlineSale]}
                        onChange={e =>
                          controllerFormCombo.onChangeFormInputCombo(FormInputName.allowOnlineSale)(
                            e.target.value,
                          )
                        }
                        options={[
                          { value: true, label: 'Sim' },
                          { value: false, label: 'Não' },
                        ]}
                        error={
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment &&
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment[0]
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <InputText
                        type="number"
                        label={
                          <>
                            Quantidade
                            <a data-for="soclose" data-tip="8" className="ml-3">
                              <Info />
                            </a>
                          </>
                        }
                        placeholder="Ex: 200"
                        name="amount"
                        value={controllerFormCombo.formDataCombo[FormInputName.amount]}
                        onChange={e =>
                          controllerFormCombo.onChangeFormInputCombo(FormInputName.amount)(
                            e.target.value,
                          )
                        }
                        error={
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment &&
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment[0]
                        }
                      />
                      <ReactTooltip
                        id="soclose"
                        effect="solid"
                        place={'right'}
                        border={true}
                        type={'light'}
                      >
                        Ao digitar a quantidade 0 (zero), o combo se torna ilimitado.
                      </ReactTooltip>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <InputText
                        type="number"
                        label="Valor do combo"
                        placeholder="Ex: 160,00"
                        name="totalValue"
                        value={controllerFormCombo.formDataCombo[FormInputName.totalValue]}
                        onChange={e =>
                          controllerFormCombo.onChangeFormInputCombo(FormInputName.totalValue)(
                            e.target.value,
                          )
                        }
                        error={
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment &&
                          controllerFormCombo.formErrorsCombo.allowCreditCardPayment[0]
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <InputFile label="Imagem do combo (opcional)" name={''} />
                      <div className="mb-4 border-bottom-title w-100">
                        <h5 className="mb-2mb-5">Produtos do combo</h5>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                {product.map((sub, index) => (
                  <div key={index}>
                    <Row>
                      <Col md={6}>
                        <SelectCreateable
                          label="Produto"
                          name="product"
                          value={sub.name}
                          onChange={e => {
                            handleChangeProduct('name', index, e?.value as string);
                          }}
                          placeholder="Digite ou selecione o produto"
                          options={listProductSubGroup.map(item => ({
                            value: item.name,
                            label: item.name,
                          }))}
                          noPadding={true}
                        />
                      </Col>
                      <Col md={2}>
                        <InputText
                          type="number"
                          label="Quantidade"
                          name="amount"
                          value={String(sub.amount)}
                          onChange={e => {
                            handleChangeProduct('amount', index, e?.target.value as string);
                          }}
                          placeholder="Ex: 100"
                        />
                      </Col>
                      {index === product.length - 1 ? (
                        <Col md={4}>
                          <div
                            className="mt-5 action-icon"
                            onClick={() => {
                              addProduct(String(index));
                            }}
                          >
                            adicionar novo produto no combo
                          </div>
                        </Col>
                      ) : (
                        <Col>
                          {index !== product.length - 1 && (
                            <X onClick={() => removeProduct(index)} className="mt-5 action-icon" />
                          )}
                        </Col>
                      )}
                    </Row>
                  </div>
                ))}
                <div className="d-flex justify-content-end register-buttom">
                  <span
                    className="action-icon"
                    onClick={() => {
                      handleAddProduct();
                    }}
                  >
                    + cadastrar combo
                  </span>
                </div>
              </Form>
            </Container>
            <div className="mt-5">
              <Row>
                <Col style={{ padding: '0' }}>
                  <SuperCollapse
                    overflow={true}
                    title="Combos cadastrados"
                    content={
                      combo.length > 0 ? (
                        combo.map((combos, index) => (
                          <div key={index}>
                            <div className="ml-3 mt-3 d-flex align-items-center">
                              {combo.length > 0 ? (
                                <>
                                  <span
                                    style={{ whiteSpace: 'nowrap', fontWeight: '300' }}
                                    className="secondary-table-title"
                                  >
                                    Combo # {index + 1}{' '}
                                    <span style={{ transform: 'scale(5)' }}> · </span>
                                    <span style={{ fontWeight: '500' }}>
                                      {controllerFormCombo.formDataCombo.name}
                                    </span>
                                  </span>
                                  <div className="mt-4 d-flex w-100 justify-content-end">
                                    <Switch
                                      label="Vender online"
                                      className="ml-5 action-icon"
                                      name="allowSellingWebsite"
                                      onChange={() => onChangeAllowOnlineSwitch(combos)}
                                      checked={!!combos.allowSellingWebsite}
                                    />
                                    <Switch
                                      label="Combo ativo"
                                      className="ml-5 action-icon"
                                      name="status"
                                      onChange={() => onChangeComboSwitch(combos)}
                                      checked={!!combos.status}
                                    />
                                  </div>
                                </>
                              ) : null}
                            </div>

                            <CustomTable
                              theme="secondary"
                              numberRowsPerPage={0}
                              progressPending={false}
                              columns={[
                                {
                                  name: 'Produtos',
                                  width: '35%',
                                  selector: row => row.name,
                                },
                                {
                                  name: 'Quantidade',
                                  width: '20%',
                                  selector: row => row.amount,
                                },
                                {
                                  name: 'Valor do Combo',
                                  width: '20%',
                                  selector: row => row.totalValue,
                                },
                                {
                                  name: (
                                    <>
                                      <ItemConfig
                                        onClick={(): void => {
                                          onToggle();
                                          onShouldShowModal({
                                            value: ShouldShowModal.comboConfig,
                                            newTitleModal: `Configurações do combo #${index + 1}`,
                                          });
                                        }}
                                        className="mr-3 action-icon"
                                      />
                                      <Pen className="mr-3 action-icon" />
                                      <Trash
                                        className="action-icon"
                                        onClick={() => onShowDeleteCombo(combos)}
                                      />
                                    </>
                                  ),
                                  selector: row => row.action,
                                  right: true,
                                },
                              ]}
                              data={combos.products.map((products, productIndex) => ({
                                id: products.id,
                                name: products.name,
                                amount: `${products.amount} un`,
                                totalValue: productIndex === 0 ? `R$ ${combos.totalValue}` : null,
                                action: '',
                              }))}
                            />
                          </div>
                        ))
                      ) : (
                        <div>
                          Nenhum combo cadastrado. Aqui será exibida uma lista dos combos
                          cadastrados
                        </div>
                      )
                    }
                    leftIcon={TicketIcon}
                  />
                </Col>
              </Row>
            </div>
          </>
        )}
        <div className="d-flex justify-content-end">
          <Button
            title="Voltar etapa"
            theme="noneBorder"
            onClick={() => controllerProductActions.onReturnTab()}
          />
          <Button
            title="Próxima etapa"
            theme="outlineDark"
            className="ml-3"
            onClick={async () => {
              await controllerProductActions.onNextTab();
            }}
          />
        </div>
      </Container>
    </>
  );
};
