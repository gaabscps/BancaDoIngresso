/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  MachinesTicketSalesContainer,
  States,
} from '@/features/eventClose/screens/MachinesTicketSales/ui';
import { useLocation, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';

export const MachinesTicketSalesScreen: React.FC = (): JSX.Element => {
  const { state: eventLocation } = useLocation();
  const { id: eventId } = useParams<{ id: string }>();
  const [state, setState] = useState<States>(States.default);

  const [machinesTicketSalesList, setMachinesTicketSalesList] = useState([]);
  const [machinesTicketSalesFooter, setMachinesTicketSalesFooter] = useState([]);

  const handleGetMachinesTicketSales = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/machines/ticket-sales`);
      setMachinesTicketSalesList(data.machinesTicketSaless ?? []);
      setMachinesTicketSalesFooter(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  useEffect(() => {
    handleGetMachinesTicketSales();
  }, []);

  return (
    <MachinesTicketSalesContainer
      state={state}
      eventLocation={eventLocation}
      machinesTicketSalesList={machinesTicketSalesList}
      machinesTicketSalesFooter={machinesTicketSalesFooter}
    />
  );
};
