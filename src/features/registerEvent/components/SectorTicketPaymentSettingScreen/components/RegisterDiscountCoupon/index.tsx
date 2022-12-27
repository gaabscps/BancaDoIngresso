import { InputText } from '@/components';
import React from 'react';
import DiscountCoupon from '@/model/DiscountCoupon';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Col, Form, FormGroup, Row } from 'reactstrap';

interface RegisterContentProps {
  handleAddDiscountCoupon: () => void;
  handleChangeDiscountCoupon: (name: string, index: number, value: string) => void;
  handleRemoveDiscountCoupon: (index: number) => void;
  discountCoupon: DiscountCoupon[];
}

export const RegisterDiscountCoupon: React.FC<RegisterContentProps> = ({
  handleAddDiscountCoupon,
  handleChangeDiscountCoupon,
  handleRemoveDiscountCoupon,
  discountCoupon,
}) => (
  <>
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
      }}
    >
      {discountCoupon.map((item, index) => (
        <div key={index} style={{ backgroundColor: '#f1f1f1' }}>
          <div className="m-4 pt-5">
            <Row>
              <Col md={6}>
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
              <Col md={6}>
                <FormGroup className="mb-2">
                  <InputText
                    name="code"
                    label="Código do cupom"
                    placeholder="Digite o código do cupom. Ex: MAE20 "
                    value={item.code}
                    onChange={e => handleChangeDiscountCoupon('code', index, e?.target.value)}
                    error={undefined}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={2} sm={4}>
                <FormGroup className="mb-2">
                  <InputText
                    name="amount"
                    type="number"
                    label="Quant. cupons"
                    placeholder="0"
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
              <Col className="ml-5" md={2} sm={4}>
                <FormGroup className="mb-2">
                  <InputText
                    name="discount"
                    type="number"
                    label="Desconto (%)"
                    placeholder="0"
                    maxLength={2}
                    value={String(item.discount)}
                    onChange={e =>
                      handleChangeDiscountCoupon(
                        'discount',
                        index,
                        e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                      )
                    }
                    error={undefined}
                  />
                </FormGroup>
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                <Trash
                  className="svg-icon action-icon"
                  onClick={() => handleRemoveDiscountCoupon(index)}
                />
              </Col>
            </Row>
          </div>
          {discountCoupon.length > 1 ? (
            <div className="pb-4" style={{ backgroundColor: '#f8f8f8' }}></div>
          ) : null}
        </div>
      ))}
    </Form>
    <div
      onClick={() => {
        handleAddDiscountCoupon();
      }}
      className="d-flex justify-content-end mt-4 register-buttom action-icon"
    >
      + inserir novo cupom de desconto
    </div>
  </>
);
