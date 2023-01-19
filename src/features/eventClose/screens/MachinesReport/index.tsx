/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { MachinesReportContainer, States } from '@/features/eventClose/screens/MachinesReport/ui';
import { useLocation, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';

export const MachinesReportScreen: React.FC = (): JSX.Element => {
  const { state: eventLocation } = useLocation();
  const { id: eventId } = useParams<{ id: string }>();
  const [state, setState] = useState<States>(States.default);

  const [machinesReportList, setMachinesReportList] = useState([]);
  const [machinesReportFooter, setMachinesReportFooter] = useState([]);

  const handleGetMachinesReport = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/machines/ticket-sales`);
      setMachinesReportList(data.machinesReports ?? []);
      setMachinesReportFooter(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  useEffect(() => {
    handleGetMachinesReport();
  }, []);

  return (
    <MachinesReportContainer
      state={state}
      eventLocation={eventLocation}
      machinesReportList={machinesReportList}
      machinesReportFooter={machinesReportFooter}
    />
  );
};
