import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import DiscountVoucher from '../../modal/DiscountVoucher';

const Sample = (): JSX.Element => {
  const history = useNavigate();
  const [show, setShow] = useState(false);

  const viewReport = (): void => {
    history('/report-detail');
  };

  const callShow = (b: boolean): void => {
    setShow(b);
  };
  return (
    <Fragment>
      <DiscountVoucher show={show} setShow={callShow} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <Label className="pageTitle">Relatórios</Label>
          </div>
        </div>
        <Row>
          <Col sm="12">
            <div className="d-flex" style={{ marginBottom: '30px' }}>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de vendas</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de sangrias de PDV</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de cortesias</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de lotes</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de cartões</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{ display: 'grid' }}
              >
                <div className="normalText">Relatório de eventos</div>
              </div>
            </div>
            <div className="d-flex" style={{ marginBottom: '30px' }}>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de vendas</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de sangrias de PDV</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de cortesias</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de lotes</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de cartões</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{ display: 'grid' }}
              >
                <div className="normalText">Relatório de eventos</div>
              </div>
            </div>
            <div className="d-flex" style={{ marginBottom: '30px' }}>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de vendas</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de sangrias de PDV</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de cortesias</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de lotes</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de cartões</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{ display: 'grid' }}
              >
                <div className="normalText">Relatório de eventos</div>
              </div>
            </div>
            <div className="d-flex" style={{ marginBottom: '30px' }}>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de vendas</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de sangrias de PDV</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de cortesias</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de lotes</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{
                  display: 'grid',
                  marginRight: '40px',
                  textAlign: 'center',
                }}
              >
                <div className="normalText">Relatório de cartões</div>
              </div>
              <div
                onClick={viewReport}
                className="reportCard justify-content-center align-items-center"
                style={{ display: 'grid' }}
              >
                <div className="normalText">Relatório de eventos</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
