import React, { useRef } from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputFile, InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Product from '@/model/ProductConfig';
import { NameFiles } from '@/features/product/types';
import ProductGroup from '@/model/ProductGroup';
import ProductSubgroup from '@/model/ProductSubgroup';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  listProduct: Product[];
  nameFiles: NameFiles;
  listProductGroup: ProductGroup[];
  listProductSubGroup: ProductSubgroup[];
  productState?: Product;
  onChangeFormInput: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  handleFecthProductSubGroupList: (id: string) => void;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  groupProduct = 'groupProduct',
  subGroupProduct = 'subGroupProduct',
  name = 'name',
  imageBase64 = 'imageBase64',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  nameFiles,
  listProductGroup,
  listProductSubGroup,
  handleFecthProductSubGroupList,
  onChangeFormInput,
  onChangeFileInput,
}) => {
  const refSelectSubGroup = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onClearSelectSubGroup = () => {
    if (refSelectSubGroup) {
      refSelectSubGroup?.current.clearValue();
    }
  };

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
              onChange={e => {
                onChangeFormInput(FormInputName.groupProduct)(e?.value as string);
                handleFecthProductSubGroupList(e?.value as string);
                onClearSelectSubGroup();
              }}
              error={formErrors.groupProduct && formErrors.groupProduct[0]}
              value={formData[FormInputName.groupProduct]}
              options={listProductGroup.map(item => ({ value: item.id, label: item.name }))}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <SelectCustom
              name="subGroupProduct"
              label="Subgrupo do produto"
              placeholder="Digite ou selecione o subgrupo do produto"
              refSelect={refSelectSubGroup}
              onChange={e => onChangeFormInput(FormInputName.subGroupProduct)(e?.value as string)}
              error={formErrors.subGroupProduct && formErrors.subGroupProduct[0]}
              value={formData[FormInputName.subGroupProduct]}
              options={listProductSubGroup.map(item => ({ value: item.id, label: item.name }))}
              disabled={formData[FormInputName.groupProduct] === ''}
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
                label="Imagem do produto (opcional)"
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
