/* eslint-disable import/no-unresolved */
import React, { Fragment, useEffect, useRef } from 'react';
import { ButtonGroup, InputFile, InputText, SelectCustom } from '@/components';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import { ReactComponent as Info } from '@/assets/images/svg/infoTooltip.svg';
import { SelectCreateable } from '@/components/SelectCreateable';
import { SectorProductContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  group = 'group',
  subgroup = 'subgroup',
  id = 'id',
  name = 'name',
  allowOnline = 'allowOnline',
  unitMeasurement = 'unitMeasurement',
  amount = 'amount',
  unitValue = 'unitValue',
  totalValue = 'totalValue',
  imageBase64Product = 'imageBase64Product',
}

export const ProductRegisterContent: React.FC<
  Pick<SectorProductContainerProps, 'formProduct' | 'productStates' | 'productActions'>
> = ({ formProduct, productStates, productActions }) => {
  const { formData, formErrors, onChangeFormInput, onChangeFormFileInput, formNameFiles } =
    formProduct;

  const refSelectSubGroup = useRef<any>(null);
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
    if (formData[FormInputName.subgroup]) {
      productActions.onProductByCategory(
        formData[FormInputName.group],
        formData[FormInputName.subgroup],
      );
    }
  }, [formData[FormInputName.subgroup]]);

  const subGruopOptions =
    productStates.groupList
      ?.find(group => group?.id === formData[FormInputName.group])
      ?.subGroups?.map((subGroup: { id: string; name: string }) => ({
        value: subGroup.id,
        label: subGroup.name,
      })) ?? [];

  return (
    <Fragment>
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
            value={formData[FormInputName.group]}
            onChange={e => {
              onChangeFormInput(FormInputName.group)(e?.value as string);
              onClearSelectSubGroup();
              onClearSelectProduct();
            }}
            error={formErrors.group && formErrors.group[0]}
            options={productStates.groupList.map(group => ({
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
            value={formData[FormInputName.subgroup]}
            onChange={e => {
              onChangeFormInput(FormInputName.subgroup)(e?.value as string);
              onClearSelectProduct();

              if (e?.value !== undefined) {
                productActions.onProductByCategory(
                  formData[FormInputName.group],
                  e?.value as unknown as string,
                );
              }
            }}
            error={formErrors.subgroup && formErrors.subgroup[0]}
            options={subGruopOptions}
            disabled={formData[FormInputName.group] === ''}
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
                onChangeFormInput(FormInputName.id)(e?.value as string);
                onChangeFormInput(FormInputName.name)(product.name as string);
              } else {
                onChangeFormInput(FormInputName.id)('' as string);
                onChangeFormInput(FormInputName.name)(e?.value as string);
              }
            }}
            value={formData[FormInputName.id]}
            options={productStates.optionProduct.map(item => ({
              value: item.id,
              label: item.name,
            }))}
            error={formErrors.name && formErrors.name[0]}
            disabled={formData[FormInputName.subgroup] === ''}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Vender online?"
            name="allowOnline"
            value={formData[FormInputName.allowOnline]}
            onChange={e => {
              onChangeFormInput(FormInputName.allowOnline)(e.target.value);
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
              value={formData[FormInputName.unitMeasurement]}
              onChange={e => {
                onChangeFormInput(FormInputName.unitMeasurement)(e.target.value);
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

            <ReactTooltip id="soclose" effect="solid" place={'right'} border={true} type={'light'}>
              Quando o valor for definido no momento da venda.
            </ReactTooltip>
          </div>
        </FormGroup>
        <Row>
          <Col md={6} className="pl-0">
            <FormGroup className="mb-2">
              <InputText
                name="amount"
                label="Quantidade"
                placeholder="Ex: 200"
                value={formData[FormInputName.amount]}
                onChange={e => {
                  onChangeFormInput(FormInputName.amount)(e.target.value.replace(/\D/g, ''));
                  onChangeFormInput(FormInputName.totalValue)(
                    String((+e.target.value * +formData[FormInputName.unitValue]).toFixed(2)),
                  );
                }}
                error={formErrors.amount && formErrors.amount[0]}
              />
            </FormGroup>
          </Col>
          <Col md={6} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                name="unitValue"
                label="Valor unitário"
                placeholder="Ex: 20,00"
                addon="R$"
                value={formData[FormInputName.unitValue]}
                onChange={e => {
                  const unitValueDecimal = e.target.value
                    .replace(/\D/g, '')
                    .replace(/(\d{2})$/, '.$1');
                  onChangeFormInput(FormInputName.unitValue)(unitValueDecimal);
                  onChangeFormInput(FormInputName.totalValue)(
                    String((+unitValueDecimal * +formData[FormInputName.amount]).toFixed(2)),
                  );
                }}
                error={formErrors.unitValue && formErrors.unitValue[0]}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="mb-2">
          <InputText
            name="totalValue"
            label="Valor total"
            placeholder="Ex: 200,00"
            addon="R$"
            value={formData[FormInputName.totalValue]}
            onChange={() => undefined}
            error={formErrors.totalValue && formErrors.totalValue[0]}
            disabled
          />
        </FormGroup>
        <FormGroup className="mb-2">
          {formData[FormInputName.id] === '' ? (
            <InputFile
              name="imageBase64Product"
              label="Imagem do produto (opcional)"
              placeholder=""
              fileName={formNameFiles?.imageBase64Product}
              onChange={e => {
                onChangeFormFileInput(FormInputName.imageBase64Product)(
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
    </Fragment>
  );
};
