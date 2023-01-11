/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { IncomeContainer, ShouldShowModal, States } from '@/features/eventClose/screens/Income/ui';
import { useLocation, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';
import { useDialog } from '@/hooks/useDialog';

export const IncomeScreen: React.FC = (): JSX.Element => {
  const { state: eventLocation } = useLocation();
  const { id: eventId } = useParams<{ id: string }>();
  const [state, setState] = useState<States>(States.default);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.infoIncome,
  );
  const [incomeList, setIncomeList] = useState([]);
  const [incomeDetailsList, setIncomeDetailsList] = useState([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const handleGetIncome = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/income`);
      setIncomeList(data.incomes ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetIncomeDetailsList = async (income: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/income/${income.id}`);
      setIncomeDetailsList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    income,
  }: {
    value: ShouldShowModal;
    newTitleModal: string;
    income: any;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    handleGetIncomeDetailsList(income);
  };

  useEffect(() => {
    handleGetIncome();
  }, []);

  return (
    <IncomeContainer
      state={state}
      eventLocation={eventLocation}
      incomeList={incomeList}
      incomeDetailsList={incomeDetailsList}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onShouldShowModal={handleOnShouldShowModal}
      shouldShowModal={shouldShowModal}
    />
  );
};
