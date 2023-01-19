/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  MachinesProductSalesContainer,
  States,
} from '@/features/eventClose/screens/MachinesProductSales/ui';
import { useLocation, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';

export const MachinesProductSalesScreen: React.FC = (): JSX.Element => {
  const { state: eventLocation } = useLocation();
  const { id: eventId } = useParams<{ id: string }>();
  const [state, setState] = useState<States>(States.default);

  const [machinesProductSalesList, setMachinesProductSalesList] = useState([]);
  const [machinesProductSalesFooter, setMachinesProductSalesFooter] = useState([]);

  const handleGetMachinesProductSales = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/machines/ticket-sales`);
      setMachinesProductSalesList(data.machinesProductSaless ?? []);
      setMachinesProductSalesFooter(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  useEffect(() => {
    handleGetMachinesProductSales();
  }, []);

  return (
    <MachinesProductSalesContainer
      state={state}
      eventLocation={eventLocation}
      machinesProductSalesList={machinesProductSalesList}
      machinesProductSalesFooter={machinesProductSalesFooter}
    />
  );
};
