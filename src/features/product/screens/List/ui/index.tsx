/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading } from '@/components';
import { Container } from 'reactstrap';
import { RegisterContent } from '@/features/product/components/RegisterContent';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnImage, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import Product from '@/model/ProductConfig';
import { NameFiles, ProductRequestParams } from '@/features/product/types';
import { FilterContent } from '@/features/product/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import ProductGroup from '@/model/ProductGroup';
import ProductSubgroup from '@/model/ProductSubgroup';
import { ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { colors } from '@/styles/colors';
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRow {
  id: string;
  image: string;
  productName: string;
  group: string;
  subgroup: number;
  actions: string;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  product = 'product',
}

interface ProductContainerProps {
  state: States;
  productState?: Product;
  listProduct: Product[];
  currentPage: ProductRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataProduct: FormData;
  formErrorsProduct: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  clearFilter: () => void;
  handleFecthProductSubGroupList: (id: string) => void;
  onSaveProduct: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputProduct: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  onShowDeleteProduct: (product: Product) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    product,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    product?: Product;
  }) => void;
  nameFiles: NameFiles;
  listProductGroup: ProductGroup[];
  listProductSubGroup: ProductSubgroup[];
}

export const ProductContainer: React.FC<ProductContainerProps> = ({
  listProduct,
  state,
  productState,
  currentPage,
  title,
  visible,
  shouldShowModal,
  formDataProduct,
  formErrorsProduct,
  formDataFilter,
  formErrorsFilter,
  listProductGroup,
  listProductSubGroup,
  nameFiles,
  clearFilter,
  handleFecthProductSubGroupList,
  onChangeFormInputFilter,
  onChangeFormInputProduct,
  onSaveProduct,
  onPaginationChange,
  onToggle,
  onFilter,
  onShouldShowModal,
  onShowDeleteProduct,
  onChangeFileInput,
}) => {
  const dataTableProduct = listProduct?.map(item => ({
    id: item.id,
    image: (
      <ColumnImage
        srcImage={
          item.imageBase64
            ? item.imageBase64
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABTCAYAAACLQbk4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOhSURBVHgB7d1dT9pQHMfx01PLLKmCQEmJknCxbEuWaIzxgsQlS3zrJrtzV2oyL4iJAS8UGcEiFGHnmB2DhAdh7elv9f+5EKVo9Hw5feDBGmy6tVwu51mWlRWfO4ZhrDMSOWPyilKpVBgMBl9M01xjRKtXMVzX/Sgi7DASi5d7v+d5FXFBIWLE5QcxIzxxUWEkVs8xOOcVRmLH5aygvSUMYlLwAiMQ5GrKYQQCp1UUDs4IDIoBhGIAoRhAKAYQigGEYgChGEAoBhCKAYRiAKEYQCgGEIoBhGIAoRhAKAYQigEE/iWc6XR6bW9v7/PW1tYO59zq9/u/b29vr09PT2ssYUzHcSoMVC6Xs6vV6jfxO7riuXpTXmea5vrGxkaxXC7na7XaNUsQ6NXU7u7uV8uy7GnLbNvOHxwcfGIJAhtDDLYlZoQ37zaFQqHMEgQ2RrFY3Fx0m1mzZlypVNo8Pj6uym0PAwcbo91udxfdptfrtectlyH29/ercpV2dHQEHwQ2xv39vd/tdu/m3ebh4WFmDBVC7oHJr1OpVAY9CPQG/Pz8/Gw4HAbTlgVB0L24uPg1bdlkCAU9CPSubafT6YljiobrunmxffigrhersJufgpw9k98zK4Qid423t7fdRqNRF0GHDIjhed539h+Qe1fZbNZutVpi7dWdOlsWhRgnDx5PTk5++L4/YCCgZ8a4wWAwlDNFXk5bvkwICXGGQGwz5EAeHh6ufAC3bAgFbRsS+8xQAykf4shkMqxer9+t8v3LhlCQZkisMSYHUvwu+WWC/GsIBSVIbDFmDeRbg4QVQkEIEkuMRQO5KEjYIZS4g2iP8daBnBUkqhBKnEG0xlh2ICeDRB1CiSuIthirDqQKMhqNAh0hlDiCaDkCD+MeLR+j0hVinM4j9chnRlirFvW0q246Z0ikR+C61vFR03WkHlmMpIRQdASJJEbSQihRBwk9RlJDKFEGCTVG0kMoUQUJ9YeJPbP01dXVGXsnxDOQGfH3LvUo8zyhxri8vLxhZGX0wmcgFAMIxQBCMYBQDCAUAwjFAEIxgFAMIBQDCMUAQjGAUAwgFAMIxQBCMYBQDCAUAwgfjUaPjECQM6PDCAQeBEGLEQi82WzePD09wbwX+j2Tr+wemqbpp1KpIiOxen6Zfb/f923bXuOcL/y3QiQ6L+958H2/6TjPp+zLMhKLV29A6XQ6LTFDHg3DkCdkp/OBa2bMWiDP+fr3VKMOnVhRjz9v7Ub81CuWZAAAAABJRU5ErkJggg=='
        }
      />
    ),
    productName: item.name,
    group: item.categorySubGroup?.categoryGroup?.name || '',
    subgroup: item.categorySubGroup?.name || '',

    actions: (
      <React.Fragment>
        <Pen
          className="mr-4 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.product,
              newTitleModal: `Editar ${item.name}`,
              product: item,
            })
          }
        />
        <Trash
          className="mr-2 svg-icon action-icon svg-icon-trash"
          onClick={() => {
            onShowDeleteProduct(item);
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
  const renderActionDialogToCancelFilter: ActionProps = {
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
            [ShouldShowModal.filter]: renderActionDialogToCancelFilter,
            [ShouldShowModal.product]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Filtrar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.product]: {
              title: productState?.id ? 'Salvar' : 'Cadastrar novo produto',
              onClick: (): Promise<void> => onSaveProduct(),
              disabled: formDataProduct.name === '',
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
            [ShouldShowModal.product]: (
              <RegisterContent
                formData={formDataProduct}
                formErrors={formErrorsProduct}
                onChangeFormInput={onChangeFormInputProduct}
                onChangeFileInput={onChangeFileInput}
                nameFiles={nameFiles}
                listProduct={listProduct}
                listProductGroup={listProductGroup}
                listProductSubGroup={listProductSubGroup}
                handleFecthProductSubGroupList={handleFecthProductSubGroupList}
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
            <h5 className="ml-3 mb-0 mt-2 pageTitle">Produtos</h5>
          </div>

          <div className="button-filter-container">
            <Button
              title="+ Cadastrar novo produto"
              onClick={(): void =>
                onShouldShowModal({
                  value: ShouldShowModal.product,
                  newTitleModal: 'Cadastrar novo produto',
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
          data={dataTableProduct}
          numberRowsPerPage={currentPage.pageSize}
          progressPending={state === States.loading}
          theme="primaryWithMargin"
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
