import React, { Fragment } from 'react';
import { Button, DropdonwFlags } from '@/components';
import { Container } from 'reactstrap';
import FilterVector from '@/assets/images/svg/FilterVector';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import { colors } from '@/styles/colors';
import { SimpleSelect } from '@/components/SimpleSelect';
import { CustomTable, ColumnStatus, ColumnImage } from '@/components/Table';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import Pagination from '@/components/Utils/Pagination';
import { columns } from './table';

export interface DataRow {
  id: string;
  image: string;
  status: number;
  name: string;
  startDate: string;
  endDate: string;
  city: string;
  actions: string;
}

interface EventContainerProps {
  paginationSelect: { value: number; label: string }[];
  changeColorColumn: (status: number) => string;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const EventContainer: React.FC<EventContainerProps> = ({
  paginationSelect,
  changeColorColumn,
}) => {
  const dataTablePos = [
    {
      id: 1,
      image: (
        <>
          <ColumnImage srcImage="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <ColumnStatus justify="right" statusColor={String(changeColorColumn(1))} />
        </>
      ),
      name: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{}}>Revoada do Tatu</div>
          {<DropdonwFlags dataColumn={[{ id: '1', name: 'evento Pai' }]} />}
        </div>
      ),
      city: 'Campinas/SP',
      startDate: '01/04/2022 às 15:30',
      endDate: '01/04/2022 às 22:30',
      actions: (
        <React.Fragment>
          <Pen />
        </React.Fragment>
      ),
    },
    {
      id: 1,
      image: (
        <>
          <ColumnImage srcImage="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <ColumnStatus justify="right" statusColor={String(changeColorColumn(1))} />
        </>
      ),
      name: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{}}>Revoada do Tatu</div>
          {<DropdonwFlags dataColumn={[{ id: '1', name: 'evento Pai' }]} />}
        </div>
      ),
      city: 'Campinas/SP',
      startDate: '01/04/2022 às 15:30',
      endDate: '01/04/2022 às 22:30',
      actions: (
        <React.Fragment>
          <Pen />
        </React.Fragment>
      ),
    },
    {
      id: 1,
      image: (
        <>
          <ColumnImage srcImage="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <ColumnStatus justify="right" statusColor={String(changeColorColumn(1))} />
        </>
      ),
      name: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{}}>Revoada do Tatu</div>
          {<DropdonwFlags dataColumn={[{ id: '1', name: 'evento Pai' }]} />}
        </div>
      ),
      city: 'Campinas/SP',
      startDate: '01/04/2022 às 15:30',
      endDate: '01/04/2022 às 22:30',
      actions: (
        <React.Fragment>
          <Pen />
        </React.Fragment>
      ),
    },
    {
      id: 1,
      image: (
        <>
          <ColumnImage srcImage="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <ColumnStatus justify="right" statusColor={String(changeColorColumn(1))} />
        </>
      ),
      name: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{}}>Revoada do Tatu</div>
          {<DropdonwFlags dataColumn={[{ id: '1', name: 'evento Pai' }]} />}
        </div>
      ),
      city: 'Campinas/SP',
      startDate: '01/04/2022 às 15:30',
      endDate: '01/04/2022 às 22:30',
      actions: (
        <React.Fragment>
          <Pen />
        </React.Fragment>
      ),
    },
    {
      id: 1,
      image: (
        <>
          <ColumnImage srcImage="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <ColumnStatus justify="right" statusColor={String(changeColorColumn(1))} />
        </>
      ),
      name: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{}}>Revoada do Tatu</div>
          {<DropdonwFlags dataColumn={[{ id: '1', name: 'evento Pai' }]} />}
        </div>
      ),
      city: 'Campinas/SP',
      startDate: '01/04/2022 às 15:30',
      endDate: '01/04/2022 às 22:30',
      actions: (
        <React.Fragment>
          <Pen />
        </React.Fragment>
      ),
    },
    {
      id: 1,
      image: (
        <>
          <ColumnImage srcImage="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <ColumnStatus justify="right" statusColor={String(changeColorColumn(1))} />
        </>
      ),
      name: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{}}>Revoada do Tatu</div>
          {<DropdonwFlags dataColumn={[{ id: '1', name: 'evento Pai' }]} />}
        </div>
      ),
      city: 'Campinas/SP',
      startDate: '01/04/2022 às 15:30',
      endDate: '01/04/2022 às 22:30',
      actions: (
        <React.Fragment>
          <Pen />
        </React.Fragment>
      ),
    },
    {
      id: 1,
      image: (
        <>
          <ColumnImage srcImage="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <ColumnStatus justify="right" statusColor={String(changeColorColumn(1))} />
        </>
      ),
      name: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{}}>Revoada do Tatu</div>
          {<DropdonwFlags dataColumn={[{ id: '1', name: 'evento Pai' }]} />}
        </div>
      ),
      city: 'Campinas/SP',
      startDate: '01/04/2022 às 15:30',
      endDate: '01/04/2022 às 22:30',
      actions: (
        <React.Fragment>
          <Pen />
        </React.Fragment>
      ),
    },
  ];
  return (
    <Fragment>
      {/* <Loading isVisible={state === States.loading} /> */}
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <h5 className="pageTitle" style={{ marginBottom: '1px' }}>
              Todos os eventos cadastrados
            </h5>
            <p className="eventDraftCounter">
              Você tem <span style={{ color: '#222222', fontWeight: '500' }}>0 eventos</span> em
              rascunho
            </p>
          </div>
          <div className="button-filter-container">
            <Button title="+ Cadastrar novo evento" onClick={() => undefined} />
            <div style={{ marginLeft: '15px' }}>
              <SimpleSelect
                name={'Exibir'}
                value={0}
                options={paginationSelect}
                placeholder="10 por página"
                label="Exibir"
              />
            </div>
            <div className="filter-container">
              <div className="filter-content" onClick={undefined}>
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex pb-2 status-container">
          <div className="eventStatus subText">
            <Status style={{ color: colors.lightBlue }} />
            Rascunho
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: colors.darkRed }} />
            Liberação pendente
          </div>

          <div className="eventStatus subText">
            <Status style={{ color: colors.green }} />
            Liberado
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: colors.yellow }} />
            Recusado
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: colors.red }} />
            Bloqueado
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: colors.lightLightBlue }} />
            Encerrado
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: colors.orange }} />
            Finalizado
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={dataTablePos}
          numberRowsPerPage={10}
          theme="primary"
          progressPending={false}
        />
        <Pagination
          currentPage={1}
          totalCount={5}
          pageSize={1}
          onPageChange={() => undefined}
          total={5}
        />
      </Container>
    </Fragment>
  );
};
