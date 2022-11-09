/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-body-style */
import { Button, InputText } from '@/components';
import { CustomTable } from '@/components/Table';
import Voucher from '@/model/Voucher';
import React from 'react';
import { X } from 'react-feather';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import Event from '@/model/Event';
import { columns } from './table';

export interface DataRow {
  id: string;
  description: string;
  value: number;
  user: string;
  code: string;
  actions: string;
}

interface RegisterContentProps {
  voucherState: Voucher[];
  handleOnSaveVoucher: (event: Event) => void;
  handleFetchVoucher: (event: Event) => void;
  eventState: Event | any;
}
export const RegisterVoucher: React.FC<RegisterContentProps> = ({
  voucherState,
  eventState,
  handleOnSaveVoucher,
  handleFetchVoucher,
}) => {
  const dataTableVoucher = voucherState?.map(voucher => ({
    id: voucher.id,
    description: voucher.description,
    user: '-',
    value: voucher.value,
    code: voucher.code,
    actions: <X />,
  }));
  return (
    <>
      <Form>
        <Row>
          <Col md={8}>
            <FormGroup className="mb-2">
              <InputText
                label="Descrição do voucher"
                placeholder="Digite a descrição do voucher de desconto"
                name="description"
                value={''}
                onChange={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <InputText
                label="Valor do voucher"
                placeholder="Ex: 200 ,00  "
                name="value"
                value={''}
                onChange={function (): void {
                  throw new Error('Function not implemented.');
                }}
                after={true}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className="mb-4"
                title="Gerar voucher"
                onClick={() => {
                  handleOnSaveVoucher(eventState);
                  setTimeout(() => {
                    handleFetchVoucher(eventState);
                  }, 500);
                }}
              />
            </div>
            <div style={{ borderBottom: 'solid 1px #D9D9D9', width: '100%' }}></div>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col md={7}>
          <h5 className="mb-4 border-bottom-title fw-400 mt-5">Vouchers gerados</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable
            columns={columns}
            data={dataTableVoucher}
            numberRowsPerPage={10}
            theme="secondary"
            progressPending={false}
          />
        </Col>
      </Row>
    </>
  );
};
