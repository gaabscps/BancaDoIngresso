/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-body-style */
import { Button, InputText } from '@/components';
import { CustomTable } from '@/components/Table';
import Voucher from '@/model/Voucher';
import { OnChangeFormInput, FormData } from '@/hooks/useForm';
import { ReactComponent as Copy } from '@/assets/images/svg/copy.svg';
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

// eslint-disable-next-line no-shadow
export enum FormInputName {
  description = 'description',
  value = 'value',
}

interface RegisterContentProps {
  voucherState: Voucher[];
  handleOnSaveVoucher: (event: Event) => Promise<void>;
  handleFetchVoucher: (event: Event) => Promise<void>;
  onChangeFormInputVoucher: OnChangeFormInput;
  copyToClipboard: (code: string) => void;
  eventState: Event | any;
  formDataVoucher: FormData;
}
export const RegisterVoucher: React.FC<RegisterContentProps> = ({
  voucherState,
  eventState,
  formDataVoucher,
  copyToClipboard,
  handleOnSaveVoucher,
  handleFetchVoucher,
  onChangeFormInputVoucher,
}) => {
  const dataTableVoucher = voucherState?.map(voucher => ({
    id: voucher.id,
    description: voucher.description,
    user: '-',
    value: voucher.value,
    code: (
      <div className="voucher-code-row">
        {voucher.code}{' '}
        <Copy
          onClick={() => copyToClipboard(voucher.code)}
          className="copy-icon svg-icon action-icon"
        />
      </div>
    ),
    actions: <X className="svg-icon action-icon" />,
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
                value={formDataVoucher[FormInputName.description]}
                onChange={e => onChangeFormInputVoucher(FormInputName.description)(e.target.value)}
              />
              <InputText
                label="Valor do voucher"
                placeholder="Ex: 200 ,00  "
                name="value"
                value={String(formDataVoucher[FormInputName.value])}
                onChange={e => onChangeFormInputVoucher(FormInputName.value)(e.target.value)}
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
                onClick={async () => {
                  await handleOnSaveVoucher(eventState);
                  await handleFetchVoucher(eventState);
                }}
              />
            </div>
            <div style={{ borderBottom: 'solid 1px #D9D9D9', width: '100%' }}></div>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col md={6}>
          <h5 className="mb-4 border-bottom-title fw-400 mt-5">Vouchers gerados</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable
            columns={columns}
            data={dataTableVoucher}
            numberRowsPerPage={10}
            theme="secondaryThemeVoucher"
            progressPending={false}
          />
        </Col>
      </Row>
    </>
  );
};
