import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import RegisterGroup from '../../modal/RegisterGroup';
import RegisterUser from '../../modal/RegisterUser';
import UserIcon from '../../../assets/images/svg/User';
import UserGroupIcon from '../../../assets/images/svg/UserGroup';
import SuperButton from '../../sharedComponents/SuperButton';
import SuperCollapse from '../../sharedComponents/SuperCollapse';

const Sample = (): JSX.Element => {
  const [showGroup, setShowGroup] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const callShowGroup = (b: boolean): void => {
    setShowGroup(b);
  };

  const callShowUser = (b: boolean): void => {
    setShowUser(b);
  };

  return (
    <Fragment>
      <RegisterGroup show={showGroup} setShowGroup={callShowGroup} />
      <RegisterUser show={showUser} setShowUser={callShowUser} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <Label className="pageTitle">Usuários e Grupos</Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={() => setShowGroup(true)}>
              + Cadastrar grupo
            </SuperButton>
            <SuperButton
              onClick={() => setShowUser(true)}
              style={{
                marginLeft: '15px',
              }}
              color="primary"
            >
              + Cadastrar usuário
            </SuperButton>
          </Row>
        </div>
        <Row>
          <Col sm="12">
            <SuperCollapse
              title="Usuários cadastrados"
              content="Nenhum usuário cadastrado. Aqui será exibida uma lista dos usuários cadastrados"
              leftIcon={UserIcon()}
            />
            <SuperCollapse
              title="Grupos cadastrados"
              content="Nenhum grupo cadastrado. Aqui será exibida uma lista dos grupos cadastrados"
              leftIcon={UserGroupIcon()}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
