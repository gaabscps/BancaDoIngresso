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
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
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
  OnShouldShowModal: ({
    value,
    newTitleModal,
    event,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    event?: Event;
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
  OnShouldShowModal,
}) => {
  const dataEventType = [
    { id: 0, name: 'Evento pai' },
    { id: 1, name: 'Evento filho' },
    { id: 2, name: 'Evento único' },
  ];

  const renderActionDialogToCancelFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): void => clearFilter(),
    theme: 'noneBorder',
  };

  const dataTablePos = listEvent?.map(event => ({
    id: event.id,
    image: (
      <ColumnStatus justify="right" statusColor={String(changeColorColumn(event.eventStatus))}>
        <ColumnImage
          srcImage={
            event.imageBase64
              ? event.imageBase64
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABTCAYAAACLQbk4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOhSURBVHgB7d1dT9pQHMfx01PLLKmCQEmJknCxbEuWaIzxgsQlS3zrJrtzV2oyL4iJAS8UGcEiFGHnmB2DhAdh7elv9f+5EKVo9Hw5feDBGmy6tVwu51mWlRWfO4ZhrDMSOWPyilKpVBgMBl9M01xjRKtXMVzX/Sgi7DASi5d7v+d5FXFBIWLE5QcxIzxxUWEkVs8xOOcVRmLH5aygvSUMYlLwAiMQ5GrKYQQCp1UUDs4IDIoBhGIAoRhAKAYQigGEYgChGEAoBhCKAYRiAKEYQCgGEIoBhGIAoRhAKAYQigEE/iWc6XR6bW9v7/PW1tYO59zq9/u/b29vr09PT2ssYUzHcSoMVC6Xs6vV6jfxO7riuXpTXmea5vrGxkaxXC7na7XaNUsQ6NXU7u7uV8uy7GnLbNvOHxwcfGIJAhtDDLYlZoQ37zaFQqHMEgQ2RrFY3Fx0m1mzZlypVNo8Pj6uym0PAwcbo91udxfdptfrtectlyH29/ercpV2dHQEHwQ2xv39vd/tdu/m3ebh4WFmDBVC7oHJr1OpVAY9CPQG/Pz8/Gw4HAbTlgVB0L24uPg1bdlkCAU9CPSubafT6YljiobrunmxffigrhersJufgpw9k98zK4Qid423t7fdRqNRF0GHDIjhed539h+Qe1fZbNZutVpi7dWdOlsWhRgnDx5PTk5++L4/YCCgZ8a4wWAwlDNFXk5bvkwICXGGQGwz5EAeHh6ufAC3bAgFbRsS+8xQAykf4shkMqxer9+t8v3LhlCQZkisMSYHUvwu+WWC/GsIBSVIbDFmDeRbg4QVQkEIEkuMRQO5KEjYIZS4g2iP8daBnBUkqhBKnEG0xlh2ICeDRB1CiSuIthirDqQKMhqNAh0hlDiCaDkCD+MeLR+j0hVinM4j9chnRlirFvW0q246Z0ikR+C61vFR03WkHlmMpIRQdASJJEbSQihRBwk9RlJDKFEGCTVG0kMoUQUJ9YeJPbP01dXVGXsnxDOQGfH3LvUo8zyhxri8vLxhZGX0wmcgFAMIxQBCMYBQDCAUAwjFAEIxgFAMIBQDCMUAQjGAUAwgFAMIxQBCMYBQDCAUAwgfjUaPjECQM6PDCAQeBEGLEQi82WzePD09wbwX+j2Tr+wemqbpp1KpIiOxen6Zfb/f923bXuOcL/y3QiQ6L+958H2/6TjPp+zLMhKLV29A6XQ6LTFDHg3DkCdkp/OBa2bMWiDP+fr3VKMOnVhRjz9v7Ub81CuWZAAAAABJRU5ErkJggg=='
          }
        />
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
    startDate: event.startDate,
    endDate: event.endDate,
    actions: (
      <DropdownMenu
        title={<EventAction />}
        actions={[
          {
            icon: <Pen />,
            title: 'Editar',
          },
          {
            title: 'Gestão de ingressos',
            icon: <TicketManagement width={18} height={17} />,
          },
          {
            title: 'Voucher de desconto',
            icon: <Ticket />,
          },
          {
            title: 'Fechamento do evento',
            icon: <EventDeal width={18} height={17} />,
          },
          {
            title: 'Bloquear',
            icon: <Block />,
          },
          {
            title: 'Relatórios',
            icon: <Report />,
          },
          event.eventStatus === 0
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
          event.eventStatus === 0
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
        position={shouldShowModal === ShouldShowModal.filter ? 'right' : 'center'}
        isContentWithCard={shouldShowModal !== ShouldShowModal.filter}
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToCancelFilter,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
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
              {/* {listEvent?.filter(event => event.eventStatus === 0).length > 0 ? ( */}
              <p className="eventDraftCounter">
                Você tem{' '}
                <span style={{ color: '#222222', fontWeight: '500' }}>
                  {fullListEvent?.map(event => event.eventStatus === 0).length} eventos
                </span>
                em rascunho
              </p>
              {/* ) : null} */}
            </div>
            <div className="button-filter-container">
              <Button title="+ Cadastrar novo evento" onClick={() => undefined} />
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
                    OnShouldShowModal({
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
          <div className="d-flex pb-2 status-container">
            <StatusFilter handleOnFilterStatus={handleOnFilterStatus} />
          </div>
          <CustomTable
            columns={columns}
            data={dataTablePos}
            numberRowsPerPage={10}
            theme="primary"
            progressPending={false}
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
