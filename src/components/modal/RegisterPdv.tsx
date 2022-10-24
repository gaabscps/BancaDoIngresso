import React, { useEffect, useState } from 'react';
// import type { PdvDataType } from '../../store/ducks/pdv/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Pdv from '@/model/Pdv';
import { statesUf } from '../../constant/states';
import Select from '../Utils/Select';
import Input from '../Utils/Input';
// import ButtonGroupCustom from '../Utils/ButtonGroup';
import { ModalCustom } from '../Utils/Modal';
import InputFile from '../Utils/InputFile';
import { getRequest } from '../../store/ducks/pdv/actions';
import { ApplicationState } from '../../store';
import { PdvState } from '../../store/ducks/pdv/types';
import api from '../../services/api';

interface ModalPdvProps {
  show: boolean;
  setShow(value: boolean): void;
  pdvid?: string;
  reload: () => Promise<void>;
}
interface DispatchProps {
  saveRequest: (data: Pdv) => void;
}

type Props = ModalPdvProps & DispatchProps;

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   document: yup.string().required(),
//   telephone: yup.string().required(),
//   email: yup.string().required(),
//   address: yup.object().shape({
//     zipCode: yup.string().required(),
//     district: yup.string().required(),
//     street: yup.string().required(),
//     number: yup.string().required(),
//     state: yup.string().required(),
//     city: yup.string().required(),
//   }),
//   // imageBase64: yup.string().required(),
//   // facebookUrl: yup.string().required(),
//   // twitterUrl: yup.string().required(),
//   // linkedinUrl: yup.string().required(),
//   // complement: yup.string().required(),
//   // longitude: yup.number().required(),
//   // latitude: yup.number().required(),
// });

const RegisterPdv = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const pdvStorage = useSelector<ApplicationState, PdvState>(store => store.pdv);
  const [textModal, setTextModal] = useState({
    title: '',
    btnLabel: '',
  });

  const [formPdv, setFormPdv] = useState({} as Pdv);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    // watch,
    reset,
  } = useForm<Pdv>({
    // resolver: yupResolver(schema),
  });
  // const createPdv = async (data: PdvSave): Promise<void> => {
  //   await dispatch(createRequest(data));
  // };

  // const updatePdv = async (data: PdvSave): Promise<void> => {
  //   await dispatch(updateRequest(data));
  //   handlePaginationChange(pagination.page);
  // };

  const getPdv = async (id: string): Promise<void> => {
    try {
      const response: AxiosResponse<Pdv> = await api.get(`/pdv/${id}`);
      const entity = response.data;
      reset(entity);
    } catch (err) {
      const error = err as AxiosError;
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (props.show) {
      if (props.pdvid) {
        getPdv(props.pdvid);
        setTextModal({
          title: 'Editar PDV',
          btnLabel: 'Editar',
        });
        dispatch(getRequest(props.pdvid));
      } else {
        reset({});
        setTextModal({
          title: 'Cadastrar PDV',
          btnLabel: 'Cadastrar',
        });
      }
    }
  }, [props.pdvid]);

  useEffect(() => {
    setFormPdv(pdvStorage.data.entity);
  }, [pdvStorage]);

  useEffect(() => {
    if (props.show) {
      reset();
    } else {
      reset(formPdv);
    }
  }, [props.show]);

  // const fileToBase64 = (file: File): Promise<string> =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = error => reject(error);
  //   });

  const onSubmit = async (data: Pdv): Promise<void> => {
    //   try {
    //     const dataFetch = { ...data };

    //     if (_id) updatePdv(dataFetch);
    //     else createPdv(dataFetch);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    try {
      // if (idPos) props.saveRequest({ ...data, id: idPos });
      // else await props.saveRequest(data);
      await props.saveRequest(data);
      await props.reload();
      props.setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <ModalCustom
      setShow={props.setShow}
      show={props.show}
      title={textModal.title}
      isCard
      onBtnAction={handleSubmit(onSubmit)}
      btnLabel={textModal.btnLabel}
    >
      {pdvStorage.data.entity && (
        <form>
          <Input
            label="Nome do PDV"
            type="text"
            placeholder="Digite o nome do PDV"
            register={register}
            name="name"
            error={errors?.name?.message}
          />
          <Input
            label="CEP"
            type="text"
            placeholder="Digite o endereço do PDV. Ex: Rua 123 da Silva"
            register={register}
            name="address.zipCode"
            error={errors?.address?.zipCode?.message}
          />
          <Select
            label="Estado"
            options={statesUf}
            name="address.state"
            placeholder="Ex: SP"
            control={control}
            error={errors?.address?.state?.message}
          />
          <Select
            label="Cidade"
            options={[
              { value: '1', label: 'DF' },
              { value: '2', label: 'SP' },
              { value: '3', label: 'RG' },
              { value: '4', label: 'MG' },
            ]}
            name="address.city"
            placeholder="Selecione ou digite a cidade"
            control={control}
            error={errors?.address?.city?.message}
          />
          <Input
            label="Distrito"
            type="text"
            placeholder=""
            register={register}
            name="address.district"
            error={errors?.address?.district?.message}
          />
          <Input
            label="Rua"
            type="text"
            placeholder=""
            register={register}
            name="address.street"
            error={errors?.address?.street?.message}
          />
          <Input
            label="Número"
            type="text"
            placeholder=""
            register={register}
            name="address.number"
            error={errors?.address?.number?.message}
          />
          <Input
            label="Complemento"
            type="text"
            placeholder=""
            register={register}
            name="address.complement"
            error={errors?.address?.complement?.message}
          />

          <Input
            label="CPF/CNPJ"
            type="text"
            placeholder="Digite o CPF ou CNPJ do PDV"
            register={register}
            name="document"
            error={errors?.document?.message}
          />
          <Input
            label="E-mail"
            type="text"
            placeholder=""
            register={register}
            name="email"
            error={errors?.document?.message}
          />
          <Input
            label="Telefone celular"
            type="text"
            placeholder="(00) 0 0000-0000"
            register={register}
            name="telephone"
            error={errors?.telephone?.message}
          />
          <Input
            label="Instagram do PDV (opcional)"
            type="text"
            placeholder=""
            register={register}
            name="instagramUrl"
            error={errors?.instagramUrl?.message}
          />
          <Input
            label="Facebook do PDV (opcional)"
            type="text"
            placeholder=""
            register={register}
            name="facebookUrl"
            error={errors?.facebookUrl?.message}
          />
          <Input
            label="Twitter do PDV (opcional)"
            type="text"
            placeholder=""
            register={register}
            name="twitterUrl"
            error={errors?.instagramUrl?.message}
          />
          <Input
            label="Linkedin do PDV (opcional)"
            type="text"
            placeholder=""
            register={register}
            name="linkedinUrl"
            error={errors?.linkedinUrl?.message}
          />
          <InputFile
            label="Imagem"
            register={register}
            name="imageBase64"
            // fileName={watch('imageBase64') && watch('imageBase64')[0]}
            accept="image/png, image/jpeg"
            //   error={errors?.name?.message}
          />
        </form>
      )}
    </ModalCustom>
  );
};
export default RegisterPdv;
