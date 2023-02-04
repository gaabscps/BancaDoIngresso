/* eslint-disable import/no-unresolved */
import React, { Fragment, useEffect, useRef } from 'react';
import { ButtonGroup, InputFile, InputText, SelectCustom, TooltipCustom } from '@/components';
import { updateMask as updateMaskCash, unmask as unmaskCash } from '@/helpers/masks/cashNumber';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { ReactComponent as Info } from '@/assets/images/svg/infoTooltip.svg';
import { SelectCreateable } from '@/components/SelectCreateable';
import { SectorProductContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputNameProduct {
  group = 'group',
  subgroup = 'subgroup',
  id = 'id',
  name = 'name',
  allowSellingWebsite = 'allowOnline',
  unitMeasurement = 'unitMeasurement',
  amount = 'amount',
  unitValue = 'unitValue',
  totalValue = 'totalValue',
  imageBase64Product = 'imageBase64Product',
}

export const ProductRegisterContent: React.FC<
  Pick<
    SectorProductContainerProps,
    'formProduct' | 'productStates' | 'productActions' | 'controllerEvent'
  >
> = ({ formProduct, productStates, productActions, controllerEvent }) => {
  const { formData, formErrors, onChangeFormInput, onChangeFormFileInput, formNameFiles } =
    formProduct;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refSelectSubGroup = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refSelectProduct = useRef<any>(null);

  const onClearSelectSubGroup = (): void => {
    if (refSelectSubGroup) {
      refSelectSubGroup?.current.clearValue();
    }
  };

  const onClearSelectProduct = (): void => {
    if (refSelectProduct) {
      refSelectProduct?.current.clearValue();
    }
  };

  useEffect(() => {
    if (formData[FormInputNameProduct.subgroup]) {
      productActions.onProductByCategory(
        formData[FormInputNameProduct.group],
        formData[FormInputNameProduct.subgroup],
      );
    }
  }, [formData[FormInputNameProduct.subgroup]]);

  const subGruopOptions =
    controllerEvent.groupOptions
      ?.find((group: any) => group?.id === formData[FormInputNameProduct.group])
      ?.subGroups?.map((subGroup: { id: string; name: string }) => ({
        value: subGroup.id,
        label: subGroup.name,
      })) ?? [];

  return (
    <Row>
      <Col>
        <Form
          noValidate={true}
          onSubmit={(e): void => {
            e.preventDefault();
          }}
        >
          <FormGroup className="mb-2">
            <SelectCustom
              name="group"
              label="Grupo do produto"
              placeholder="Digite ou selecione o grupo do produto"
              value={formData[FormInputNameProduct.group]}
              onChange={e => {
                onChangeFormInput(FormInputNameProduct.group)(e?.value as string);
                onClearSelectSubGroup();
                onClearSelectProduct();
              }}
              error={formErrors.group && formErrors.group[0]}
              options={controllerEvent.groupOptions.map((group: any) => ({
                value: group.id,
                label: group.name,
              }))}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <SelectCustom
              refSelect={refSelectSubGroup}
              name="subgroup"
              label="Subgrupo do produto"
              placeholder="Digite ou selecione o subgrupo do produto"
              value={formData[FormInputNameProduct.subgroup]}
              onChange={e => {
                onChangeFormInput(FormInputNameProduct.subgroup)(e?.value as string);
                onClearSelectProduct();

                if (e?.value !== undefined) {
                  productActions.onProductByCategory(
                    formData[FormInputNameProduct.group],
                    e?.value as unknown as string,
                  );
                }
              }}
              error={formErrors.subgroup && formErrors.subgroup[0]}
              options={subGruopOptions}
              disabled={formData[FormInputNameProduct.group] === ''}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <SelectCreateable
              refSelect={refSelectProduct}
              label="Nome do produto"
              placeholder="Digite ou selecione nome do produto"
              name="name"
              onChange={e => {
                const product = productStates.optionProduct.find(item => item.id === e?.value);
                if (product) {
                  onChangeFormInput(FormInputNameProduct.id)(e?.value as string);
                  onChangeFormInput(FormInputNameProduct.name)(product.name as string);
                } else {
                  onChangeFormInput(FormInputNameProduct.id)('' as string);
                  onChangeFormInput(FormInputNameProduct.name)(e?.value as string);
                }
              }}
              value={formData[FormInputNameProduct.id]}
              options={productStates.optionProduct.map(item => ({
                value: item.id,
                label: item.name,
              }))}
              error={formErrors.name && formErrors.name[0]}
              disabled={formData[FormInputNameProduct.subgroup] === '' || productStates.product}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <ButtonGroup
              label="Vender online?"
              name="allowSellingWebsite"
              value={formData[FormInputNameProduct.allowSellingWebsite]}
              onChange={e => {
                onChangeFormInput(FormInputNameProduct.allowSellingWebsite)(e.target.value);
              }}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={formErrors.allowOnline && formErrors.allowOnline[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2 ">
            <div>
              <ButtonGroup
                label="Unidade de medida"
                name="unitMeasurement"
                value={formData[FormInputNameProduct.unitMeasurement]}
                onChange={e => {
                  onChangeFormInput(FormInputNameProduct.unitMeasurement)(e.target.value);
                }}
                options={[
                  { value: 'Unitário', label: 'Unitário' },
                  { value: 'Quilo', label: 'Quilo' },
                  {
                    value: 'Variável',
                    label: (
                      <>
                        Variável
                        <a data-for="soclose" data-tip="8" className="ml-3">
                          <Info />
                        </a>
                      </>
                    ),
                  },
                ]}
                error={formErrors.unitMeasurement && formErrors.unitMeasurement[0]}
              />
              <TooltipCustom id="soclose">
                Quando o valor for definido no momento da venda.
              </TooltipCustom>
            </div>
          </FormGroup>
          <Row>
            <Col md={6} className="pl-0">
              <FormGroup>
                <InputText
                  name="amount"
                  label="Quantidade"
                  placeholder="Ex: 200"
                  value={formData[FormInputNameProduct.amount]}
                  onChange={e => {
                    const amountValue = e.target.value.replace(/\D/g, '');
                    onChangeFormInput(FormInputNameProduct.amount)(amountValue);
                    onChangeFormInput(FormInputNameProduct.totalValue)(
                      String((+amountValue * +formData[FormInputNameProduct.unitValue]).toFixed(2)),
                    );
                  }}
                  error={formErrors.amount && formErrors.amount[0]}
                />
              </FormGroup>
            </Col>
            <Col md={6} className="pr-0">
              <FormGroup>
                <InputText
                  name="unitValue"
                  label="Valor unitário"
                  placeholder="Ex: 20,00"
                  addon="R$"
                  value={updateMaskCash(formData[FormInputNameProduct.unitValue])}
                  onChange={e => {
                    const unitValueMoney = updateMaskCash(e.target.value);
                    onChangeFormInput(FormInputNameProduct.unitValue)(unmaskCash(unitValueMoney));
                    onChangeFormInput(FormInputNameProduct.totalValue)(
                      String(
                        (
                          +unmaskCash(unitValueMoney) * +formData[FormInputNameProduct.amount]
                        ).toFixed(2),
                      ),
                    );
                  }}
                  error={formErrors.unitValue && formErrors.unitValue[0]}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <InputText
              name="totalValue"
              label="Valor total"
              placeholder="Ex: 200,00"
              addon="R$"
              value={updateMaskCash(formData[FormInputNameProduct.totalValue])}
              onChange={() => undefined}
              error={formErrors.totalValue && formErrors.totalValue[0]}
              disabled
            />
          </FormGroup>
          <FormGroup className="mb-2">
            {formData[FormInputNameProduct.id] === '' ? (
              <InputFile
                name="imageBase64Product"
                label="Imagem do produto (opcional)"
                placeholder=""
                fileName={formNameFiles?.imageBase64Product}
                onChange={e => {
                  onChangeFormFileInput(FormInputNameProduct.imageBase64Product)(
                    (e.target as HTMLInputElement)?.files?.[0],
                  );
                }}
                error={formErrors.imageBase64Product && formErrors.imageBase64Product[0]}
              />
            ) : (
              ''
            )}
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};
