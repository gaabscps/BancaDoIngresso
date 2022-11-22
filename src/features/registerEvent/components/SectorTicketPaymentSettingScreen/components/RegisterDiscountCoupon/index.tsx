import { InputText } from '@/components';
import React from 'react';
import { Card, Col, Form, FormGroup, Row } from 'reactstrap';

// interface RegisterContentProps {}

export const RegisterDiscountCoupon: React.FC = () => (
  <>
    <Card className="modal__main-container card__main-container">
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <Row>
          <Col md={6}>
            <FormGroup className="mb-2">
              <InputText
                name="name"
                label="Nome do cupom"
                placeholder="Digite o nome do cupom. Ex: Dia das Mães"
                value={'1'}
                onChange={() => undefined}
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
                value={'1'}
                onChange={() => undefined}
                error={undefined}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2} sm={4}>
            <FormGroup className="mb-2">
              <InputText
                name="name"
                label="Nome do cupom"
                placeholder="Digite o nome do cupom. Ex: Dia das Mães"
                value={'1'}
                onChange={() => undefined}
                error={undefined}
              />
            </FormGroup>
          </Col>
          <Col md={2} sm={4}>
            <FormGroup className="mb-2">
              <InputText
                name="code"
                label="Código do cupom"
                placeholder="Digite o código do cupom. Ex: MAE20 "
                value={'1'}
                onChange={() => undefined}
                error={undefined}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Card>
    <div className="d-flex justify-content-end mt-4 subpdv-register-buttom action-icon">
      + inserir novo cupom de desconto
    </div>
  </>
);
