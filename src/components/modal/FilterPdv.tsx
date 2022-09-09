import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CloseModal from '../../assets/images/svg/CloseModal';
import Button from '../Utils/Button';
import Select from '../Utils/Select';
import RadioCustom from '../Utils/Radio';
import { ApplicationState } from '../../store';
import { listRequest } from '../../store/ducks/pdv/actions';
import Page from '../../entities/Page';
import { PdvState } from '../../store/ducks/pdv/types';

interface FilterCustomProps {
  show: boolean;
  setShowFilter(value: boolean): void;
}

const schema = yup.object().shape({});

const Filter = (props: FilterCustomProps): JSX.Element => {
  const handleClose = (): void => props.setShowFilter(false);

  const dispatch = useDispatch();

  const pdvStorage = useSelector<ApplicationState, PdvState>(store => store.pdv);
  console.log('pdvStorage', pdvStorage);

  const optionName =
    pdvStorage.data?.page?.list?.map(item => ({
      label: item.name,
      value: item.name,
    })) ?? [];

  const optionCity =
    pdvStorage.data?.page?.list?.map(item => ({
      label: item.address.city,
      value: item.address.city,
    })) ?? [];

  const {
    register,
    handleSubmit,
    // formState: {},
    control,
    watch,
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any): Promise<void> => {
    const { filterSearch, SelectSearch } = data;

    try {
      const datafetch = {
        page: 0,
        pageSize: 0,
        entity: {
          [filterSearch]: SelectSearch,
        },
      };
      dispatch(listRequest(datafetch as Page<any, any>));
      props.setShowFilter(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      fade={false}
      modalClassName="flex-modal-right"
      className="filter-modal"
      isOpen={props.show}
      toggle={() => props.setShowFilter(false)}
      aria-labelledby="example-custom-modal-styling-title"
    >
      <div
        className="filter-close-buttom"
        onClick={() => {
          handleClose();
        }}
      >
        <CloseModal />
      </div>
      <ModalBody className="filter-modal-body">
        <div className="filter-modal-content ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="filter-name">Filtrar por:</span>
            <RadioCustom
              options={[
                { label: 'Nome', value: 'name' },
                { label: 'Cidade', value: 'city' },
              ]}
              style={{ fontSize: '21px' }}
              register={register}
              name="filterSearch"
              //   error={errors?.abcd?.message}
            />
            {watch('filterSearch') && (
              <Select
                label={watch('filterSearch') === 'name' ? 'Nome' : 'Cidade'}
                options={watch('filterSearch') === 'name' ? optionName : optionCity}
                name="SelectSearch"
                placeholder={
                  watch('filterSearch') === 'name'
                    ? 'Selecione o nome do PDV'
                    : 'Selecione a Cidade'
                }
                control={control}
                //   error={errors?.address?.state?.value?.message}
              />
            )}
            <div className="filter-button exclude-button">
              <Button
                size="md"
                theme="noneBorder"
                style={{ height: '50px', marginRight: '20px' }}
                onClick={() => handleClose()}
              >
                Cancelar
              </Button>
              <Button
                size="md"
                style={{
                  width: '152px',
                  height: '40px',
                  display: 'flex',
                  // ajustes para o botão se possível
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="botao-cadastro"
              >
                Aplicar
              </Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Filter;
