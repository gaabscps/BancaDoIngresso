import React, { useRef } from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { Button, InputFile, InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Combo from '@/model/Combo';
import { NameFiles } from '@/features/combo/types';
import { X } from 'react-feather';
import ComboGroup from '@/model/ComboGroup';
import ComboSubgroup from '@/model/ComboSubgroup';
import Product from '@/model/Product';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  listCombo: Combo[];
  nameFiles: NameFiles;
  listComboGroup: ComboGroup[];
  handleFecthComboSubGroupList(id: string): void;
  listComboSubGroup: ComboSubgroup[];
  onChangeFormInput: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  controllerInputAppendProduct: {
    handleAddProduct(): void;
    handleChangeProduct(inputName: string, index: number, value: string): void;
    handleRemoveProduct(index: number): void;
    productQuantity: ProductQuantity[];
    listProduct: Product[];
    setProductQuantity: React.Dispatch<React.SetStateAction<ProductQuantity[]>>;
  };
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  groupCombo = 'groupCombo',
  subGroupCombo = 'subGroupCombo',
  name = 'name',
  imageBase64 = 'imageBase64',
  productId = 'productId',
  productName = 'productName',
  quantity = 'quantity',
}

export type ProductQuantity = {
  productId: string;
  productName: string;
  quantity: string;
};

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
  onChangeFileInput,
  handleFecthComboSubGroupList,
  nameFiles,
  listComboGroup,
  listComboSubGroup,
  controllerInputAppendProduct,
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
              name="groupCombo"
              label="Grupo do combo"
              placeholder="Digite ou selecione o grupo do combo"
              onChange={e => {
                onChangeFormInput(FormInputName.groupCombo)(e?.value as string);
                handleFecthComboSubGroupList(e?.value as string);
                onClearSelectSubGroup();
              }}
              error={formErrors.groupCombo && formErrors.groupCombo[0]}
              value={formData[FormInputName.groupCombo]}
              options={listComboGroup.map(item => ({ value: item.id, label: item.name }))}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <SelectCustom
              name="subProupCombo"
              label="Subgrupo do combo"
              placeholder="Digite ou selecione o subgrupo do combo"
              onChange={e => onChangeFormInput(FormInputName.subGroupCombo)(e?.value as string)}
              error={formErrors.subGroupCombo && formErrors.subGroupCombo[0]}
              value={formData[FormInputName.subGroupCombo]}
              refSelect={refSelectSubGroup}
              options={listComboSubGroup.map(item => ({ value: item.id, label: item.name }))}
              disabled={formData[FormInputName.groupCombo] === ''}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="name"
              label="Nome do Combo"
              placeholder="Digite o nome do combo"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
              error={formErrors.name && formErrors.name[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputFile
              name="imageBase64"
              label="Imagem do combo (opcional)"
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
          <h5 className="mb-2 border-bottom-title mb-5">Produtos do combo</h5>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {controllerInputAppendProduct.productQuantity.map((item, index) => (
            <Row key={index}>
              <Col md={6} className="pl-0">
                <SelectCustom
                  name={`product-${index}`}
                  label="Produto"
                  placeholder="Digite ou selecione o produto"
                  onChange={e => {
                    controllerInputAppendProduct.handleChangeProduct(
                      FormInputName.productId,
                      index,
                      String(e?.value),
                    );
                    controllerInputAppendProduct.handleChangeProduct(
                      FormInputName.productName,
                      index,
                      String(e?.label),
                    );
                  }}
                  error={formErrors?.productName && formErrors.productName[0]}
                  value={item.productId}
                  options={controllerInputAppendProduct.listProduct.map(itemProduct => ({
                    label: itemProduct.name,
                    value: itemProduct.id,
                  }))}
                />
              </Col>
              <Col md={2}>
                <InputText
                  name="quantity"
                  label="Quantidade"
                  placeholder="Ex: 100"
                  value={item.quantity}
                  onChange={e =>
                    controllerInputAppendProduct.handleChangeProduct(
                      FormInputName.quantity,
                      index,
                      e.target.value.replace(/[^0-9]/g, ''),
                    )
                  }
                  error={formErrors.quantity && formErrors.quantity[0] && '*'}
                />
              </Col>
              <Col md={4} className="pr-0 m-auto pb-3">
                {index !== controllerInputAppendProduct.productQuantity.length - 1 ? (
                  <X
                    onClick={() => controllerInputAppendProduct.handleRemoveProduct(index)}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <Button
                    type="button"
                    theme="noneBorder"
                    className="pl-0"
                    onClick={controllerInputAppendProduct.handleAddProduct}
                    title="adicionar novo produto no combo"
                  />
                )}
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Form>
  );
};
