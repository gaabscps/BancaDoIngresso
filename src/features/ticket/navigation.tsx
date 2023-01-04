import React from 'react';
import { Route } from '@/navigation/Route';
import { TicketScreen } from '@/features/ticket/screens/List';

export const TICKET_ROUTES = {
  itself: '/dashboard/event/ticket/:id',
};

export const TicketNavigation = (): JSX.Element => (
  <Route exact path={TICKET_ROUTES.itself} component={TicketScreen} isPrivateRoute />
);
