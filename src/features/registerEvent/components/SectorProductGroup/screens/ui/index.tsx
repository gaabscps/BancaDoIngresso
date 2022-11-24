import { DropdonwFlags, InputFile, InputText, Loading } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import SectorProductGroup from '@/model/SectorProductGroup';
import React from 'react';
import TicketIcon from '@/assets/images/svg/Ticket';
import { X } from 'react-feather';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import GroupProduct from '@/model/SubgruopProduct';
import { formGroupProps } from '../../types';

interface SectorProductGroupContainerProps {
  subGroup: GroupProduct[];
  subGroupList: GroupProduct[];
  groupList: SectorProductGroup[];
  controllerFormGroup: formGroupProps;
  handleChangeGroup: (name: string, index: number, value: string) => void;
  handleAddGroup: () => Promise<void>;
  addGroup: (index: string) => void;
  removeGroup: (index: number) => void;
}

export interface DataRowDiscountCoupon {
  group: string;
  subgroup: string;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  image = 'image',
}

export const SectorProductGroupContainer: React.FC<SectorProductGroupContainerProps> = ({
  subGroup,
  groupList,
  subGroupList,
  controllerFormGroup,
  handleChangeGroup,
  handleAddGroup,
  addGroup,
  removeGroup,
}): JSX.Element => {
  // const datarow = groupList.map((item, index) => ({
  //   id: index,
  //   group: <div onClick={() => console.log(item.group)}>{item.name}</div>,
  //   group: item.group?.find(sub => sub.id === item.id)?.name,
  //   actions: (
  //     <div className="d-flex align-items-center">
  //       <X size={20} className="cursor-pointer" onClick={() => removeGroup(index)} />
  //     </div>
  //   ),
  // }));
  console.log('subGroup', subGroup);
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
                  value={controllerFormGroup.formDataGroup[FormInputName.name]}
                  onChange={e =>
                    controllerFormGroup.onChangeFormInputGroup(FormInputName.name)(
                      e?.target?.value as string,
                    )
                  }
                  placeholder="Digite o nome do grupo. Ex: Bebidas"
                />
                <InputFile label="Imagem do grupo (opcional)" name={''} />
              </FormGroup>
            </Col>
          </Row>
          {subGroup.map((sub, index) => (
            <>
              <Row>
                <Col md={12}>
                  <div className="d-flex">
                    <div key={sub.id}>
                      <InputText
                        label="Nome do subgrupo"
                        name=""
                        value={sub.name}
                        onChange={e => handleChangeGroup('name', index, e?.target.value)}
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
                        onClick={() => addGroup(String(index))}
                      >
                        adicionar novo subgrupo
                      </div>
                    )}
                    {index !== 0 && (
                      <X onClick={() => removeGroup(index)} className="mt-5 ml-5 action-icon" />
                    )}
                  </div>
                </Col>
              </Row>
            </>
          ))}
          <div className="d-flex justify-content-end register-buttom">
            <span className="action-icon" onClick={() => handleAddGroup()}>
              + cadastrar grupo
            </span>
          </div>
        </Form>
        <div className="mt-5">
          <Row>
            <Col>
              <SuperCollapse
                title={'Grupos cadastrados (0)'}
                content={
                  groupList.length > 0 &&
                  groupList.map((item, index) => (
                    <>
                      <div
                        style={{ marginRight: '20px' }}
                        className="mb-3 d-flex align-items-center "
                        key={index}
                      >
                        <span style={{ whiteSpace: 'nowrap' }} className="secondary-table-title">
                          Grupo # {index + 1} <b> ·</b> {item.name}
                        </span>
                        <span className="secondary-table-title ml-5">{'//'}</span>
                        <div className="d-flex w-100">
                          <div>
                            <span className="secondary-table-title ml-5 mr-2">Subgrupo</span>
                            <DropdonwFlags
                              style={{ color: '#000 !important' }}
                              dataColumn={subGroupList}
                            />
                          </div>
                          <X className="ml-5 action-icon" />
                        </div>
                      </div>
                      <div
                        className="mb-3"
                        style={{
                          borderBottom: '1px solid #d9d9d9',
                          marginRight: '20px',
                          transform: 'scaleX(1.13)',
                        }}
                      />
                    </>
                  ))
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
