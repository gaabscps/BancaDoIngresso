import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import SuperButton from '../../sharedComponents/SuperButton';
import DocumentUpload from '../../modal/DocumentUpload';
import pen from '../../../assets/images/svg/pen.svg';
import lixeira from '../../../assets/images/svg/lixeira.svg';
import download from '../../../assets/images/svg/download.svg';

const Sample = (): JSX.Element => {
  const [showDocument, setShowDocument] = useState(false);

  const callShow = (b: boolean): void => {
    setShowDocument(b);
  };

  return (
    <Fragment>
      <DocumentUpload show={showDocument} setShowDocument={callShow} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <Label className="pageTitle">Documentos</Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={() => setShowDocument(true)}>
              + Upload de documento
            </SuperButton>
          </Row>
        </div>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerNome normalText">Nome do documento</div>
              <div className="linhaDaTabela headerCidade normalText">Categoria</div>
              <div className="linhaDaTabela headerData normalText">Responsável</div>
              <div className="linhaDaTabela headerData normalText">Data do upload</div>
              <div className="linhaDaTabela headerAção normalText">Ações</div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Documento XYZ.jpg</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Documentação</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">jose.silva</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">02/02/2022 às 10:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={pen}
                    style={{ paddingRight: '25px' }}
                    onClick={() => setShowDocument(true)}
                    alt=""
                  />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={download} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Meu documento.pdf</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Documentação</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">maria.almeida</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">10/02/2022 às 11:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={pen}
                    style={{ paddingRight: '25px' }}
                    onClick={() => setShowDocument(true)}
                    alt=""
                  />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={download} alt="" />
                </div>
              </div>
            </div>{' '}
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">124334242_foto.png</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Documentação</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">marco.souza</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">02/02/2022 às 10:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={pen}
                    style={{ paddingRight: '25px' }}
                    onClick={() => setShowDocument(true)}
                    alt=""
                  />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={download} alt="" />
                </div>
              </div>
            </div>{' '}
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Meu documento2.pdf</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Documentação</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">roberta.feijo</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">12/02/2022 às 14:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={pen}
                    style={{ paddingRight: '25px' }}
                    onClick={() => setShowDocument(true)}
                    alt=""
                  />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={download} alt="" />
                </div>
              </div>
            </div>{' '}
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Meu documento3.pdf</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Documentação</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">pedro.oliveira</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">13/02/2022 às 10:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={pen}
                    style={{ paddingRight: '25px' }}
                    onClick={() => setShowDocument(true)}
                    alt=""
                  />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={download} alt="" />
                </div>
              </div>
            </div>{' '}
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Meu documento4.pdf</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Documentação</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">julia.cavalheiro</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">13/02/2022 às 08:20</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={pen}
                    style={{ paddingRight: '25px' }}
                    onClick={() => setShowDocument(true)}
                    alt=""
                  />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={download} alt="" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
