import TicketIcon from '@/assets/images/svg/Ticket';
import {
  Button,
  ButtonGroup,
  // Loading,
  SelectCustom,
} from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { CustomTable } from '@/components/Table';
import React from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { X } from 'react-feather';

import { formPdvProductProps } from '../../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  configPos = 'configPos',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  allowProduct = 'allowProduct',
  sector = 'sector',
  product = 'product',
}

interface SectorProductPosContainerProps {
  // state: States;
  controllerFormPos: formPdvProductProps;
  nextTab: () => void;
  backTab: () => void;
  handleOnShowDeleteProduct: (id: any) => void;
}
export const PdvProductContainer: React.FC<SectorProductPosContainerProps> = ({
  // state,
  controllerFormPos,
  handleOnShowDeleteProduct,
  nextTab,
  backTab,
}) => {
  const { formData, formErrors, onChangeFormInput, isFormValid } = controllerFormPos;

  const eventSectionsProductListMock = [
    {
      eventSections: [
        {
          section: {
            id: 12314,
            name: 'Setor 1',
          },
          products: [
            {
              id: 1,
              name: 'Produto 1',
              categorySubGroup: {
                id: 1,
                name: 'Categoria 1',
                categoryGroup: {
                  id: 1,
                  name: 'Grupo 1',
                },
              },
            },
            {
              id: 2,
              name: 'Produto 2',
              categorySubGroup: {
                id: 2,
                name: 'Categoria 2',
                categoryGroup: {
                  id: 2,
                  name: 'Grupo 2',
                },
              },
            },
          ],
        },
      ],
    },
    {
      eventSections: [
        {
          section: {
            id: 1,
            name: 'Setor 1',
          },
          products: [
            {
              id: 1,
              name: 'Produto 1',
              categorySubGroup: {
                id: 1,
                name: 'Categoria 1',
                categoryGroup: {
                  id: 1,
                  name: 'Grupo 1',
                },
              },
            },
            {
              id: 2,
              name: 'Produto 2',
              categorySubGroup: {
                id: 2,
                name: 'Categoria 2',
                categoryGroup: {
                  id: 2,
                  name: 'Grupo 2',
                },
              },
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {/* <Loading isVisible={state === States.loading} /> */}
      <Container className="mainContainer" fluid={true}>
        <Row>
          <Col>
            <h6 className="mb-5">Inserindo produtos</h6>
            <Form>
              <FormGroup>
                <ButtonGroup
                  label="Permitir produto?"
                  name="allowPos"
                  value={formData[FormInputName.allowProduct]}
                  onChange={e =>
                    onChangeFormInput(FormInputName.allowProduct)(e?.target?.value as string)
                  }
                  options={[
                    { value: true, label: 'Sim' },
                    { value: false, label: 'Não' },
                  ]}
                  error={formErrors.allowProduct && formErrors.allowProduct[0]}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        {formData[FormInputName.allowProduct] === 'true' ? (
          <>
            <Col>
              <Row>
                <div className="card-ligth-color mb-5 w-100">
                  <Row>
                    <Col md={5}>
                      <SelectCustom
                        name="sector"
                        label="Setor"
                        value={formData[FormInputName.sector]}
                        onChange={e => onChangeFormInput(FormInputName.sector)(e?.value as string)}
                        options={[{ value: '1', label: 'Setor 1' }]}
                        error={formErrors.sector && formErrors.sector[0]}
                      />
                    </Col>
                    <Col md={5}>
                      <SelectCustom
                        name="product"
                        label="Produtos"
                        value={formData[FormInputName.product]}
                        onChange={e => onChangeFormInput(FormInputName.product)(e?.value as string)}
                        options={[{ value: '1', label: 'Produto 1' }]}
                        error={formErrors.product && formErrors.product[0]}
                        disabled={formData[FormInputName.sector] === ''}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div className="d-flex justify-content-between mt-5">
                        <div
                          onClick={() => {
                            if (isFormValid()) {
                              console.log('adicionar todos os produto');
                            }
                          }}
                          className={`action-icon link-green ${
                            formData[FormInputName.sector] === ''
                              ? 'disable-text input-action-disabled '
                              : ''
                          }`}
                        >
                          Inserir TODOS produtos desse setor
                        </div>
                        <div
                          onClick={() => {
                            if (isFormValid()) {
                              console.log('adicionar produto');
                            }
                          }}
                          className={`action-icon link-green ${
                            formData[FormInputName.product] === ''
                              ? 'disable-text input-action-disabled '
                              : ''
                          }`}
                        >
                          Inserir produtos
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Row>
            </Col>
            <Row>
              <Col></Col>
            </Row>
          </>
        ) : (
          <div className="pb-4"></div>
        )}
        <Row>
          <Col>
            <SuperCollapse
              disabled={formData[FormInputName.allowProduct] !== 'true'}
              title="Setores e produtos inseridos"
              content={
                // change 0 to index
                eventSectionsProductListMock.map(eventSectionProduct =>
                  eventSectionProduct.eventSections.map((eventSection, index) => (
                    <>
                      <div className="d-flex w-100 justify-content-between">
                        <div className="mb-3 w-100">
                          <span className="secondary-table-title light-text">
                            Setor{index + 1}{' '}
                          </span>
                          <span className="secondary-table-title name">
                            • {eventSection.section.name}
                          </span>
                        </div>
                      </div>
                      <div className="mb-5">
                        <CustomTable
                          theme="secondaryWithoutBorder"
                          numberRowsPerPage={0}
                          progressPending={false}
                          columns={[
                            {
                              name: 'Produto',
                              selector: row => row.product,
                            },
                            {
                              name: 'Grupo',
                              selector: row => row.group,
                            },
                            {
                              name: 'Subgrupo',
                              selector: row => row.subGroup,
                            },
                            {
                              name: 'Quantidade',
                              selector: row => row.amount,
                            },
                            {
                              name: 'Valor unitário',
                              selector: row => row.value,
                            },
                            {
                              name: (
                                <>
                                  <Pen
                                    className="mr-4 svg-icon action-icon"
                                    onClick={() => undefined}
                                  />
                                  <X
                                    className="action-icon svg-icon-trash"
                                    onClick={() => handleOnShowDeleteProduct(eventSection.section)}
                                  />
                                </>
                              ),
                              selector: row => row.actions,
                              right: true,
                            },
                          ]}
                          data={eventSection.products.map(product => ({
                            product: product.name,
                            group: product.categorySubGroup.categoryGroup.name,
                            subGroup: product.categorySubGroup.name,
                            amount: 'falta endpoint de quantidade',
                            value: 'falta endpoint de valor unitário',
                            actions: '',
                          }))}
                        />
                      </div>
                    </>
                  )),
                )
              }
              leftIcon={TicketIcon}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button title="Voltar etapa" theme="noneBorder" onClick={() => backTab()} />
          <Button
            title="Próxima etapa"
            theme="outlineDark"
            className="ml-3"
            onClick={async () => {
              nextTab();
            }}
          />
        </div>
      </Container>
    </>
  );
};
