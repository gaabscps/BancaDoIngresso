import { ButtonGroup, InputText } from '@/components';
import React from 'react';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { FormDiscountCouponProps } from '../../types';

interface RegisterContentProps {
  formDiscountCoupon: FormDiscountCouponProps;
}

export const RegisterDiscountCoupon: React.FC<RegisterContentProps> = ({ formDiscountCoupon }) => {
  const {
    discountCoupon,
    handleChangeDiscountCoupon,
    handleRemoveDiscountCoupon,
    handleAddDiscountCoupon,
  } = formDiscountCoupon;
  return (
    <>
      <Form
        style={{ backgroundColor: '#f1f1f1' }}
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        {discountCoupon.map((item, index) => (
          <>
            <div className="card-ligth-color mb-5" key={index}>
              <Row>
                <Col md={7}>
                  <FormGroup className="mb-2">
                    <InputText
                      name="name"
                      label="Nome do cupom"
                      placeholder="Digite o nome do cupom. Ex: Dia das Mães"
                      value={item.name}
                      onChange={e => handleChangeDiscountCoupon('name', index, e?.target.value)}
                      error={undefined}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="mb-2">
                    <InputText
                      name="code"
                      label="Código do cupom"
                      placeholder="Digite o código do cupom. Ex: MAE20"
                      value={item.code}
                      onChange={e => handleChangeDiscountCoupon('code', index, e?.target.value)}
                      error={undefined}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormGroup className="mb-2">
                    <InputText
                      name="amount"
                      type="number"
                      label="Quant. cupons"
                      placeholder="0"
                      className="w-input-sm"
                      maxLength={6}
                      value={String(item.amount)}
                      onChange={e =>
                        handleChangeDiscountCoupon(
                          'amount',
                          index,
                          e?.target.value.replace(/\D/g, ''),
                        )
                      }
                      error={undefined}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup className="mb-2">
                    <ButtonGroup
                      label="Tipo do desconto"
                      name="discountType"
                      value={String(item.discountType)}
                      onChange={e =>
                        handleChangeDiscountCoupon('discountType', index, e?.target.value)
                      }
                      options={[
                        { value: '0', label: 'R$' },
                        { value: '1', label: '%' },
                      ]}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <InputText
                    name="discount"
                    type="number"
                    className={!item.discountType ? 'input__disabled' : ''}
                    label="Valor do desconto"
                    placeholder="R$40,00 ou 50%"
                    value={String(item.discount) || ''}
                    onChange={e => {
                      handleChangeDiscountCoupon(
                        'discount',
                        index,
                        e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                      );
                    }}
                    error={undefined}
                  />
                </Col>
                <Col md={3}>
                  <div className="d-flex justify-content-end mt-5">
                    <Trash
                      className="svg-icon action-icon"
                      onClick={() => handleRemoveDiscountCoupon(index)}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </>
        ))}
      </Form>
      <div
        onClick={() => {
          handleAddDiscountCoupon();
        }}
        className="mb-4 register-buttom action-icon"
      >
        + inserir novo cupom de desconto
      </div>
    </>
  );
};
