/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDialog } from '@/hooks/useDialog';
import api, { AxiosError } from '@/services/api';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/combo/components/FilterContent';
import OrderTicket from '@/model/OrderTicket';
import OrderItemComment from '@/model/OrderItemComment';
import OrderTicketDetail from '@/model/OrderTicketDetail';
import { TicketContainer, ShouldShowModal, States } from './ui';
import { FormInputComment } from '../../components/RegisterCommentContent';
import { TicketCommentController, TicketRequestParams, TicketResponse } from '../../types';
import { ReversePaymentContent } from '../../components/ReversePaymentContent';
import { CancelContent } from '../../components/CancelContent';

type UrlParams = {
  id: string;
};

export const TicketScreen: React.FC = (): JSX.Element => {
  const params = useParams<UrlParams>();
  const [state, setState] = useState<States>(States.default);
  const [listTickets, setListTickets] = useState<OrderTicket[]>([]);
  const [orderTicket, setOrderTicket] = useState<OrderTicket>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.filter);
  const [currentPage, setCurrentPage] = useState<TicketRequestParams>({
    page: 1,
    pageSize: 10,
  });
  const [comments, setComments] = useState<OrderItemComment[]>([]);
  const [ticketDetail, setTicketDetail] = useState<OrderTicketDetail>();
  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmReversePayment = useConfirmDelete();
  const confirmDelete = useConfirmDelete();

  const handleOnShouldShowModal = async ({
    value,
    newTitleModal,
    orderTicket: orderTicketSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    orderTicket?: OrderTicket;
  }): Promise<void> => {
    if (orderTicketSelected?.orderItemId && value === ShouldShowModal.comment) {
      setOrderTicket(orderTicketSelected);
      await handleFetchComment(orderTicketSelected);
    } else if (orderTicketSelected?.orderItemId && value === ShouldShowModal.detail) {
      setOrderTicket(orderTicketSelected);
      await handleFetchDetail(orderTicketSelected);
    }
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();
  };

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

  const {
    formData: formDataComment,
    formErrors: formErrorsComment,
    onChangeFormInput: onChangeFormInputComment,
    isFormValid: isFormValidComment,
    resetForm: resetFormComment,
  } = useForm({
    initialData: {
      comment: '',
    },
    validators: {
      comment: [validators.required],
    },
  });

  const handleFetch = async (requestParams: TicketRequestParams): Promise<void> => {
    if (params.id) {
      try {
        setState(States.loading);
        const { data } = await api.post<TicketResponse>(`/ticket/${params.id}/find`, requestParams);
        if (data) {
          setListTickets(data.list ? data.list : []);
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
    }
  };

  const handleFetchComment = async (selectedOrderTicket: OrderTicket): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<OrderItemComment[]>(
        `/ticket/${params.id}/comment/${selectedOrderTicket.orderItemId}`,
      );
      setComments(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFetchDetail = async (selectedOrderTicket: OrderTicket): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<OrderTicketDetail>(
        `/ticket/${params.id}/ticket/${selectedOrderTicket.orderItemId}`,
      );
      setTicketDetail(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnAddComment = async (): Promise<void> => {
    try {
      if (isFormValidComment()) {
        setState(States.loading);
        const payload = {
          comment: formDataComment[FormInputComment.comment],
        } as OrderItemComment;
        await api.post(`/ticket/${params.id}/comment/${orderTicket?.orderItemId}`, payload);
        await handleFetchComment(orderTicket as OrderTicket);
        await handleFetch(currentPage);
        toast.success('Comentário adcionado com sucesso!');
        resetFormComment();
        onToggle();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const controllerComment: TicketCommentController = {
    orderTicket,
    comments,
    formData: formDataComment,
    formErrors: formErrorsComment,
    onChange: onChangeFormInputComment,
    onAdd: handleOnAddComment,
  };

  const handleOnCloseReversePayment = (): void => confirmReversePayment.hide();

  const handleOnConfirmReversePayment = async (orderTicketSelected: OrderTicket): Promise<void> => {
    try {
      setState(States.loading);
      await api.patch(`/ticket/${params.id}/reverse/${orderTicketSelected.orderItemId}`);
      toast.success('Ingresso extornado com sucesso!');
      handleOnCloseReversePayment();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnShowReversePayment = (orderTicketSelected: OrderTicket): void => {
    confirmDelete.show({
      title: '',
      children: <ReversePaymentContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => handleOnClose(),
        },
        {
          title: 'Sim, quero estornar',
          onClick: (): Promise<void> => handleOnConfirmReversePayment(orderTicketSelected),
        },
      ],
    });
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmCancelTicket = async (orderTicketSelected: OrderTicket): Promise<void> => {
    try {
      setState(States.loading);
      await api.patch(`/ticket/${params.id}/cancel/${orderTicketSelected.orderItemId}`);
      toast.success('Ingresso cancelado com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnShowCancelTicket = (orderTicketSelected: OrderTicket): void => {
    confirmDelete.show({
      title: '',
      children: <CancelContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => handleOnClose(),
        },
        {
          title: 'Sim, quero cancelar',
          onClick: (): Promise<void> => handleOnConfirmCancelTicket(orderTicketSelected),
        },
      ],
    });
  };

  const handleOnFilter = async (): Promise<void> => {
    try {
      if (isFormValidFilter()) {
        const page = {} as OrderTicket;

        const filter = formDataFilter[FormInputNameToFilter.filterSearch];
        const value = formDataFilter[FormInputNameToFilter.inputSearch];

        const entity = {
          ...page,
          [filter]: filter === 'cpf' || filter === 'cellPhone' ? value.replace(/\D/g, '') : value,
        } as OrderTicket;

        const newPage: TicketRequestParams = {
          ...currentPage,
          entity,
        };
        onToggle();
        await handleFetch(newPage);
      }
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

  const clearFilter = async (): Promise<void> => {
    resetFormFilter();
    await handleFetch({
      ...currentPage,
      entity: {},
    } as TicketRequestParams);
    onToggle();
  };

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <TicketContainer
      state={state}
      title={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      listTickets={listTickets}
      currentPage={currentPage}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      controllerComment={controllerComment}
      ticketDetail={ticketDetail as OrderTicketDetail}
      onShouldShowModal={handleOnShouldShowModal}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShowReversePayment={handleOnShowReversePayment}
      onShowCancelTicket={handleOnShowCancelTicket}
      onFilter={handleOnFilter}
      clearFilter={clearFilter}
    />
  );
};
