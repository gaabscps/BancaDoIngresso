/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  GeneralCollectionContainer,
  ShouldShowModal,
  States,
} from '@/features/eventClose/screens/GeneralCollection/ui';
import { useLocation, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';
import { useDialog } from '@/hooks/useDialog';

export const GeneralCollectionScreen: React.FC = (): JSX.Element => {
  const { state: eventLocation } = useLocation();
  const { id: eventId } = useParams<{ id: string }>();
  const [state, setState] = useState<States>(States.default);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.infoGeneralCollection,
  );
  const [generalCollectionList, setGeneralCollectionList] = useState([]);
  const [generalCollectionDetailsList, setGeneralCollectionDetailsList] = useState([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const handleGetGeneralCollection = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/general-collection`);
      setGeneralCollectionList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetGeneralCollectionDetailsList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/general-collection/detail`);
      setGeneralCollectionDetailsList(data ?? []);
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
  }: {
    value: ShouldShowModal;
    newTitleModal: string;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    handleGetGeneralCollectionDetailsList();
  };

  useEffect(() => {
    handleGetGeneralCollection();
  }, []);

  return (
    <GeneralCollectionContainer
      state={state}
      eventLocation={eventLocation}
      generalCollectionList={generalCollectionList}
      generalCollectionDetailsList={generalCollectionDetailsList}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onShouldShowModal={handleOnShouldShowModal}
      shouldShowModal={shouldShowModal}
    />
  );
};
