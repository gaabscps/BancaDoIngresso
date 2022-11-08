import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { Button, DropdonwFlags, DropdownMenu, Loading } from '@/components';
import { Container } from 'reactstrap';
import FilterVector from '@/assets/images/svg/FilterVector';
import { SimpleSelect } from '@/components/SimpleSelect';
import { CustomTable, ColumnStatus, ColumnImage } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import { ReactComponent as EventAction } from '@/assets/images/svg/eventAction.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Ticket } from '@/assets/images/svg/ticket.svg';
import { ReactComponent as TicketManagement } from '@/assets/images/svg/TicketManagement.svg';
import { ReactComponent as EventDeal } from '@/assets/images/svg/eventDeal.svg';
import { ReactComponent as Block } from '@/assets/images/svg/block.svg';
import { ReactComponent as Report } from '@/assets/images/svg/report.svg';
import { StatusFilter } from '@/components/StatusFilter';
import { ActionProps, Dialog } from '@/components/Dialog';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import { FilterContent } from '@/features/events/components/FilterContent';
import Event from '@/model/Event';
import { EventRequestParams } from '@/features/events/types';
import { useHistory } from 'react-router-dom';
import Voucher from '@/model/Voucher';
import { RegisterVoucher } from '@/features/events/components/RegisterVoucher';
import dayjs from 'dayjs';
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  voucher = 'voucher',
}
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
  shouldShowModal: ShouldShowModal;
  currentPage: EventRequestParams;
  title: string | React.ReactNode;
  listEvent: Event[];
  state: States;
  visible: boolean;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  pagination: { pageSize: number };
  fullListEvent: Event[];
  voucher: Voucher | undefined;
  onRefuseEvent: (event: Event) => void;
  onReleaseEvent: (event: Event) => void;
  handleOnFilterStatus: (status: number) => void;
  clearFilter: () => void;
  onFilter: () => Promise<void>;
  setPagination: Dispatch<SetStateAction<{ pageSize: number }>>;
  changeColorColumn: (status: number) => string;
  onPaginationChange: (page: number) => void;
  onToggle: () => void;
  onChangeFormInputFilter: OnChangeFormInput;
  clearFilterStatus: () => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    event,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    event?: Event;
    voucher?: Voucher;
  }) => void;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const EventContainer: React.FC<EventContainerProps> = ({
  paginationSelect,
  shouldShowModal,
  formDataFilter,
  formErrorsFilter,
  listEvent,
  currentPage,
  state,
  title,
  visible,
  pagination,
  fullListEvent,
  voucher,
  onRefuseEvent,
  onReleaseEvent,
  handleOnFilterStatus,
  clearFilter,
  onFilter,
  setPagination,
  onPaginationChange,
  changeColorColumn,
  onChangeFormInputFilter,
  onToggle,
  clearFilterStatus,
  onShouldShowModal,
}) => {
  const dataEventType = [
    { id: 0, name: 'Evento único' },
    { id: 1, name: 'Evento pai' },
    { id: 2, name: 'Evento filho' },
  ];

  // const renderActionDialogToCancel: ActionProps = {
  //   title: 'Cancelar',
  //   onClick: (): void => onToggle(),
  //   theme: 'noneBorder',
  // };

  const renderActionDialogToCancelFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): void => clearFilter(),
    theme: 'noneBorder',
  };

  const history = useHistory();

  const dataTablePos = listEvent?.map(event => ({
    id: event.id,
    image: (
      <ColumnStatus justify="right" statusColor={String(changeColorColumn(event.eventStatus))}>
        <ColumnImage srcImage={event.imageBase64} />
      </ColumnStatus>
    ),
    name: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>{event.name}</div>
        {<DropdonwFlags dataColumn={dataEventType.filter(value => value.id === event.eventType)} />}
      </div>
    ),
    city: event.address.city,
    startDate: event.startDate === null ? '-----' : dayjs(event.startDate).format('DD/MM/YYYY'),
    endDate: event.endDate === null ? '-----' : dayjs(event.startDate).format('DD/MM/YYYY'),
    actions: (
      <DropdownMenu
        title={<EventAction />}
        actions={[
          {
            icon: <Pen />,
            title: 'Editar',
            action: () => history.push(`/dashboard/event/edit/${event.id}`),
          },
          {
            title: 'Gestão de ingressos',
            icon: <TicketManagement width={17} height={17} />,
          },
          {
            title: 'Voucher de desconto',
            icon: <Ticket />,
            action: () =>
              onShouldShowModal({
                newTitleModal: 'Cadastrar voucher de desconto',
                value: ShouldShowModal.voucher,
                voucher,
              }),
          },
          {
            title: 'Fechamento do evento',
            icon: <EventDeal width={16} height={17} />,
          },
          {
            title: 'Bloquear',
            icon: <Block />,
          },
          {
            title: 'Relatórios',
            icon: <Report />,
          },
          event.eventStatus === 1
            ? {
                divider: true,
                title: (
                  <div className="d-flex">
                    <Button
                      style={{ minWidth: '164px' }}
                      size="sm"
                      title="Liberar evento"
                      onClick={(): void => {
                        onReleaseEvent(event);
                      }}
                    />
                  </div>
                ),
              }
            : {
                title: '',
                hidden: true,
              },
          event.eventStatus === 1
            ? {
                title: (
                  <Button
                    style={{ minWidth: '164px' }}
                    size="sm"
                    theme="outlineGray"
                    title="Recusar evento"
                    onClick={(): void => onRefuseEvent(event)}
                  />
                ),
              }
            : {
                title: '',
                hidden: true,
              },
        ]}
      />
    ),
  }));

  return (
    <>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        footerBorder={shouldShowModal === ShouldShowModal.voucher ? 'none' : 'top'}
        position={shouldShowModal === ShouldShowModal.filter ? 'right' : 'center'}
        isContentWithCard={shouldShowModal !== ShouldShowModal.filter}
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToCancelFilter,
            [ShouldShowModal.voucher]: {},
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.voucher]: {},
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.filter]: (
              <FilterContent
                formData={formDataFilter}
                formErrors={formErrorsFilter}
                onChangeFormInput={onChangeFormInputFilter}
              />
            ),
            [ShouldShowModal.voucher]: <RegisterVoucher />,
          }[shouldShowModal]
        }
      </Dialog>
      <Fragment>
        {/* <Loading isVisible={state === States.loading} /> */}
        <Container className="mainContainer" fluid={true}>
          <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
            <div className="pageTitle" style={{ display: 'grid' }}>
              <h5 className="pageTitle" style={{ marginBottom: '1px' }}>
                Todos os eventos cadastrados
              </h5>
              <p className="eventDraftCounter">
                Você tem{' '}
                <span style={{ color: '#222222', fontWeight: '500' }}>
                  {fullListEvent?.filter(event => event.eventStatus === 0).length} eventos{' '}
                </span>
                em rascunho
              </p>
            </div>
            <div className="button-filter-container">
              <Button
                title="+ Cadastrar novo evento"
                onClick={() => history.push('/dashboard/event/create')}
              />
              <div style={{ marginLeft: '15px' }}>
                <SimpleSelect
                  name={'Exibir'}
                  value={pagination}
                  options={paginationSelect}
                  placeholder="10 por página"
                  label="Exibir"
                  onChange={e => {
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    setPagination({ pageSize: Number(e?.value) });
                  }}
                />
              </div>
              <div className="filter-container">
                <div
                  className="filter-content"
                  onClick={(): void =>
                    onShouldShowModal({
                      value: ShouldShowModal.filter,
                      newTitleModal: '',
                    })
                  }
                >
                  <FilterVector />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex pb-2 status-container statusFilter">
            <StatusFilter
              handleOnFilterStatus={handleOnFilterStatus}
              clearFilter={clearFilterStatus}
            />
          </div>
          <CustomTable
            columns={columns}
            data={dataTablePos}
            numberRowsPerPage={10}
            theme="primary"
            progressPending={false}
            getRowId={e => {
              history.push(`/dashboard/event/edit/${e.id}`);
            }}
          />
          <Pagination
            currentPage={currentPage.page}
            totalCount={currentPage.total}
            pageSize={currentPage.pageSize}
            onPageChange={page => onPaginationChange(page)}
            total={currentPage.total}
          />
        </Container>
      </Fragment>
    </>
  );
};
