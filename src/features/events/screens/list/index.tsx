import React, { useEffect, useState } from 'react';
import { EventContainer, States, ShouldShowModal } from '@/features/events/screens/list/ui';
import EventStatus from '@/model/EventStatus';
import { colors } from '@/styles/colors';
import { useDialog } from '@/hooks/useDialog';
import useForm from '@/hooks/useForm';
import { AxiosError } from 'axios';
import { FormInputName as FormInputNameToFilter } from '@/features/contractor/components/FilterContent';
import { toast } from 'react-toastify';
import api from '@/services/api';
import Event from '@/model/Event';
import Voucher from '@/model/Voucher';
import { EventRequestParams, EventResponse } from '../../types';

export default interface PayloadEvent {
  id?: string;
  eventStatus?: EventStatus;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const EventScreen: React.FC = () => {
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.filter);

  const [state, setState] = useState<States>(States.default);
  const [listEvent, setListEvent] = useState<Event[]>([]);
  const [fullListEvent, setFullListEvent] = useState<Event[]>([]);
  const [voucher, setVoucher] = useState<Voucher>();
  const [pagination, setPagination] = useState({
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState<EventRequestParams>({
    page: 1,
    pageSize: +pagination,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const paginationSelect = [
    { value: 10, label: '10 por página' },
    { value: 20, label: '20 por página' },
    { value: 50, label: '50 por página' },
    { value: 100, label: '100 por página' },
  ];

  const changeColorColumn = (status: EventStatus): string =>
    ({
      0: colors.lightBlue,
      1: colors.darkRed,
      2: colors.green,
      3: colors.yellow,
      4: colors.red,
      5: colors.lightGreen,
      6: colors.orange,
      7: colors.grey,
    }[status] || colors.grey);

  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
    resetForm: resetFormFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

  const handleFetch = async (values: EventRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<EventResponse>('/event/page', values);

      if (data) {
        setListEvent(data?.list ?? []);

        setCurrentPage(currentPageState => ({
          ...currentPageState,
          ...data,
        }));
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFetchAll = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Event[]>('/event/find');
      setFullListEvent(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnReleaseEvent = async (eventSelected: Event): Promise<void> => {
    try {
      const payload: PayloadEvent = {
        id: eventSelected.id,
        eventStatus: 2,
      };
      await api.post<Event>('/event/general-information', payload);

      toast.success('Evento Liberado!');
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnRefuseEvent = async (eventSelected: Event): Promise<void> => {
    try {
      const payload: PayloadEvent = {
        id: eventSelected.id,
        eventStatus: 3,
      };
      await api.post<Event>('/event/general-information', payload);

      toast.success('Evento Liberado!');
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnPaginationChange = async (page: number): Promise<void> => {
    handleFetch({
      ...currentPage,
      page,
    });
  };

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    voucher: voucherSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    voucher?: Voucher;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (voucherSelected) {
      setVoucher(voucherSelected);
    }
  };

  const clearFilter = async (): Promise<void> => {
    resetFormFilter();
    await handleFetch({
      ...currentPage,
      entity: {},
    } as any);
    onToggle();
  };

  const handleOnFilter = async (): Promise<void> => {
    try {
      if (isFormValidFilter()) {
        const payload =
          {
            name: {
              entity: {
                name: formDataFilter[FormInputNameToFilter.inputSearch],
              },
            },
          }[formDataFilter[FormInputNameToFilter.filterSearch]] || {};

        onToggle();
        await handleFetch({
          ...currentPage,
          ...payload,
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnFilterStatus = async (status: number): Promise<void> => {
    try {
      if (isFormValidFilter()) {
        const payload = {
          entity: {
            eventStatus: status,
          },
        };

        await handleFetch({
          ...currentPage,
          ...payload,
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    handleFetch({ ...currentPage, ...pagination });
    handleFetchAll();
  }, [pagination]);

  return (
    <EventContainer
      voucher={voucher}
      state={state}
      listEvent={listEvent}
      paginationSelect={paginationSelect}
      changeColorColumn={changeColorColumn}
      shouldShowModal={shouldShowModal}
      title={title}
      visible={visible}
      onToggle={onToggle}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      onPaginationChange={handleOnPaginationChange}
      currentPage={currentPage}
      pagination={pagination}
      setPagination={setPagination}
      onFilter={handleOnFilter}
      handleOnFilterStatus={handleOnFilterStatus}
      clearFilter={clearFilter}
      fullListEvent={fullListEvent}
      onReleaseEvent={handleOnReleaseEvent}
      onRefuseEvent={handleOnRefuseEvent}
    />
  );
};
