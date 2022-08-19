/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import { Container } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container } from 'reactstrap';
import Input from '../components/Utils/Input';
import RadioCustom from '../components/Utils/Radio';
import ButtonGroupCustom from '../components/Utils/ButtonGroup';
import Select from '../components/Utils/Select';
import InputFile from '../components/Utils/InputFile';
import Button from '../components/Utils/Button';

import { ReactComponent as SvgExample } from '../assets/images/svg/SvgExample.svg';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
});

const ExampleForms = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };
  return (
    <Container>
      <div className="pt-5">
        <h3>Forms</h3>
        <label htmlFor="ExemploIcon">Exemplo ícones: </label>
        <br />
        <div className="mr-2">
          <SvgExample className="mr-2 svg-icon" />
          Hover
        </div>
        <div className="mr-2">
          <SvgExample className="mr-2 isvg-icon svg-icon--active" />
          Active
        </div>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Example Input"
            type="text"
            placeholder="Digite o seu nome"
            register={register}
            name="name"
            error={errors?.name?.message}
          />
          <RadioCustom
            options={[
              { value: '1', label: 'A' },
              { value: '2', label: 'B' },
              { value: '3', label: 'C' },
              { value: '4', label: 'D' },
            ]}
            label={'Radio Exemplo'}
            register={register}
            name="abcd"
            //   error={errors?.abcd?.message}
          />
          <Select
            label="Select Exemplo"
            options={[
              { value: '1', label: 'DF' },
              { value: '2', label: 'SP' },
              { value: '3', label: 'RG' },
              { value: '4', label: 'MG' },
            ]}
            name="address.state"
            placeholder="Ex: SP"
            control={control}
            //   error={errors?.address?.state?.value?.message}
          />
          <ButtonGroupCustom
            options={[
              { value: '1', label: 'Sim' },
              { value: '2', label: 'Não' },
            ]}
            label={'Radio Exemplo'}
            register={register}
            name="group"
            //   error={errors?.group?.message}
          />
          <InputFile
            label="Input File"
            register={register}
            name="teste"
            fileName={watch('teste') && watch('teste')[0]?.name}
            accept="image/png, image/jpeg"
            //   error={errors?.name?.message}
          />

          {/* BUTTONS */}
          <Button type="submit" theme="dark">
            Button Example
          </Button>
          <Button type="submit" theme="noneBorder">
            Button Example
          </Button>
          <Button type="submit" theme="outlineDark">
            Button Example
          </Button>
          <Button type="submit" theme="red">
            Button Example
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ExampleForms;
