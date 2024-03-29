import {
  Button,
  ButtonGroup,
  Loading,
  // Loading,
  SelectCustom,
} from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { CustomTable } from '@/components/Table';
import React from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { X } from 'react-feather';

import ProductIcon from '@/assets/images/svg/Product';
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
  state: States;
  controllerFormPos: formPdvProductProps;
  nextTab: () => void;
  backTab: () => void;
  onChangeSection: (sectionId: string) => void;
  onAddAll: () => void;
  onAddProduct: () => void;
  onShowDeleteProduct: (sectionId: string, productId: string) => void;
  handleHasProduct: (b: string) => Promise<void>;
}
export const PdvProductContainer: React.FC<SectorProductPosContainerProps> = ({
  state,
  controllerFormPos,
  onChangeSection,
  onAddAll,
  onAddProduct,
  onShowDeleteProduct,
  nextTab,
  backTab,
  handleHasProduct,
}) => {
  const { formData, formErrors, sections, productsAndCombos, tableContent, onChangeFormInput } =
    controllerFormPos;
  return (
    <>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <h6 className="mb-5">Inserindo produtos</h6>
        <Form>
          <FormGroup>
            <ButtonGroup
              label="Permitir produto?"
              name="allowPos"
              value={formData[FormInputName.allowProduct]}
              onChange={e => {
                handleHasProduct(e?.target?.value);
                onChangeFormInput(FormInputName.allowProduct)(e?.target?.value);
              }}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={formErrors.allowProduct && formErrors.allowProduct[0]}
            />
          </FormGroup>
        </Form>
        {formData[FormInputName.allowProduct] === 'true' ? (
          <>
            <div className="card-ligth-color mb-5 w-100">
              <Row>
                <Col md={5}>
                  <SelectCustom
                    name="sector"
                    label="Setor"
                    placeholder="Digite ou selecione o setor"
                    value={formData[FormInputName.sector]}
                    onChange={e => {
                      onChangeFormInput(FormInputName.sector)(e?.value as string);
                      onChangeSection(e?.value as string);
                    }}
                    options={sections.map(data => ({
                      value: data.sectionId,
                      label: data.sectionNome,
                    }))}
                    error={formErrors.sector && formErrors.sector[0]}
                  />
                </Col>
                <Col md={5}>
                  <SelectCustom
                    name="product"
                    label="Produtos"
                    placeholder="Digite ou selecione o produto"
                    value={formData[FormInputName.product]}
                    onChange={e => onChangeFormInput(FormInputName.product)(e?.value as string)}
                    options={productsAndCombos.map(data => ({
                      value: data.id,
                      label: data.product,
                    }))}
                    error={formErrors.product && formErrors.product[0]}
                    disabled={formData[FormInputName.sector] === ''}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="d-flex justify-content-between mt-5">
                    <div
                      onClick={() => onAddAll()}
                      className={`action-icon link-green ${
                        formData[FormInputName.sector] === ''
                          ? 'disable-text input-action-disabled '
                          : ''
                      }`}
                    >
                      Inserir TODOS produtos desse setor
                    </div>
                    <div
                      onClick={() => onAddProduct()}
                      className={`action-icon link-green ${
                        formData[FormInputName.product] === ''
                          ? 'disable-text input-action-disabled '
                          : ''
                      }`}
                    >
                      Inserir produto
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <Row>
              <Col></Col>
            </Row>
            <SuperCollapse
              disabled={formData[FormInputName.allowProduct] !== 'true'}
              title="Setores e produtos inseridos"
              count={tableContent.length}
              content={
                tableContent && tableContent.length > 0
                  ? tableContent.map((eventSectionProduct, index) => (
                      <div
                        className={`${index === tableContent.length - 1 ? 'mb-0' : 'mb-5'}`}
                        key={index}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <div className="mb-3 w-100">
                            <span className="secondary-table-title light-text">
                              Setor{index + 1}{' '}
                            </span>
                            <span className="secondary-table-title name">
                              • {eventSectionProduct.sectionNome}
                            </span>
                          </div>
                        </div>
                        <div>
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
                                name: '',
                                selector: row => row.actions,
                                right: true,
                              },
                            ]}
                            data={eventSectionProduct.productsAndCombos.map(productAndCombo => ({
                              product: productAndCombo.product,
                              group: productAndCombo.group,
                              subGroup: productAndCombo.subGroup,
                              amount: productAndCombo.amount,
                              value: productAndCombo.value,
                              actions: (
                                <X
                                  className="action-icon svg-icon-trash"
                                  onClick={() =>
                                    onShowDeleteProduct(
                                      eventSectionProduct.sectionId,
                                      productAndCombo.id,
                                    )
                                  }
                                />
                              ),
                            }))}
                          />
                        </div>
                        {index === tableContent.length - 1 ? null : (
                          <hr style={{ margin: '25px -30px 30px -30px' }} className="mt-5" />
                        )}
                      </div>
                    ))
                  : 'Nenhum produto inserido'
              }
              leftIcon={ProductIcon()}
            />
          </>
        ) : (
          <div className="pb-4"></div>
        )}

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
