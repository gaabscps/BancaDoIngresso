import TicketIcon from '@/assets/images/svg/Ticket';
import { ButtonGroup, InputText, Loading, SelectCustom, Switch } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as Config } from '@/assets/images/svg/config.svg';
import { CustomTable } from '@/components/Table';
import React from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorProductPosContainerProps {
  state: States;
}
export const SectorPosContainer: React.FC<SectorProductPosContainerProps> = ({ state }) => {
  console.log(States);
  return (
    <>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <Row>
          <Col>
            <h6 className="mb-5">Configurando POS</h6>
            <Form>
              <FormGroup>
                <ButtonGroup
                  label="Permitir POS?"
                  name="allowPos"
                  value="true"
                  onChange={() => undefined}
                  options={[
                    { value: true, label: 'Sim' },
                    { value: false, label: 'Não' },
                  ]}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Col>
          <Row>
            <div className="card-ligth-color mb-5 w-100">
              <Row>
                <Col md={7}>
                  <SelectCustom label="POS" name={''} value={''} options={[]} />
                </Col>
                <Col md={3}>
                  <InputText
                    label="Porcentagem do garçom (%)"
                    name={''}
                    value={''}
                    onChange={() => undefined}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div
                    className="link-green mb-5"
                    // onClick={() => {
                    //   if (productStates.product) {
                    //     productActions.onEdit(productStates.product);
                    //   } else {
                    //     productActions.onAdd();
                    //   }
                    // }}
                  >
                    + cadastrar produto
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="mr-5" md={3}>
                  <InputText
                    label="Porcentagem de comissão(%)"
                    name={''}
                    value={''}
                    onChange={() => undefined}
                  />
                </Col>
                <Col md={3}>
                  <ButtonGroup
                    label="Aceita desconto?"
                    name="allowPos"
                    value="true"
                    onChange={() => undefined}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="action-icon d-flex justify-content-end">Inserir POS</div>
                </Col>
              </Row>
            </div>
          </Row>
        </Col>
        <Row>
          <Col>
            <SuperCollapse
              title="POS’s inseridos"
              content={
                // change 0 to index
                <React.Fragment key="content">
                  <div className="d-flex w-100 justify-content-between">
                    <div className="mb-3 w-100">
                      <span className="secondary-table-title">POS #{0 + 1} </span>
                      <span className="secondary-table-title font-weight-bold">
                        • Máquininha do Seu Zé
                      </span>
                    </div>
                    <Switch
                      label={`POS  ativa`}
                      name=""
                      onChange={() => undefined}
                      checked={true}
                    />
                  </div>
                  <CustomTable
                    theme="secondaryWithoutBorder"
                    numberRowsPerPage={0}
                    progressPending={false}
                    columns={[
                      {
                        name: 'Nº de série',
                        selector: row => row.serialNumber,
                      },
                      {
                        name: 'Data do vínculo',
                        selector: row => row.date,
                      },
                      {
                        name: '% do garçom',
                        selector: row => row.waiter,
                      },
                      {
                        name: '% de comissão',
                        selector: row => row.commission,
                      },
                      {
                        name: '',
                        selector: row => row.actions,
                        right: true,
                      },
                    ]}
                    data={[
                      {
                        serialNumber: '098765',
                        date: '01/05/2022',
                        waiter: '3%',
                        commission: '5%',
                        actions: (
                          <>
                            <Config
                              className="mr-4 svg-icon action-icon"
                              onClick={() => undefined}
                            />
                            <Pen
                              width={15}
                              className="mr-4 svg-icon action-icon"
                              onClick={() => undefined}
                            />
                            <Trash
                              width={13}
                              className="action-icon svg-icon-trash"
                              onClick={() => undefined}
                            />
                          </>
                        ),
                      },
                    ]}
                  />
                </React.Fragment>
              }
              leftIcon={TicketIcon}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
