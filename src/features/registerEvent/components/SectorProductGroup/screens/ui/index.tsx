import { InputFile, InputText, Loading } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { CustomTable } from '@/components/Table';
import SectorProductGroup from '@/model/SectorProductGroup';
import React from 'react';
import TicketIcon from '@/assets/images/svg/Ticket';
import { X } from 'react-feather';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';

interface SectorProductGroupContainerProps {
  subgroup: SectorProductGroup[];
  addSubGroup: (index: string) => void;
  removeSubGroup: (index: number) => void;
}
export const SectorProductGroupContainer: React.FC<SectorProductGroupContainerProps> = ({
  subgroup,
  addSubGroup,
  removeSubGroup,
}): JSX.Element => {
  console.log('');
  return (
    <>
      <Loading isVisible={false} />
      <Container className="mainContainer" fluid={true}>
        <Row className="pb-4">
          <Col>
            <span>Cadastrando grupos</span>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md={8}>
              <FormGroup>
                <InputText
                  label="Nome do grupo"
                  name={''}
                  value={''}
                  onChange={() => undefined}
                  placeholder="Digite o nome do grupo. Ex: Bebidas"
                />
                <InputFile label="Imagem do grupo (opcional)" name={''} />
              </FormGroup>
            </Col>
          </Row>
          {subgroup.map((item, index) => (
            <>
              <Row>
                <Col md={12}>
                  <div className="d-flex">
                    <div key={item.id}>
                      <InputText
                        label="Nome do subgrupo"
                        name={''}
                        value={''}
                        onChange={() => undefined}
                        placeholder="Digite o nome do subgrupo. Ex: Refrigerantes"
                      />
                      <div className="d-flex">
                        <InputFile name={''} />
                        <X className="ml-5 mt-3 pt-1 action-icon" />
                      </div>
                    </div>
                    {index === 0 && (
                      <div
                        className="ml-4 mt-5 action-icon"
                        onClick={() => addSubGroup(String(index))}
                      >
                        adicionar novo subgrupo
                      </div>
                    )}
                    {index !== 0 && (
                      <X onClick={() => removeSubGroup(index)} className="mt-5 ml-5 action-icon" />
                    )}
                  </div>
                </Col>
              </Row>
            </>
          ))}
          <div className="d-flex justify-content-end register-buttom action-icon">
            + cadastrar grupo
          </div>
        </Form>
        <div className="mt-5">
          <Row>
            <Col>
              <SuperCollapse
                title={'Grupos cadastrados (0)'}
                content={
                  <CustomTable
                    numberRowsPerPage={0}
                    progressPending={false}
                    columns={[]}
                    data={[]}
                  />
                }
                leftIcon={TicketIcon}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
