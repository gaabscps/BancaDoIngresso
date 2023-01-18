import React, { Fragment, useState } from 'react';
import { Container, Label, Button, ButtonGroup } from 'reactstrap';
import SubPdvIcon from '../../../../../../assets/images/svg/SubPdv';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';
import SubPdvRegistration from '../../../../../modal/SubPdvRegistration';

const Sample = (): JSX.Element => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <SubPdvRegistration show={show} setShow={setShow} />
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <div className="d-flex">
          <div className="groupButton">
            <Label className="fieldLabel">Permitir Sub PDV?</Label>
            <ButtonGroup style={{ width: '100px' }}>
              <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                Sim
              </Button>
              <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div style={{ color: '#fff', marginTop: '65px', marginLeft: '50px' }}>
            <div className="auxSucessText" onClick={() => setShow(true)}>
              + cadastrar novo Sub PDV
            </div>
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <SuperCollapse
            title="Sub PDV’s cadastrados"
            content="Nenhum sub PDV cadastrado. Aqui será exibida uma lista dos seus sub PDV’s cadastrados"
            leftIcon={SubPdvIcon()}
          />
        </div>
        <div className="nextPageButton">
          <div style={{ color: '#fff' }}>
            <Button
              style={{ height: '50px', width: '200px', borderColor: '#A5A5A5' }}
              variant="outline-light"
            >
              <div className="greyNormalText">Adicionar PDV</div>
            </Button>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
