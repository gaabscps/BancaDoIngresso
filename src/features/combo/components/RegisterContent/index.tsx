import React, { ChangeEvent } from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { Button, InputFile, InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Combo from '@/model/Combo';
import { NameFiles } from '@/features/combo/types';
import { X } from 'react-feather';
import ComboGroup from '@/model/ComboGroup';
import ComboSubgroup from '@/model/ComboSubgroup';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  listCombo: Combo[];
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

// eslint-disable-next-line no-shadow
export enum FormInputName {
  groupCombo = 'groupCombo',
  subProupCombo = 'subProupCombo',
  name = 'name',
  imageBase64 = 'imageBase64',
  product = 'product',
  quantity = 'quantity',
}

export type ProductQuantity = {
  product: string;
  quantity: string;
};

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
  onChangeFileInput,
  nameFiles,
  listComboGroup,
  listComboSubGroup,
  controllerInputAppendProduct,
}) => (
  // const [productQuantity, setProductQuantity] = useState<ProductQuantity[]>([
  //   { product: '', quantity: '' },
  // ]);

  // const controllerInputAppendProduct = {
  //   handleAddProduct(): void {
  //     setProductQuantity([...productQuantity, { product: '', quantity: '' }]);
  //   },

  //   handleChangeProduct(
  //     inputName: string,
  //     index: number,
  //     event: ChangeEvent<HTMLInputElement>,
  //   ): void {
  //     const newFormValues = [...productQuantity] as any;
  //     newFormValues[index][inputName] = event.target.value;
  //     setProductQuantity(newFormValues);
  //   },
  //   handleRemoveProduct(index: number): void {
  //     const values = [...productQuantity];
  //     values.splice(index, 1);
  //     setProductQuantity(values);
  //   },
  // };

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
            onChange={e => onChangeFormInput(FormInputName.groupCombo)(e?.value as string)}
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
            onChange={e => onChangeFormInput(FormInputName.subProupCombo)(e?.value as string)}
            error={formErrors.subProupCombo && formErrors.subProupCombo[0]}
            value={formData[FormInputName.subProupCombo]}
            options={listComboSubGroup.map(item => ({ value: item.id, label: item.name }))}
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
              <InputText
                name={`product-${index}`}
                label="Produto"
                placeholder="Digite ou selecione o produto"
                value={item.product}
                onChange={e =>
                  controllerInputAppendProduct.handleChangeProduct(FormInputName.product, index, e)
                }
                error={formErrors.name && formErrors.name[0]}
              />
            </Col>
            <Col md={2}>
              <InputText
                name="quantity"
                label="Quantidade"
                placeholder="Ex: 100"
                value={item.quantity}
                onChange={e =>
                  controllerInputAppendProduct.handleChangeProduct(FormInputName.quantity, index, e)
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
