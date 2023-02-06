import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';
import { useDialog } from '@/hooks/useDialog';
import useForm from '@/hooks/useForm';
import { FormInputName as FormInputNameToFilter } from '@/features/reports/components/FilterContent';
import { ReportsContent, ShouldShowModal } from './ui';
import { ControllerFormProps, ControllerModalProps } from '../types';

type UrlParams = {
  id: string;
};

export const ReportsScreen: React.FC = () => {
  const params = useParams<UrlParams>();

  const [event, setEvent] = useState({});
  const [filter, setFilter] = useState({
    filterSearch: '',
    inputSearch: '',
    lastDate: '',
  });
  const [eventChild, setEventChild] = useState([]);
  const [generalSale, setGeneralSale] = useState({});
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.filter);
  const [saleDate, setSaleDate] = React.useState({});
  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    resetForm: resetFormFilter,
    onChangeFormInput: onChangeFormInputFilter,
    // isFormValid: isFormValidFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
      lastDate: '',
    },
  });

  const handleGetReport = async (): Promise<void> => {
    try {
      const { data } = await api.get(`event/report/${params.id}`);
      if (data) {
        setEvent(data.event);
        setEventChild(data.child);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };
  const handleGetReportGeneral = async (): Promise<void> => {
    try {
      const { data } = await api.get(`event/report/${params.id}/general`);
      if (data) {
        setGeneralSale(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };
  const handleGetSaleDate = async (): Promise<void> => {
    try {
      const { data } = await api.get(`event/report/${params.id}/sale-date`);
      if (data) {
        setSaleDate(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnFilter = async (): Promise<void> => {
    try {
      // if (isFormValidFilter()) {
      // const payload =
      //   {
      //     name: {
      //       entity: {
      //         name: formDataFilter[FormInputNameToFilter.inputSearch],
      //       },
      //     },
      //     city: {
      //       entity: {
      //         address: {
      //           city: formDataFilter[FormInputNameToFilter.inputSearch],
      //         },
      //       },
      //     },
      //   }[formDataFilter[FormInputNameToFilter.filterSearch]] || {};

      onToggle();
      await handleGetReport();
      // ({
      //   ...currentPage,
      //   ...payload,
      // });
      setFilter({
        filterSearch: formDataFilter[FormInputNameToFilter.filterSearch],
        inputSearch: formDataFilter[FormInputNameToFilter.inputSearch],
        lastDate:
          formDataFilter[FormInputNameToFilter.lastDate] &&
          formDataFilter[FormInputNameToFilter.lastDate],
      });
      console.log(filter);
      // }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const clearFilter = async (): Promise<void> => {
    resetFormFilter();
    setFilter({
      filterSearch: '',
      inputSearch: '',
      lastDate: '',
    });
    await handleGetReport();
    if (visible) {
      onToggle();
    }
  };

  const handleOnShouldShowModal = ({
    value,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
  }): void => {
    setShouldShowModal(value);
  };

  const controllerModal: ControllerModalProps = {
    visible,
    onToggle,
    onChangeTitle,
    title,
    shouldShowModal,
  };

  const controllerFormFilter: ControllerFormProps = {
    formDataFilter,
    formErrorsFilter,
    onChangeFormInputFilter,
    clearFilter,
    OnFilter: handleOnFilter,
    resetFormFilter,
  };

  useEffect(() => {
    handleGetReport();
    handleGetReportGeneral();
    handleGetSaleDate();
  }, []);

  return (
    <ReportsContent
      onShouldShowModal={handleOnShouldShowModal}
      shouldShowModal={shouldShowModal}
      generalSale={generalSale}
      event={event}
      eventChild={eventChild}
      saleDate={saleDate}
      controllerModal={controllerModal}
      controllerFormFilter={controllerFormFilter}
      filter={filter}
    />
  );
};
