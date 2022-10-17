/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dialog, Loading } from '@/components';
import { ActionProps } from '@/components/Dialog';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import useForm from '@/hooks/useForm';
import Profile from '@/model/Profile';
import User from '@/model/User';
import api, { AxiosError } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserType from '@/model/UserType';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Container,
  Label,
  UncontrolledAccordion,
} from 'reactstrap';
import { RegisterContent } from '../../components/RegisterContent';

// eslint-disable-next-line no-shadow
export enum FormInputUser {
  name = 'name',
  cpf = 'cpf',
  telephone = 'telephone',
  email = 'email',
  imageBase64 = 'imageBase64',
  password = 'password',
  userType = 'userType',
  status = 'status',
}

// eslint-disable-next-line no-shadow
enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  user = 'user',
  group = 'group',
}

export const UserScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState(States.default);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [title, setTitle] = useState('Usuários e Grupos');
  const [visible, setVisible] = useState(false);

  const [shouldShowModal, setShouldShowModal] = useState({} as ShouldShowModal);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState({} as User);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [group, setGroup] = useState({} as Profile);

  const {
    formData: formDataUser,
    formErrors: formErrorsUser,
    onChangeFormInput: onChangeFormInputUser,
    isFormValid: isFormValidUser,
    resetForm: resetFormUser,
    setErrors: setErrorsUser,
  } = useForm({
    initialData: {
      name: '',
      cpf: updateMaskCPFOrCNPJ(''),
      telephone: updateMaskMobilePhone(''),
      email: '',
      imageBase64: '',
      usertype: '0',
      password: '',
      status: '',
    },
    validators: {
      name: [validators.required],
      cpf: [validators.required, validators.cpforcnpj],
      telephone: [validators.required, validators.mobilePhone],
      email: [validators.required],
      userType: [validators.required],
      password: [validators.required],
    },
    formatters: {
      document: updateMaskCPFOrCNPJ,
      telephone: updateMaskMobilePhone,
    },
  });

  const handleOnChangeFileInput =
    (inputName: string) =>
    (file: File | undefined): void => {
      // validate if file is image
      if (file && file.type.includes('image')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result?.toString();
          if (base64) {
            onChangeFormInputUser(inputName)(base64);
          }
        };
      } else {
        setErrorsUser({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };

  const onToggle = (): void => {
    console.log();
    resetFormUser();
  };

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

  const getUsers = async (): Promise<void> => {
    setState(States.loading);
    const response = await api.get<User[]>('/user/find');
    setState(States.default);
    console.log(response.data);
  };

  const stringToUserType = (value: string): UserType => {
    let userType = UserType.Employee;
    switch (value) {
      case '0':
        userType = UserType.Employee;
        break;
      case '1':
        userType = UserType.PDV;
        break;
      case '2':
        userType = UserType.SUB_PDV;
        break;
      case '3':
        userType = UserType.POS;
        break;
      case '4':
        userType = UserType.CONTRACTOR;
        break;
      default:
        userType = UserType.Employee;
        break;
    }
    return userType;
  };

  const onSaveUser = async (): Promise<void> => {
    try {
      if (isFormValidUser()) {
        const payload: User = {
          id: user?.id,
          name: formDataUser[FormInputUser.name],
          cpf: formDataUser[FormInputUser.cpf],
          telephone: formDataUser[FormInputUser.telephone],
          email: formDataUser[FormInputUser.email],
          imageBase64: formDataUser[FormInputUser.imageBase64],
          userType: stringToUserType(formDataUser[FormInputUser.userType]),
          password: formDataUser[FormInputUser.password],
        };

        if (!payload.id) {
          await api.post<User>('/user', payload);
          toast.success(`PDV "${formDataUser[FormInputUser.name]}" cadastrado com sucesso!`);
        } else {
          await api.put<User>('/user', payload);
          toast.success(`PDV "${formDataUser[FormInputUser.name]}" atualizado com sucesso!`);
        }
        onToggle();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    user: userSelected,
    group: groupSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    user?: User;
    group?: Profile;
  }): void => {
    setShouldShowModal(value);
    setVisible(true);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <React.Fragment>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        position="center"
        isContentWithCard={shouldShowModal !== ShouldShowModal.group}
        actions={[
          {
            [ShouldShowModal.user]: renderActionDialogToCancel,
            [ShouldShowModal.group]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.user]: {
              title: user.id ? 'Editar usuário' : 'Cadastrar usuário',
              onClick: (): Promise<void> => onSaveUser(),
            },
            [ShouldShowModal.group]: {
              title: group.id ? 'Editar grupo' : 'Cadastrar grupo',
              onClick: (): Promise<void> => onSaveUser(),
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.user]: (
              <RegisterContent
                formData={formDataUser}
                formErrors={formErrorsUser}
                onChangeFormInput={onChangeFormInputUser}
                onChangeFileInput={handleOnChangeFileInput}
              />
            ),
            [ShouldShowModal.group]: (
              <RegisterContent
                formData={formDataUser}
                formErrors={formErrorsUser}
                onChangeFormInput={onChangeFormInputUser}
                onChangeFileInput={handleOnChangeFileInput}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>{title}</Label>
          </div>
          <div className="button-filter-container">
            <Button
              theme="outlineDark"
              size="md"
              title="+ Cadastrar grupo"
              style={{ marginRight: 25 }}
              onClick={(): void =>
                handleOnShouldShowModal({
                  value: ShouldShowModal.group,
                  newTitleModal: 'Cadastrar grupo',
                })
              }
            />

            <Button
              size="md"
              title="+ Cadastrar usuário "
              onClick={(): void =>
                handleOnShouldShowModal({
                  value: ShouldShowModal.user,
                  newTitleModal: 'Cadastrar usuário',
                })
              }
            />
          </div>
        </div>
        <div>
          <UncontrolledAccordion defaultOpen="user" open={'user'} className="card">
            <AccordionItem>
              <AccordionHeader targetId="user" className="card-header">
                Usuários cadastrados (3)
              </AccordionHeader>
              <AccordionBody accordionId="user">asdfasdfadsf</AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="group">Grupos cadastrados (3)</AccordionHeader>
              <AccordionBody accordionId="group">asdfasdfadsf</AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </div>
        {/*
        <CustomTable
          columns={columns}
          data={dataTablePdv}
          numberRowsPerPage={currentPage.pageSize}
          progressPending={state === States.loading}
        />
        <Pagination
          currentPage={currentPage.page}
          totalCount={currentPage.total}
          pageSize={currentPage.pageSize}
          onPageChange={page => onPaginationChange(page)}
          total={currentPage.total}
        />
        */}
      </Container>
    </React.Fragment>
  );
};
