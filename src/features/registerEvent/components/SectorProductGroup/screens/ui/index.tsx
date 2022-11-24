import { InputFile, InputText, Loading } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import SectorProductGroup from '@/model/SectorProductGroup';
import React from 'react';
import TicketIcon from '@/assets/images/svg/Ticket';
import { X } from 'react-feather';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { formGroupProps } from '../../types';

interface SectorProductGroupContainerProps {
  group: SectorProductGroup[];
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
  group,
  groupList,
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
  console.log('group', group);
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
          {group.map((groupValue, groupIndex) =>
            groupValue.subgroup?.map((sub, index) => (
              <>
                <Row>
                  <Col md={12}>
                    <div className="d-flex">
                      <div key={groupValue.id}>
                        <InputText
                          label="Nome do subgrupo"
                          name=""
                          value={sub.name[index]}
                          onChange={e => handleChangeGroup('name', index, e?.target.value)}
                          placeholder="Digite o nome do subgrupo. Ex: Refrigerantes"
                        />
                        <div className="d-flex">
                          <InputFile name={''} />
                          <X className="ml-5 mt-3 pt-1 action-icon" />
                        </div>
                      </div>
                      {groupIndex === 0 && (
                        <div
                          className="ml-4 mt-5 action-icon"
                          onClick={() => addGroup(String(index))}
                        >
                          adicionar novo subgrupo
                        </div>
                      )}
                      {groupIndex !== 0 && (
                        <X onClick={() => removeGroup(index)} className="mt-5 ml-5 action-icon" />
                      )}
                    </div>
                  </Col>
                </Row>
              </>
            )),
          )}
          <div
            className="d-flex justify-content-end register-buttom action-icon"
            onClick={() => handleAddGroup()}
          >
            + cadastrar grupo
          </div>
        </Form>
        <div className="mt-5">
          <Row>
            <Col>
              <SuperCollapse
                title={'Grupos cadastrados (0)'}
                content={
                  // <CustomTable
                  //   numberRowsPerPage={0}
                  //   progressPending={false}
                  //   columns={columnsDiscountCoupon}
                  //   data={datarow}
                  groupList.length > 0 &&
                  groupList.map((item, index) => (
                    <div key={index}>
                      <h5>
                        Grupo # {groupList.length} - {item.name}
                        {' // '}
                        {/* <DropdonwFlags dataColumn={subgroup} /> */}
                      </h5>
                    </div>
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
