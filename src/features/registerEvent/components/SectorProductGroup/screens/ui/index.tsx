import React from 'react';
import { Button, DropdonwFlags, InputFile, Loading } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import TicketIcon from '@/assets/images/svg/Ticket';
import { X } from 'react-feather';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { SelectCreateable } from '@/components/SelectCreateable';
import { SimpleInputFile } from '@/components/SimpleInputFile';
import { appendFormProps, formGroupProps, groupStateProps, requestProps } from '../../types';
import { States } from '../../../ContractorScreen/screens/ui';

interface SectorProductGroupContainerProps {
  state: string;
  controllerFormGroup: formGroupProps;
  controllerAppendForm: appendFormProps;
  controllerRequest: requestProps;
  groupState: groupStateProps;
  onNextTab: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onShowDeleteProduct: (groupSelected: any) => void;
}

export interface DataRowDiscountCoupon {
  group: string;
  subgroup: string;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  id = 'id',
  name = 'name',
  imageBase64Group = 'imageBase64Group',
}

export const SectorProductGroupContainer: React.FC<SectorProductGroupContainerProps> = ({
  state,
  controllerRequest,
  controllerFormGroup,
  controllerAppendForm,
  groupState,
  onShowDeleteProduct,
  onNextTab,
}): JSX.Element => {
  const {
    addSubGroup,
    onChangeSubGroup,
    removeSubGroup,
    onChangeAppendFileInput,
    onResetAppendFileInput,
    nameFilesSub,
  } = controllerAppendForm;
  const { listGroupSubGroup, groupOptions, subGroup, subGroupOptions, groupsState } = groupState;
  const {
    formDataGroup,
    formErrorsGroup,
    onChangeFileInput,
    nameFiles,
    onChangeFormInputGroup,
    setErrorsGroup,
  } = controllerFormGroup;
  const { onGetProductSubGroupList, onSaveGroup, onGetGroup, onCancelEdit } = controllerRequest;
  const titleRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Loading isVisible={state === States.loading} />
      <Container style={{ maxWidth: '100%' }} className="mainContainer">
        <Row>
          <Col>
            <h6 ref={titleRef} className="mb-5">
              {groupsState ? `Editando ${groupsState.name}` : 'Cadastrando grupos'}
            </h6>
          </Col>
        </Row>
        <div className="card-ligth-color mb-5">
          <Form>
            <Row>
              <Col md={8}>
                <FormGroup>
                  <SelectCreateable
                    label="Nome do grupo"
                    name="name"
                    onChange={e => {
                      const groups = groupOptions.find(item => item.id === e?.value);
                      if (groups?.id) {
                        onChangeFormInputGroup(FormInputName.id)(e?.value as string);
                        onChangeFormInputGroup(FormInputName.name)(groups.name as string);
                      } else {
                        onChangeFormInputGroup(FormInputName.id)('' as string);
                        onChangeFormInputGroup(FormInputName.name)(e?.value as string);
                      }
                      if (groups?.id) {
                        onGetProductSubGroupList(e?.value as string);
                      }
                      setErrorsGroup({ ...formErrorsGroup, id: [] });
                    }}
                    value={formDataGroup[FormInputName.id]}
                    options={groupOptions.map(item => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    placeholder="Digite o nome do grupo. Ex: Bebidas"
                    error={formErrorsGroup.id && formErrorsGroup.id[0]}
                  />
                  <InputFile
                    label="Imagem do grupo (opcional)"
                    name="imageBase64Group"
                    fileName={nameFiles.imageBase64Group}
                    onChange={e =>
                      onChangeFileInput(FormInputName.imageBase64Group)(
                        (e.target as HTMLInputElement)?.files?.[0],
                      )
                    }
                    error={formErrorsGroup.imageBase64Group && formErrorsGroup.imageBase64Group[0]}
                  />
                </FormGroup>
              </Col>
            </Row>
            {subGroup.map((sub, index) => (
              <div key={index}>
                <Row>
                  <Col md={8}>
                    <SelectCreateable
                      label="Nome do subgrupo"
                      name="productSubGroupName"
                      value={sub.id as string}
                      onChange={e => {
                        const subGroups = subGroupOptions.find(item => item.id === e?.value);
                        if (subGroups?.id) {
                          onChangeSubGroup('id', index, e?.value as string);
                          onChangeSubGroup('name', index, subGroups?.name as string);
                        } else {
                          onChangeSubGroup('id', index, '' as string);
                          onChangeSubGroup('name', index, e?.value as string);
                        }
                      }}
                      placeholder="Bebidas doces"
                      options={subGroupOptions.map(item => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      noPadding={true}
                    />
                  </Col>
                  {index === subGroup.length - 1 ? (
                    <Col md={4}>
                      <div className="mt-5 action-icon" onClick={() => addSubGroup(String(index))}>
                        adicionar novo subgrupo
                      </div>
                    </Col>
                  ) : (
                    <Col>
                      {index !== subGroup.length - 1 && (
                        <X onClick={() => removeSubGroup(index)} className="mt-5 action-icon" />
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
                        e.target.value = '';
                      }}
                      error={
                        formErrorsGroup.imageBase64SubGroup &&
                        formErrorsGroup.imageBase64SubGroup[0]
                      }
                    />
                  </Col>
                  <Col md={4}>
                    {nameFilesSub[`imageBase64SubGroup-${index}`] && (
                      <X
                        onClick={() =>
                          onResetAppendFileInput(`imageBase64SubGroup-${index}`, index)
                        }
                        className="mt-3 pt-1 action-icon"
                      />
                    )}
                  </Col>
                </Row>
              </div>
            ))}
            <div className="d-flex justify-content-end">
              <div
                className="mr-3"
                onClick={() => {
                  onCancelEdit();
                }}
              >
                {groupsState ? 'Cancelar' : null}
              </div>
              <div
                className="link-green"
                onClick={() => {
                  onSaveGroup();
                }}
              >
                {groupsState ? 'salvar' : '+ cadastrar grupo'}
              </div>
            </div>
          </Form>
        </div>
        <div className="mt-5">
          <Row>
            <Col style={{ padding: '0' }}>
              <SuperCollapse
                noPadding={true}
                overflow={true}
                title={'Grupos cadastrados'}
                content={
                  listGroupSubGroup.length > 0 ? (
                    // eslint-disable-next-line no-shadow
                    listGroupSubGroup.map((group, index) => (
                      <React.Fragment key={index}>
                        {index > 0 ? <hr style={{ margin: '25px 0px 30px -50px' }} /> : null}
                        <div className={groupsState ? 'disabled-content' : ''}>
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
                              <span style={{ fontWeight: '500' }}>{group?.name}</span>
                            </span>
                            <span className="secondary-table-title ml-5">{'//'}</span>
                            <div className="d-flex w-100">
                              <div
                                className="d-flex align-items-center"
                                style={{ flexWrap: 'nowrap' }}
                              >
                                <span
                                  onClick={() => window.console.log('item', group)}
                                  className="secondary-table-title ml-5 mr-2"
                                >
                                  Subgrupo
                                </span>
                                {group.subGroups.length !== 1 ? (
                                  <DropdonwFlags
                                    style={{ color: '#000 !important', fontWeight: '500' }}
                                    dataColumn={group?.subGroups?.map(subgroup => ({
                                      id: group?.id || undefined,
                                      name: subgroup?.name || '',
                                    }))}
                                    pointerClass={true}
                                  />
                                ) : (
                                  <DropdonwFlags
                                    style={{
                                      color: '#000 !important',
                                      fontWeight: '500',
                                      marginRight: '32px',
                                    }}
                                    dataColumn={group?.subGroups?.map(subgroup => ({
                                      id: group?.id || '',
                                      name: subgroup?.name || '',
                                    }))}
                                  />
                                )}
                              </div>
                              <div className="d-flex align-items-center">
                                <Pen
                                  onClick={() => onGetGroup(group)}
                                  className="ml-5 action-icon"
                                />
                                <Trash
                                  onClick={() => onShowDeleteProduct(group?.id || '')}
                                  className="ml-5 action-icon"
                                />
                              </div>
                            </div>
                          </div>
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
};
