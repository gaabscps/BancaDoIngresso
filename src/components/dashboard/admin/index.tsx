import React, { Fragment, useEffect } from 'react';
import { Container, Row, Col, CardHeader, Label } from 'reactstrap';
import { useDispatch } from 'react-redux';
import clock from '../../../assets/images/svg/clock.svg';
import x from '../../../assets/images/svg/x.svg';
import money from '../../../assets/images/svg/money.svg';
import reMoney from '../../../assets/images/svg/reMoney.svg';
import calendar from '../../../assets/images/svg/calendar.svg';
import locationPin from '../../../assets/images/svg/locationPin.svg';
// import { ApplicationState } from '../../../store';
// import { HomeState } from '../../../store/ducks/home/types';
// import { listRequest } from '../../../store/ducks/event/actions';
// import EventFind from '../../../entities/EventFind';
// import { EventState } from '../../../store/ducks/event/types';
// import { CheckUserState } from '../../../store/ducks/check-user/types';
// import Page from '../../../entities/Page';
import { getRequest } from '../../../store/ducks/home/actions';

const Sample = (): JSX.Element => {
  // const home = useSelector<ApplicationState, HomeState>(store => store.home);
  const dispatch = useDispatch();
  // const event = useSelector<ApplicationState, EventState>(store => store.event);
  // const checkUser = useSelector<ApplicationState, CheckUserState>(store => store.checkUser);
  // const page: Page<EventFind, Event> = {
  //   page: 1,
  //   pageSize: 10,
  //   sort: 'startDate',
  //   order: 'DESC',
  // };
  // const [pagination, setPagination] = useState(page);
  // useEffect(() => {
  //   if (!checkUser.call && checkUser.logged) {
  //     if (!event.loading && event.data && !event.data.page) {
  //       dispatch(listRequest(pagination));
  //     } else if (!event.error && event.data && event.data.page && event.data.page.total) {
  //       setPagination(event.data.page);
  //     }
  //   }
  // }, [event]);

  useEffect(() => {
    dispatch(getRequest());
  }, []);
  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div style={{ display: 'grid', paddingBottom: '20px' }}>
          <Label className="pageTitle">Visão Geral</Label>
          <Label className="fieldLabel">Últimos 30 dias</Label>
        </div>
        <Row>
          <Col sm="12">
            <CardHeader className="cardHeader row">
              <div className="firstDiv col">
                <div className="firstContent textContent d-flex align-items-start">
                  <img src={clock} style={{ paddingRight: '8px', marginTop: '5px' }} />
                  <div className="d-flex flex-column">
                    Eventos pendentes de liberação
                    {/* <div className="count">{home?.data?.pendingReleaseEvents}</div> */}
                  </div>
                </div>
              </div>
              <div className="firstDiv col">
                <div className="firstContent textContent d-flex align-items-start">
                  <img src={x} style={{ paddingRight: '8px', marginTop: '5px' }} />
                  <div className="d-flex flex-column">
                    Eventos cancelados
                    {/* <div className="count">{home.data.canceledEvents}</div> */}
                  </div>
                </div>
              </div>
              <div className="firstDiv col">
                <div className="firstContent textContent d-flex align-items-start">
                  <img src={money} style={{ paddingRight: '8px', marginTop: '5px' }} />
                  <div className="d-flex flex-column">
                    PDV’s cadastrados
                    {/* <div className="count">{home.data.registeredPdvs}</div> */}
                  </div>
                </div>
              </div>

              <div className="lastDiv col">
                <div className="firstContent textContent d-flex align-items-start">
                  <img src={reMoney} style={{ paddingRight: '8px', marginTop: '5px' }} />
                  <div className="d-flex flex-column">
                    Chargeback
                    {/* <div className="count">{home.data.chargeback}</div> */}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Col>
        </Row>
        <Col>
          <div style={{ display: 'grid', paddingTop: '50px' }}>
            <div className="d-flex justify-content-between">
              <Label className="pageTitle">Eventos próximos</Label>
              <Label className="normalText">Ver todos</Label>
            </div>
            <Label className="fieldLabel">Últimos 7 dias</Label>
          </div>
          <div style={{ width: '1062px', display: 'contents' }}>
            <div
              className="d-inline-block justify-content-between"
              style={{
                paddingBottom: '30px',
                borderStyle: 'solid',
                borderColor: '#0ff',
                borderWidth: '1px',
                minWidth: 'auto',
              }}
            >
              <div className="partyCard">
                <div className="partyImage2">
                  <img className="actionCard" src={reMoney} style={{ paddingRight: '10px' }} />
                  <div className="descriptionEvent">
                    <div className="nameEvent">Revoada do Tatu</div>
                    <div className="dateEvent">
                      <img src={calendar} style={{ paddingRight: '10px' }} />
                      07/05/2022
                    </div>

                    <div className="locationEvent">
                      <img src={locationPin} style={{ paddingRight: '10px' }} />
                      Campinas/SP
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div className="partyImage1">
                  <img className="actionCard" src={reMoney} style={{ paddingRight: '10px' }} />
                  <div className="descriptionEvent">
                    <div className="nameEvent">Vans Warped Tour - Issues</div>
                    <div className="dateEvent">
                      <img src={calendar} style={{ paddingRight: '10px' }} />
                      10/05/2022
                    </div>

                    <div className="locationEvent">
                      {' '}
                      <img src={locationPin} style={{ paddingRight: '10px' }} />
                      Aparecida do Taboado/MS
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div className="partyImage3">
                  <img className="actionCard" src={reMoney} style={{ paddingRight: '10px' }} />
                  <div className="descriptionEvent">
                    <div className="nameEvent">João Rock 2022</div>
                    <div className="dateEvent">
                      <img src={calendar} style={{ paddingRight: '10px' }} />
                      10/05/2022
                    </div>

                    <div className="locationEvent">
                      <img src={locationPin} style={{ paddingRight: '10px' }} />
                      Ribeirão Preto/SP
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div className="partyImage3">
                  <img className="actionCard" src={reMoney} style={{ paddingRight: '10px' }} />
                  <div className="descriptionEvent">
                    <div className="nameEvent"> Camarote Bacana - Fabiano Henrique</div>
                    <div className="dateEvent">
                      <img src={calendar} style={{ paddingRight: '10px' }} />
                      11/05/2022
                    </div>

                    <div className="locationEvent">
                      <img src={locationPin} style={{ paddingRight: '10px' }} />
                      Campinas/SP
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div className="partyImage1">
                  <img className="actionCard" src={reMoney} style={{ paddingRight: '10px' }} />
                  <div className="descriptionEvent">
                    <div className="nameEvent">Vans Warped Tour - Slow Bleeding</div>
                    <div className="dateEvent">
                      <img src={calendar} style={{ paddingRight: '10px' }} />
                      10/05/2022
                    </div>

                    <div className="locationEvent">
                      {' '}
                      <img src={locationPin} style={{ paddingRight: '10px' }} />
                      Ribeirão Preto/SP
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div className="partyImage2">
                  <img className="actionCard" src={reMoney} style={{ paddingRight: '10px' }} />
                  <div className="descriptionEvent">
                    <div className="nameEvent">Festa Universitária</div>
                    <div className="dateEvent">
                      <img src={calendar} style={{ paddingRight: '10px' }} />
                      10/05/2022
                    </div>

                    <div className="locationEvent">
                      {' '}
                      <img src={locationPin} style={{ paddingRight: '10px' }} />
                      Ribeirão Preto/SP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
