import TicketIcon from '@/assets/images/svg/Ticket';
import { ButtonGroup, InputText, Loading, SelectCustom, Switch } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as Config } from '@/assets/images/svg/config.svg';
import { CustomTable } from '@/components/Table';
import React from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { formPosProps } from '../../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  allowPos = 'allowPos',
  pos = 'pos',
  waiter = 'waiter',
  commission = 'commission',
  allowDiscount = 'allowDiscount',
}

interface SectorProductPosContainerProps {
  state: States;
  controllerFormPos: formPosProps;
}
export const SectorPosContainer: React.FC<SectorProductPosContainerProps> = ({
  state,
  controllerFormPos,
}) => {
  console.log(States);
  const { formData, formErrors, onChangeFormInput } = controllerFormPos;
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
                  value={formData[FormInputName.allowPos]}
                  onChange={e =>
                    onChangeFormInput(FormInputName.allowPos)(e?.target?.value as string)
                  }
                  options={[
                    { value: true, label: 'Sim' },
                    { value: false, label: 'Não' },
                  ]}
                  error={formErrors.allowPos && formErrors.allowPos[0]}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        {formData[FormInputName.allowPos] === 'true' ? (
          <>
            <Col>
              <Row>
                <div className="card-ligth-color mb-5 w-100">
                  <Row>
                    <Col md={7}>
                      <SelectCustom
                        name="pos"
                        label="POS"
                        value={formData[FormInputName.pos]}
                        onChange={e => onChangeFormInput(FormInputName.pos)(e?.value as string)}
                        options={[]}
                        error={formErrors.pos && formErrors.pos[0]}
                      />
                    </Col>
                    <Col md={3}>
                      <InputText
                        type="number"
                        label="Porcentagem do garçom (%)"
                        name="waiter"
                        placeholder="0"
                        value={formData[FormInputName.waiter]}
                        onChange={e => onChangeFormInput(FormInputName.waiter)(e.target.value)}
                        error={formErrors.waiter && formErrors.waiter[0]}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="link-green mb-5">+ cadastrar produto</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mr-5" md={3}>
                      <InputText
                        type="number"
                        label="Porcentagem de comissão(%)"
                        name="commission"
                        value={formData[FormInputName.commission]}
                        onChange={e => onChangeFormInput(FormInputName.commission)(e.target.value)}
                        error={formErrors.commission && formErrors.commission[0]}
                      />
                    </Col>
                    <Col md={3}>
                      <ButtonGroup
                        label="Aceita desconto?"
                        name="allowDiscount"
                        value={formData[FormInputName.allowDiscount]}
                        onChange={e =>
                          onChangeFormInput(FormInputName.allowDiscount)(e.target.value)
                        }
                        error={formErrors.allowDiscount && formErrors.allowDiscount[0]}
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
              <Col></Col>
            </Row>
          </>
        ) : (
          <div className="pb-4"></div>
        )}
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
