import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';
import { ReportsContent } from './ui';

type UrlParams = {
  id: string;
};

export const ReportsScreen: React.FC = () => {
  const params = useParams<UrlParams>();

  const [event, setEvent] = React.useState({});
  const [eventChild, setEventChild] = React.useState([]);
  const [generalSale, setGeneralSale] = React.useState({});
  const [saleDate, setSaleDate] = React.useState({});

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

  useEffect(() => {
    handleGetReport();
    handleGetReportGeneral();
    handleGetSaleDate();
  }, []);

  return (
    <ReportsContent
      generalSale={generalSale}
      event={event}
      eventChild={eventChild}
      saleDate={saleDate}
    />
  );
};
