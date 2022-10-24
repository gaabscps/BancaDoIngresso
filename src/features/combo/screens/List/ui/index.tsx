/* eslint-disable react/jsx-key */
import React, { ChangeEvent, Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading, DropdonwFlags } from '@/components';
import { Container } from 'reactstrap';
import { ProductQuantity, RegisterContent } from '@/features/combo/components/RegisterContent';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnImage, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import Combo from '@/model/ComboConfig';
import { NameFiles, ComboRequestParams } from '@/features/combo/types';
import { FilterContent } from '@/features/combo/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import { ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { colors } from '@/styles/colors';
import ComboGroup from '@/model/ComboGroup';
import ComboSubgroup from '@/model/ComboSubgroup';
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRow {
  id: string;
  image: string;
  comboName: string;
  comboProducts: string;
  gruposubgroup: number;
  actions: string;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  combo = 'combo',
}

interface ComboContainerProps {
  state: States;
  comboState?: Combo;
  listCombo: Combo[];
  currentPage: ComboRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataCombo: FormData;
  formErrorsCombo: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  clearFilter: () => void;
  handleFecthComboSubGroupList(id: string): void;
  onSaveCombo: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputCombo: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  onShowDeleteCombo: (combo: Combo) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    combo,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    combo?: Combo;
  }) => void;
  nameFiles: NameFiles;
  listComboGroup: ComboGroup[];
  listComboSubGroup: ComboSubgroup[];
  controllerInputAppendProduct: {
    handleAddProduct(): void;
    handleChangeProduct(
      inputName: string,
      index: number,
      event: ChangeEvent<HTMLInputElement>,
    ): void;
    handleRemoveProduct(index: number): void;
    productQuantity: ProductQuantity[];
    setProductQuantity: React.Dispatch<React.SetStateAction<ProductQuantity[]>>;
  };
}

export const ComboContainer: React.FC<ComboContainerProps> = ({
  listCombo,
  state,
  comboState,
  currentPage,
  title,
  visible,
  shouldShowModal,
  formDataCombo,
  formErrorsCombo,
  formDataFilter,
  formErrorsFilter,
  listComboGroup,
  listComboSubGroup,
  controllerInputAppendProduct,
  nameFiles,
  clearFilter,
  handleFecthComboSubGroupList,
  onChangeFormInputFilter,
  onChangeFormInputCombo,
  onSaveCombo,
  onPaginationChange,
  onToggle,
  onFilter,
  onShouldShowModal,
  onShowDeleteCombo,
  onChangeFileInput,
}) => {
  const dataColumnComboProducts = [
    { id: '1', name: 'Exclusão de eventos' },
    { id: '2', name: 'Edição de PDV’s' },
    { id: '4', name: 'Exclusão de PDV’s' },
    { id: '5', name: 'Edição de produtos' },
    { id: '6', name: 'Exclusão de produtos' },
  ];

  const dataTableCombo = listCombo?.map(item => ({
    id: item.id,
    image: <ColumnImage srcImage={item.imageBase64} />,
    comboName: item.name,
    comboProducts: <DropdonwFlags pointerClass={true} dataColumn={dataColumnComboProducts} />,
    gruposubgroup: `${item.categorySubGroup.categoryGroup.name} / ${item.categorySubGroup.name}`,

    actions: (
      <React.Fragment>
        <Pen
          className="mr-2 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.combo,
              newTitleModal: `Editar ${item.name}`,
              combo: item,
            })
          }
        />
        <Trash
          className="mr-2 svg-icon action-icon"
          onClick={() => {
            onShowDeleteCombo(item);
          }}
        />
      </React.Fragment>
    ),
  }));

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };
  const renderActionDialogToFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): void => clearFilter(),
    theme: 'noneBorder',
  };

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        position={shouldShowModal === ShouldShowModal.filter ? 'right' : 'center'}
        isContentWithCard={shouldShowModal !== ShouldShowModal.filter}
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToFilter,
            [ShouldShowModal.combo]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Filtrar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.combo]: {
              title: comboState?.id ? 'Salvar' : 'Cadastrar novo combo',
              onClick: (): Promise<void> => onSaveCombo(),
              disabled: formDataCombo.name === '',
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.filter]: (
              <FilterContent
                formData={formDataFilter}
                formErrors={formErrorsFilter}
                onChangeFormInput={onChangeFormInputFilter}
              />
            ),
            [ShouldShowModal.combo]: (
              <RegisterContent
                formData={formDataCombo}
                formErrors={formErrorsCombo}
                onChangeFormInput={onChangeFormInputCombo}
                onChangeFileInput={onChangeFileInput}
                nameFiles={nameFiles}
                listCombo={listCombo}
                listComboGroup={listComboGroup}
                listComboSubGroup={listComboSubGroup}
                controllerInputAppendProduct={controllerInputAppendProduct}
                handleFecthComboSubGroupList={handleFecthComboSubGroupList}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle d-flex">
            <Link to={`${process.env.PUBLIC_URL}/dashboard/productscombos`}>
              <ArrowLeft color={colors.black} className="arrow-left" />
            </Link>
            <h5 className="ml-3 mb-0 mt-1 pageTitle">Combos</h5>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar novo combo"
              onClick={(): void =>
                onShouldShowModal({
                  value: ShouldShowModal.combo,
                  newTitleModal: 'Cadastrar novo combo',
                })
              }
            />
            <div className="filter-container">
              <div
                className="filter-content"
                onClick={(): void =>
                  onShouldShowModal({
                    value: ShouldShowModal.filter,
                    newTitleModal: '',
                  })
                }
              >
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={dataTableCombo}
          numberRowsPerPage={currentPage.pageSize}
          progressPending={state === States.loading}
          theme="primary"
        />
        <Pagination
          currentPage={currentPage.page}
          totalCount={currentPage.total}
          pageSize={currentPage.pageSize}
          onPageChange={page => onPaginationChange(page)}
          total={currentPage.total}
        />
      </Container>
    </Fragment>
  );
};
