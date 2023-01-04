import React from 'react';
import { Col, Row } from 'reactstrap';
import OrderTicketDetail from '@/model/OrderTicketDetail';
import dayjs from 'dayjs';
import { updateMask } from '@/helpers/masks/cpf';

interface TicketDetailContentProps {
  detail: OrderTicketDetail;
}

export const TicketDetailContent: React.FC<TicketDetailContentProps> = ({ detail }) => (
  <>
    {detail && (
      <div>
        <Row>
          <Col md={12}>
            <label className={'input-label m-0'}>Data e hora da utilização</label>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {detail.useDate
              ? dayjs(detail.useDate).locale('pt-br').format('DD/MM/YYYY [às] HH:mm')
              : 'Não utilizado'}
          </Col>
        </Row>
        <Row style={{ marginTop: '30px' }}>
          <Col md={12}>
            <label className={'input-label m-0'}>Código do ingresso</label>
          </Col>
        </Row>
        <Row>
          <Col md={12}>{detail.id}</Col>
        </Row>
        <Row style={{ marginTop: '30px' }}>
          <Col md={12}>
            <label className={'input-label m-0'}>Nome do comprador</label>
          </Col>
        </Row>
        <Row>
          <Col md={12}>{detail.clientName}</Col>
        </Row>
        <Row style={{ marginTop: '30px' }}>
          <Col md={12}>
            <label className={'input-label m-0'}>CPF do comprador</label>
          </Col>
        </Row>
        <Row>
          <Col md={12}>{updateMask(detail.clientCPF)}</Col>
        </Row>
        <Row style={{ marginTop: '30px' }}>
          <Col md={12}>
            <label className={'input-label m-0'}>POS</label>
          </Col>
        </Row>
        <Row>
          <Col md={12}>{detail.posName}</Col>
        </Row>
        <Row style={{ marginTop: '30px' }}>
          <Col md={12}>
            <label className={'input-label m-0'}>PDV</label>
          </Col>
        </Row>
        <Row>
          <Col md={12}>{detail.pdvName}</Col>
        </Row>
      </div>
    )}
  </>
);
