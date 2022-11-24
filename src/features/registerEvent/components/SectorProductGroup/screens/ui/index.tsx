import React from 'react';
import { DropdonwFlags, InputFile, Loading } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import SectorProductGroup from '@/model/SectorProductGroup';
import TicketIcon from '@/assets/images/svg/Ticket';
import { X } from 'react-feather';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import GroupProduct from '@/model/SubgruopProduct';
import { SelectCreateable } from '@/components/SelectCreateable';
import ProductSubgroup from '@/model/ProductSubgroup';
import { SimpleInputFile } from '@/components/SimpleInputFile';
import ProductGroup from '@/model/ProductGroup';
import { formGroupProps } from '../../types';
import { States } from '../../../ContractorScreen/screens/ui';

interface SectorProductGroupContainerProps {
  state: string;
  subGroup: GroupProduct[];
  subGroupList: GroupProduct[];
  groupList: SectorProductGroup[];
  controllerFormGroup: formGroupProps;
  listProductSubGroup: ProductSubgroup[];
  listProductGroup: ProductGroup[];
  handleChangeGroup: (name: string, index: number, value: string | undefined) => void;
  handleAddGroup: () => Promise<void>;
  addGroup: (index: string) => void;
  removeGroup: (index: number) => void;
  handleFecthProductSubGroupList: (id: string) => Promise<void>;
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
  state,
  subGroup,
  groupList,
  subGroupList,
  controllerFormGroup,
  listProductGroup,
  listProductSubGroup,
  handleFecthProductSubGroupList,
  handleChangeGroup,
  handleAddGroup,
  addGroup,
  removeGroup,
}): JSX.Element => (
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

  <>
    <Loading isVisible={state === States.loading} />
    <Container style={{ maxWidth: '100%' }} className="mainContainer">
      <Row>
        <Col className="mb-5">
          <h6>Cadastrando grupos</h6>
        </Col>
      </Row>
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
                  label="Nome do grupo"
                  name="name"
                  onChange={e => {
                    controllerFormGroup.onChangeFormInputGroup(FormInputName.name)(
                      e?.value as string,
                    );
                    handleFecthProductSubGroupList(e?.value as string);
                  }}
                  value={controllerFormGroup.formDataGroup[FormInputName.name]}
                  options={listProductGroup.map(item => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  placeholder="Digite o nome do grupo. Ex: Bebidas"
                />
                <InputFile label="Imagem do grupo (opcional)" name="imageBase64" />
              </FormGroup>
            </Col>
          </Row>
          {subGroup.map((sub, index) => (
            <>
              <div key={sub.id}>
                <Row>
                  <Col md={8}>
                    <SelectCreateable
                      label="Nome do subgrupo"
                      name=""
                      value={sub.name}
                      onChange={e => {
                        handleChangeGroup('name', index, e?.value as string);
                      }}
                      placeholder="Bebidas doces"
                      options={listProductSubGroup.map(item => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      noPadding={true}
                    />
                  </Col>
                  {index === 0 ? (
                    <Col md={4}>
                      <div
                        className="ml-4 mt-5 action-icon"
                        onClick={() => addGroup(String(index))}
                      >
                        adicionar novo subgrupo
                      </div>
                    </Col>
                  ) : (
                    <Col>
                      {index !== 0 && (
                        <X onClick={() => removeGroup(index)} className="mt-5 ml-5 action-icon" />
                      )}
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md={6}>
                    <SimpleInputFile label={''} title={'subgrupo'} name={''} />
                  </Col>
                  <Col md={4}>
                    <X className="ml-5 mt-3 pt-1 action-icon" />
                  </Col>
                </Row>
              </div>
            </>
          ))}
          <div className="d-flex justify-content-end register-buttom">
            <span className="action-icon" onClick={() => handleAddGroup()}>
              + cadastrar grupo
            </span>
          </div>
        </Form>
      </Container>
      <div className="mt-5">
        <Row>
          <Col style={{ padding: '0' }}>
            <SuperCollapse
              noPadding={true}
              overflow={true}
              title={'Grupos cadastrados (0)'}
              content={
                groupList.length > 0 &&
                groupList.map((item, index) => (
                  <>
                    <div>
                      <div
                        style={{ marginRight: '20px' }}
                        className="mb-3 mt-3 ml-5 d-flex align-items-center "
                        key={index}
                      >
                        <span
                          style={{ whiteSpace: 'nowrap', fontWeight: '300' }}
                          className="secondary-table-title"
                        >
                          Grupo # {index + 1} <span style={{ transform: 'scale(5)' }}> · </span>
                          <span style={{ fontWeight: '500' }}>{item.name}</span>
                        </span>
                        <span className="secondary-table-title ml-5">{'//'}</span>
                        <div className="d-flex w-100">
                          <div className="d-flex align-items-center" style={{ flexWrap: 'nowrap' }}>
                            <span className="secondary-table-title ml-5 mr-2">Subgrupo</span>
                            <DropdonwFlags
                              style={{ color: '#000 !important', fontWeight: '500' }}
                              dataColumn={subGroupList}
                            />
                          </div>
                          <Pen className="ml-5 action-icon" />
                          <Trash className="ml-5 action-icon" />
                        </div>
                      </div>
                      {
                        // gray line before each item
                        index !== groupList.length - 1 && (
                          <div
                            className="mb-3 mt-3"
                            style={{
                              width: '100%',
                              height: '1px',
                              backgroundColor: '#E5E5E5',
                            }}
                          ></div>
                        )
                      }
                    </div>
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
