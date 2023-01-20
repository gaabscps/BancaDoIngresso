/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import { SectorProductContainer, States } from '@/features/registerEvent/screens/SectorProduct/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import EventGroupSubgroup from '@/model/EventGroupSubgroup';
import api from '@/services/api';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductGroup from '@/model/ProductGroup';
import ProductSectionEvent from '@/model/SectionProductEvent';
import { formSectorProductProps } from './types';
import { useEvent } from '../../hook/useEvent';
import { controllerEventProps } from '../SectorTicket/types';

type UrlParams = {
  id: string;
};
export const SectorProductScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [lastStep, setLastStep] = useState<any>([]);
  const [groupOptions, setGroupOptions] = useState<ProductGroup[]>([]);
  const [sectionList, setSectionList] = useState<ProductSectionEvent[]>([]);
  const [sectorConfig, setSectorConfig] = useState<any[]>([]);

  const params = useParams<UrlParams>();
  const { eventState, onChange: onChangeEvent } = useEvent();

  const {
    formData: formDataSectorProduct,
    formErrors: formErrorsSectorProduct,
    isFormValid: isFormValidSectorProduct,
    onChangeFormInput: onChangeFormInputSectorProduct,
  } = useForm({
    initialData: {
      isProduct: '',
    },
    validators: {
      isProduct: [validators.required],
    },
    formatters: {},
  });

  const handleGetFirstStep = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<EventGroupSubgroup[]>(`/event/section-product/${id}/group`);

      if (data || []) {
        if (data && data.length > 0) {
          onChangeFormInputSectorProduct('isProduct')('true');
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };
  const handleGetLastStep = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<any>(`/event/section-product/${id}/pos`);

      if (data || []) {
        if (data && data.length > 0) {
          setLastStep(data);
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetGroupList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`event/section-product/${params.id}/group`);

      setGroupOptions(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetSectorConfigList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/section-product/${params.id}/product/section`);

      setSectorConfig(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetPosSectionList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/section-product/${params.id}/section`);

      setSectionList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const controllerFormSectorProduct: formSectorProductProps = {
    formData: formDataSectorProduct,
    formErrors: formErrorsSectorProduct,
    onChangeFormInput: onChangeFormInputSectorProduct,
    isFormValidSectorProduct,
  };

  const controllerEvent: controllerEventProps = {
    eventState,
    onChangeEvent,
    lastStep,
    groupOptions,
    handleGetGroupList,
    sectionList,
    handleGetPosSectionList,
    sectorConfig,
    handleGetSectorConfigList,
  };

  useEffect(() => {
    handleGetFirstStep(params.id);
    handleGetLastStep(params.id);
    handleGetGroupList();
  }, []);

  return (
    <SectorProductContainer
      controllerEvent={controllerEvent}
      formSectorProduct={controllerFormSectorProduct}
      state={state}
    />
  );
};
