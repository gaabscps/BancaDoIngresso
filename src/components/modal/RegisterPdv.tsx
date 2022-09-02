import React from 'react';
// import type { PdvDataType } from '../../store/ducks/pdv/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Select from '../Utils/Select';
import Input from '../Utils/Input';
import ButtonGroupCustom from '../Utils/ButtonGroup';

import { ModalCustom } from '../Utils/Modal';

interface ModalPdvProps {
  show: boolean;
  setShow(value: boolean): void;
}

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
});

const RegisterPdv = ({ show, setShow }: ModalPdvProps): JSX.Element => {
  // const handleClose = (): void => setShow(false);
  // <Modal
  //   size={'xl'}
  //   isOpen={props.show}
  //   toggle={() => props.setShowPdv(false)}
  //   dialogClassName="modal-550px"
  //   aria-labelledby="example-custom-modal-styling-title"
  // >
  //   <ModalHeader style={{ backgroundColor: '#F8F8F8' }}>
  //     <div className="subpdv-modal-header-container">
  //       <div className="header-title-text subpdv-name">Cadastrar novo PDV</div>

  //       <div
  //         className="modal-close-container"
  //         onClick={() => {
  //           handleClose();
  //         }}
  //         style={{ cursor: 'pointer' }}
  //       >
  //         <CloseModal />
  //       </div>
  //     </div>
  //   </ModalHeader>
  //   <ModalBody style={{ backgroundColor: '#F8F8F8' }}>
  //     <Container>
  //       <Card
  //         className="subpdv-main-container"
  //         style={{
  //           padding: '25px 30px',
  //           backgroundColor: '#F1F1F1',
  //           border: 'none',
  //           borderRadius: '5px',
  //         }}
  //       >
  //         {' '}
  //         <form>
  //           <div className="form-container">
  //             <div className="form-content first-content">
  //               <LargeInput
  //                 name="Nome do PDV"
  //                 placeholder="Digite o nome do PDV"
  //                 id="name"
  //                 size="large"
  //               />
  //             </div>
  //             <div className="form-content">
  //               <LargeInput
  //                 name="Endereço do PDV"
  //                 placeholder="Digite o endereço do PDV. Ex: Rua 123 da Silva"
  //                 id="address"
  //                 size="large"
  //               />
  //             </div>
  //             <div className="form-content two-fields-container">
  //               <SelectInput name="Estado" id="estado" option1="SP" option2="RJ" size="small" />
  //               <SelectInput
  //                 name="Cidade"
  //                 id="cidade"
  //                 option1="Campinas"
  //                 option2="São josé dos Campos"
  //                 size="medium"
  //               />
  //             </div>
  //             <div className="form-content two-fields-container">
  //               <LargeInput
  //                 name="CPF/CNPJ"
  //                 placeholder="Digite o CPF ou CNPJ do PDV"
  //                 id="cpf"
  //                 size="medium"
  //               />
  //             </div>
  //             <div className="form-content two-fields-container">
  //               <LargeInput
  //                 name="Telefone Celular"
  //                 placeholder="(00) 0 000-0000"
  //                 id="phone"
  //                 size="medium"
  //               />
  //             </div>
  //           </div>
  //         </form>
  //       </Card>
  //     </Container>
  //     <div className="nextPageButton">
  //       <div style={{ color: '#fff' }}>
  //         <Button
  //           theme="noneBorder"
  //           style={{ height: '50px', marginRight: '20px' }}
  //           onClick={() => handleClose()}
  //         >
  //           Cancelar
  //         </Button>
  //       </div>
  //       <Button className="botao-cadastro">Cadastrar novo SubPDV</Button>
  //     </div>
  //   </ModalBody>
  // </Modal>
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    // watch,
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // reset();
  };

  return (
    <ModalCustom
      setShow={setShow}
      show={show}
      title="Cadastrar novo PDV"
      isCard
      onBtnAction={() => {}}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome do Sub PDV"
          type="text"
          placeholder="Digite o nome do Sub PDV"
          register={register}
          name="name"
          error={errors?.name?.message}
        />
        <ButtonGroupCustom
          label={'Radio Exemplo'}
          options={[
            { value: '1', label: 'Sim' },
            { value: '2', label: 'Não' },
          ]}
          register={register}
          name="group"
          //   error={errors?.group?.message}
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
      </form>
    </ModalCustom>
  );
};
export default RegisterPdv;
