import React, { useEffect, useState } from 'react';
import { EventContainer, States, ShouldShowModal } from '@/features/events/screens/list/ui';
import EventStatus from '@/model/EventStatus';
import { colors } from '@/styles/colors';
import { useDialog } from '@/hooks/useDialog';
import useForm from '@/hooks/useForm';
import { AxiosError } from 'axios';
import { FormInputName as FormInputNameToFilter } from '@/features/contractor/components/FilterContent';
import { unmask } from '@/helpers/masks/decimalNumber';
import { toast } from 'react-toastify';
import api from '@/services/api';
import Event from '@/model/Event';
import Voucher from '@/model/Voucher';
import validators from '@/helpers/validators';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { EventRequestParams, EventResponse } from '../../types';
import { FormInputName } from '../../components/RegisterVoucher';
import { DeleteContent } from '../../components/DeleteContent';

export interface PayloadEvent {
  name: string;
  eventStatus?: EventStatus;
}
export interface PayloadVoucher {
  description: string;
  value: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const EventScreen: React.FC = () => {
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.filter);

  const [state, setState] = useState<States>(States.default);
  const [listEvent, setListEvent] = useState<Event[]>([]);
  const [voucher, setVoucher] = useState<Voucher[]>([]);
  const [event, setEvent] = useState<Event>();
  const [fullListEvent, setFullListEvent] = useState<Event[]>([]);
  const [pagination, setPagination] = useState({
    pageSize: 2,
  });
  const [currentPage, setCurrentPage] = useState<EventRequestParams>({
    page: 1,
    pageSize: +pagination,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });
  const confirmDelete = useConfirmDelete();

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
    formData: formDataVoucher,
    formErrors: formErrorsVoucher,
    onChangeFormInput: onChangeFormInputVoucher,
    isFormValid: isFormValidVoucher,
    resetForm: resetFormVoucher,
  } = useForm({
    initialData: {
      description: '',
      value: '',
    },
    validators: {
      description: [validators.required],
      value: [validators.required],
    },
  });

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
    formatters: {},
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
  const handleFetchVoucher = async (eventSelected: Event): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Voucher[]>(`/event/${eventSelected?.id}/voucher`);
      setVoucher(data ?? []);
      resetFormVoucher();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };
  const handleFetchVoucherModal = async (eventSelected: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Voucher[]>(`/event/${eventSelected}/voucher`);
      setVoucher(data ?? []);
      resetFormVoucher();
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
        name: eventSelected.name,
      };
      await api.patch<Event>(`/event/${eventSelected.id}/active`, payload);

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
        name: eventSelected.name,
      };
      await api.patch<Event>(`/event/${eventSelected.id}/refused`, payload);

      toast.success('Evento Recusado!');
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
    event: eventSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    event?: Event | any;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    resetFormVoucher();
    onToggle();
    if (value !== ShouldShowModal.filter) {
      handleFetchVoucher(eventSelected);
      setEvent(eventSelected);
    }
  };

  const handleOnSaveVoucher = async (eventSelected: Event): Promise<void> => {
    try {
      if (isFormValidVoucher()) {
        await api.post(`/event/${eventSelected?.id}/voucher`, {
          description: formDataVoucher[FormInputName.description],
          value: unmask(formDataVoucher[FormInputName.value]),
        });
        toast.success('Voucher gerado');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteVoucher = async (
    eventSelected: string,
    voucherSelected: string,
  ): Promise<void> => {
    try {
      await api.put(`/event/${eventSelected}/voucher/${voucherSelected}/disable`);
      toast.success('Voucher excluído');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  // eslint-disable-next-line no-shadow
  const handleOnShowDeleteProduct = (eventState: string, voucher: string): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => handleOnClose(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: async (): Promise<void> => {
            await handleOnConfirmDeleteVoucher(eventState, voucher);
            await handleFetchVoucherModal(eventState);
          },
        },
      ],
    });
  };

  const clearFilter = async (): Promise<void> => {
    resetFormFilter();
    await handleFetch({
      ...currentPage,
      entity: {},
    } as any);
    onToggle();
  };
  const clearFilterStatus = async (): Promise<void> => {
    resetFormFilter();
    await handleFetch({
      ...currentPage,
      entity: {},
    } as any);
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
          page: +pagination,
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

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    toast.success('Código copiado');
  };

  useEffect(() => {
    handleFetch({ ...currentPage, ...pagination });
    handleFetchAll();
  }, [pagination]);

  return (
    <EventContainer
      state={state}
      voucherState={voucher}
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
      clearFilterStatus={clearFilterStatus}
      handleOnSaveVoucher={handleOnSaveVoucher}
      eventState={event}
      handleFetchVoucher={handleFetchVoucher}
      onChangeFormInputVoucher={onChangeFormInputVoucher}
      formDataVoucher={formDataVoucher}
      formErrorsVoucher={formErrorsVoucher}
      copyToClipboard={copyToClipboard}
      isFormValidVoucher={isFormValidVoucher}
      handleOnShowDeleteProduct={handleOnShowDeleteProduct}
    />
  );
};
