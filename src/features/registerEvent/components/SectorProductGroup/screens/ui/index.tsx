import React from 'react';
import { Button, DropdonwFlags, InputFile, Loading } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
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
import EventGroupSubgroup from '@/model/EventGroupSubgroup';
import { formGroupProps } from '../../types';
import { States } from '../../../ContractorScreen/screens/ui';
import { NameFiles } from '..';

interface SectorProductGroupContainerProps {
  state: string;
  subGroup: GroupProduct[];
  controllerFormGroup: formGroupProps;
  listProductSubGroup: ProductSubgroup[];
  listProductGroup: ProductGroup[];
  listGroupSubgroup: EventGroupSubgroup[];
  nameFiles: NameFiles;
  nameFilesSub: NameFiles;
  handleClearAppendFileInput: (inputName: string, index: number) => void;
  onChangeAppendFileInput: (inputName: string, index: number) => (value: File | undefined) => void;
  handleOnSaveGroup: () => Promise<void>;
  handleChangeGroup: (name: string, index: number, value: string | undefined) => void;
  handleAddGroup: () => Promise<void>;
  addGroup: (index: string) => void;
  removeGroup: (index: number) => void;
  handleFecthProductSubGroupList: (id: string) => Promise<void>;
  onNextTab: () => void;
  handleOnConfirmDeleteTopProduct: (id: string) => Promise<void>;
}

export interface DataRowDiscountCoupon {
  group: string;
  subgroup: string;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  categoryGroupName = 'categoryGroupName',
  imageBase64Group = 'imageBase64Group',
  productSubGroupName = 'productSubGroupName',
  imageBase64SubGroup = 'imageBase64SubGroup',
}

export const SectorProductGroupContainer: React.FC<SectorProductGroupContainerProps> = ({
  state,
  subGroup,
  nameFiles,
  nameFilesSub,
  controllerFormGroup,
  listProductGroup,
  listProductSubGroup,
  listGroupSubgroup,
  handleClearAppendFileInput,
  onChangeAppendFileInput,
  handleOnConfirmDeleteTopProduct,
  handleOnSaveGroup,
  handleFecthProductSubGroupList,
  handleChangeGroup,
  // handleAddGroup,
  addGroup,
  removeGroup,
  onNextTab,
}): JSX.Element => (
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
                  name="categoryGroupName"
                  onChange={e => {
                    controllerFormGroup.onChangeFormInputGroup(FormInputName.categoryGroupName)(
                      e?.value as string,
                    );
                    handleFecthProductSubGroupList(
                      listProductGroup.find(item => item.id === e?.value)?.id || '',
                    );
                  }}
                  value={controllerFormGroup.formDataGroup[FormInputName.categoryGroupName]}
                  options={listProductGroup.map(item => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  placeholder="Digite o nome do grupo. Ex: Bebidas"
                />
                <InputFile
                  label="Imagem do grupo (opcional)"
                  name="imageBase64Group"
                  fileName={nameFiles.imageBase64Group}
                  onChange={e =>
                    controllerFormGroup.handleOnChangeFileInput(FormInputName.imageBase64Group)(
                      (e.target as HTMLInputElement)?.files?.[0],
                    )
                  }
                  error={
                    controllerFormGroup.formErrorsGroup.imageBase64Group &&
                    controllerFormGroup.formErrorsGroup.imageBase64Group[0]
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          {subGroup.map((sub, index) => (
            <div key={sub.id}>
              <Row>
                <Col md={8}>
                  <SelectCreateable
                    label="Nome do subgrupo"
                    name="productSubGroupName"
                    value={sub.name}
                    onChange={e => {
                      handleChangeGroup('name', index, e?.value as string);
                    }}
                    placeholder="Bebidas doces"
                    options={listProductSubGroup.map(item => ({
                      value: item.name,
                      label: item.name,
                    }))}
                    noPadding={true}
                  />
                </Col>
                {index === subGroup.length - 1 ? (
                  <Col md={4}>
                    <div className="mt-5 action-icon" onClick={() => addGroup(String(index))}>
                      adicionar novo subgrupo
                    </div>
                  </Col>
                ) : (
                  <Col>
                    {index !== subGroup.length - 1 && (
                      <X onClick={() => removeGroup(index)} className="mt-5 action-icon" />
                    )}
                  </Col>
                )}
              </Row>
              <Row>
                <Col md={6}>
                  <SimpleInputFile
                    key={index}
                    label=""
                    title="subgrupo"
                    name={`imageBase64SubGroup-${index}`}
                    fileName={nameFilesSub[`imageBase64SubGroup-${index}`]}
                    onChange={e => {
                      onChangeAppendFileInput(
                        `imageBase64SubGroup-${index}`,
                        index,
                      )((e.target as HTMLInputElement)?.files?.[0]);
                    }}
                    error={
                      controllerFormGroup.formErrorsGroup.imageBase64SubGroup &&
                      controllerFormGroup.formErrorsGroup.imageBase64SubGroup[0]
                    }
                  />
                </Col>
                <Col md={4}>
                  {nameFilesSub[`imageBase64SubGroup-${index}`] && (
                    <X
                      onClick={() =>
                        handleClearAppendFileInput(`imageBase64SubGroup-${index}`, index)
                      }
                      className="mt-3 pt-1 action-icon"
                    />
                  )}
                </Col>
              </Row>
            </div>
          ))}
          <div className="d-flex justify-content-end register-buttom">
            <span className="action-icon" onClick={() => handleOnSaveGroup()}>
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
              title={'Grupos cadastrados'}
              content={
                listGroupSubgroup.length > 0 ? (
                  listGroupSubgroup.map((item, index) => (
                    <React.Fragment key={index}>
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
                            <span style={{ fontWeight: '500' }}>{item?.categoryGroupName}</span>
                          </span>
                          <span className="secondary-table-title ml-5">{'//'}</span>
                          <div className="d-flex w-100">
                            <div
                              className="d-flex align-items-center"
                              style={{ flexWrap: 'nowrap' }}
                            >
                              <span className="secondary-table-title ml-5 mr-2">Subgrupo</span>
                              <DropdonwFlags
                                style={{ color: '#000 !important', fontWeight: '500' }}
                                dataColumn={item?.subGroups?.map(subgroup => ({
                                  id: subgroup?.productSubGroupId || '',
                                  name: subgroup?.productSubGroupName || '',
                                }))}
                              />
                            </div>
                            <Pen className="ml-5 action-icon" />
                            <Trash
                              onClick={() => handleOnConfirmDeleteTopProduct(item?.categoryGroupId)}
                              className="ml-5 action-icon"
                            />
                          </div>
                        </div>
                        {
                          // gray line before each item
                          index !== listGroupSubgroup.length - 1 && (
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
                    </React.Fragment>
                  ))
                ) : (
                  <div className="collapseTableText">
                    Nenhum grupo cadastrado. Aqui será exibida uma lista dos grupos cadastrados
                  </div>
                )
              }
              leftIcon={TicketIcon}
            />
          </Col>
        </Row>
      </div>
      <div className="d-flex justify-content-end">
        <Button
          title="Próxima etapa"
          theme="outlineDark"
          className="ml-3"
          onClick={() => {
            onNextTab();
          }}
        />
      </div>
    </Container>
  </>
);
