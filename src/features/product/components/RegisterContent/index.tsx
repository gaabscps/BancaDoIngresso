import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputFile, InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Product from '@/model/Product';
import { NameFiles } from '@/features/product/types';
import { listProductSubgroups } from '@/store/ducks/product-subgroup/sagas';
import ProductGroup from '@/model/ProductGroup';
import ProductSubgroup from '@/model/ProductSubgroup';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  listProduct: Product[];
  nameFiles: NameFiles;
  listProductGroup: ProductGroup[];
  listProductSubGroup: ProductSubgroup[];
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  groupProduct = 'groupProduct',
  subProupProduct = 'subProupProduct',
  name = 'name',
  imageBase64 = 'imageBase64',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
  onChangeFileInput,
  nameFiles,
  listProductGroup,
  listProductSubGroup,
}) => {
  const statusOptions = [
    { value: '0', label: 'Produto em estoque' },
    { value: '1', label: 'Produto em uso' },
    { value: '2', label: 'Produto reservada' },
    { value: '3', label: 'Produto inativa' },
  ];

  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
      }}
    >
      <Row>
        <Col md={8}>
          <FormGroup className="mb-2">
            <SelectCustom
              name="groupProduct"
              label="Grupo do produto"
              placeholder="Digite ou selecione o grupo do produto"
              onChange={e => onChangeFormInput(FormInputName.groupProduct)(e?.value as string)}
              error={formErrors.groupProduct && formErrors.groupProduct[0]}
              value={formData[FormInputName.groupProduct]}
              options={listProductGroup.map(item => ({ value: item.id, label: item.name }))}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <SelectCustom
              name="subProupProduct"
              label="Subgrupo do produto"
              placeholder="Digite ou selecione o subgrupo do produto"
              onChange={e => onChangeFormInput(FormInputName.subProupProduct)(e?.value as string)}
              error={formErrors.subProupProduct && formErrors.subProupProduct[0]}
              value={formData[FormInputName.subProupProduct]}
              options={listProductSubGroup.map(item => ({ value: item.id, label: item.name }))}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="name"
              label="Nome do Produto"
              placeholder="Digite o nome do produto"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
              error={formErrors.name && formErrors.name[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <FormGroup className="mb-2">
              <InputFile
                name="imageBase64"
                label="Imagem do PDV"
                placeholder=""
                fileName={nameFiles?.imageBase64}
                onChange={e =>
                  onChangeFileInput(FormInputName.imageBase64)(
                    (e.target as HTMLInputElement)?.files?.[0],
                  )
                }
                error={formErrors.imageBase64 && formErrors.imageBase64[0]}
              />
            </FormGroup>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};
