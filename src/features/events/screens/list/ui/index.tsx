import React, { Fragment } from 'react';
import { Button, DropdonwFlags, DropdownMenu } from '@/components';
import { Container } from 'reactstrap';
import FilterVector from '@/assets/images/svg/FilterVector';

import { colors } from '@/styles/colors';
import { SimpleSelect } from '@/components/SimpleSelect';
import { CustomTable, ColumnStatus, ColumnImage } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import { ReactComponent as EventAction } from '@/assets/images/svg/eventAction.svg';
import { StatusFilter } from '@/components/StatusFilter';
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
          <EventAction
            className="action-icon"
            onClick={() => <DropdownMenu title="teste" actions={[{ title: 'Editar' }]} />}
          />
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
          <StatusFilter statusColor={colors.lightBlue} status="Rascunho" />
          <StatusFilter statusColor={colors.darkRed} status="Liberação pendente" />
          <StatusFilter statusColor={colors.green} status="Liberado" />
          <StatusFilter statusColor={colors.yellow} status="Recusado" />
          <StatusFilter statusColor={colors.red} status="Bloqueado" />
          <StatusFilter statusColor={colors.lightLightBlue} status="Encerrado" />
          <StatusFilter statusColor={colors.orange} status="Finalizado" />
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
