import React, { Fragment } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import {Container,Row,Col,Card,CardHeader} from 'reactstrap';


const  Sample = (props) => {
    return (
         <Fragment>
         <Breadcrumb parent="Dashboard" title="Visão Geral"/>
          <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Desculpe :(</h5><span>Pois ainda não há eventos cadastrados.</span>
                  </CardHeader>
                  {/* <CardBody>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                  </CardBody> */}
                </Card>
              </Col>
            </Row>
          </Container>   
         </Fragment> 
    );
}

export default Sample;