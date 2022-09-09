import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';
import { ModalCustom } from '../Utils/Modal';
import Pos from '../../entities/Pos';

import Input from '../Utils/Input';
import Select from '../Utils/Select';
// import { createRequest, updateRequest, getRequest } from '../../store/ducks/pos/actions';
import { getAllRequest } from '../../store/ducks/pdv/actions';
import { ApplicationState } from '../../store';
import { PdvState } from '../../store/ducks/pdv/types';
import api from '../../services/api';
// import { PosState } from '../../store/ducks/pos/types';

interface ModalPosProps {
  show: boolean;
  setShow: (b: boolean) => void;
  idPos?: string;
  reload: () => Promise<void>;
}

interface DispatchProps {
  saveRequest: (data: Pos) => void;
}

type Props = ModalPosProps & DispatchProps;

const schema = yup.object().shape({
  // name: yup.string().required('Nome do POS é obrigatório'),
  // document: yup.string().required(),
  // telephone: yup.string().required(),
  // email: yup.string().required(),
  // address: yup.object().shape({
  //   zipCode: yup.string().required(),
  //   district: yup.string().required(),
  //   street: yup.string().required(),
  //   number: yup.string().required(),
  //   state: yup.string().required(),
  //   city: yup.string().required(),
  // }),
  // imageBase64: yup.string().required(),
  // facebookUrl: yup.string().required(),
  // twitterUrl: yup.string().required(),
  // linkedinUrl: yup.string().required(),
  // complement: yup.string().required(),
  // longitude: yup.number().required(),
  // latitude: yup.number().required(),
});

const statusOptions = [
  { value: 0, label: 'POS em estoque' },
  { value: 1, label: 'POS em uso' },
  { value: 2, label: 'POS reservada' },
  { value: 3, label: 'POS inativa' },
];

const RegisterPos = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const pdvStorage = useSelector<ApplicationState, PdvState>(store => store.pdv);
  // const posStorage = useSelector<ApplicationState, PosState>(store => store.pos);
  const [textModal, setTextModal] = useState({
    title: '',
    btnLabel: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    // watch,
    reset,
  } = useForm<Pos>({
    resolver: yupResolver(schema),
  });

  // TO DO: Separar requisição da parte de UI
  const getPos = async (id: string): Promise<void> => {
    try {
      const response: AxiosResponse<Pos> = await api.get(`/pos/${id}`);
      const entity = response.data;
      reset(entity);
    } catch (err) {
      const error = err as AxiosError;
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (props.show) {
      if (props.idPos) {
        getPos(props.idPos);
        setTextModal({
          title: 'Editar POS',
          btnLabel: 'Editar POS',
        });
      } else {
        reset({});
        setTextModal({
          title: 'Cadastrar nova POS',
          btnLabel: 'Cadastrar nova POS',
        });
      }
    }
  }, [props.show]);

  const getPdv = async (): Promise<void> => {
    await dispatch(getAllRequest());
  };

  const onSubmit = async (data: Pos): Promise<void> => {
    try {
      // if (idPos) props.saveRequest({ ...data, id: idPos });
      // else await props.saveRequest(data);
      props.saveRequest(data);
      props.reload();
      props.setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.show) {
      getPdv();
    }
  }, [props.show]);

  return (
    <ModalCustom
      title={textModal.title}
      show={props.show}
      setShow={props.setShow}
      isCard={true}
      onBtnAction={handleSubmit(onSubmit)}
      btnLabel={textModal.btnLabel}
    >
      <form>
        <Input
          label="Nome do POS"
          type="text"
          placeholder="Digite o nome do POS"
          register={register}
          name="name"
          error={errors?.name?.message}
        />
        <Input
          label="Nº de série da POS"
          type="text"
          placeholder="Digite o nº de serie da POS"
          register={register}
          name="serialNumber"
          error={errors?.serialNumber?.message}
        />
        <Select
          label="Situação da POS"
          options={statusOptions}
          name="status"
          placeholder="Selecione ou digite a situação da POS"
          control={control}
          error={errors?.status?.message}
        />
        <Select
          label="PDV (opcional)"
          options={
            pdvStorage?.data?.list?.map(pdv => ({
              label: pdv.name,
              value: pdv.id,
            })) || []
          }
          name="pdv.id"
          placeholder="Selecione ou digite o PDV à vincular"
          control={control}
          error={errors?.pdv?.id?.message}
        />
        <Input
          label="Modelo da POS (opcional)"
          type="text"
          placeholder="Digite o modelo da POS"
          register={register}
          name="model"
          error={errors?.model?.message}
        />
        <Input
          label="Operadora telefônica (opcional)"
          type="text"
          placeholder="Digite a operadora telefônica"
          register={register}
          name="telephoneOperator"
          error={errors?.telephoneOperator?.message}
        />
        <Input
          label="Operadora de Cartão (opcional)"
          type="text"
          placeholder="Digite a operadora de Cartão"
          register={register}
          name="cardOperator"
          error={errors?.cardOperator?.message}
        />
        <Input
          label="Data de validade (opcional)"
          type="text"
          placeholder="DD/MM/AAAA"
          register={register}
          name="expirationDate"
          error={errors?.expirationDate?.message}
        />
      </form>
    </ModalCustom>
  );
};

export default RegisterPos;
