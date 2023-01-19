import React from 'react';
import { Route } from '@/navigation/Route';
import { HomeEventCloseScreen } from '@/features/eventClose/screens/Home';
import { GeneralCollectionScreen } from './screens/GeneralCollection';
import { IncomeScreen } from './screens/Income';
import { IncomeManualEntriesScreen } from './screens/incomeManualEntries';
import { ExpenseManualEntriesScreen } from './screens/Expense';
import { HomeMachineEventCloseScreen } from './screens/HomeMachine';
import { MachinesTicketSalesScreen } from './screens/MachinesTicketSales';
import { MachinesProductSalesScreen } from './screens/MachinesProductSales';
import { MachinesReportScreen } from './screens/MachinesReport';

export const EVENTCLOSE_ROUTES = {
  itself: '/dashboard/event-close/:id',
  generalCollection: '/dashboard/event-close/general-collection/:id',
  income: '/dashboard/event-close/income/:id',
  incomeManualEntries: '/dashboard/event-close/income/:id/manual-entries',
  expense: '/dashboard/event-close/expense/:id',
  machines: '/dashboard/event-close/machines/:id',
  machinesTicketSales: '/dashboard/event-close/machines/ticket-sales/:id',
  machinesProductSale: '/dashboard/event-close/machines/product-sale/:id',
  machinesReport: '/dashboard/event-close/machines/report/:id',

  finalSettlement: '/dashboard/event-close/final-settlement/:id',
};

export const EventCloseNavigation = (): JSX.Element => (
  <>
    <Route exact path={EVENTCLOSE_ROUTES.itself} component={HomeEventCloseScreen} isPrivateRoute />
    <Route
      exact
      path={EVENTCLOSE_ROUTES.generalCollection}
      component={GeneralCollectionScreen}
      isPrivateRoute
    />
    <Route exact path={EVENTCLOSE_ROUTES.income} component={IncomeScreen} isPrivateRoute />
    <Route
      exact
      path={EVENTCLOSE_ROUTES.incomeManualEntries}
      component={IncomeManualEntriesScreen}
      isPrivateRoute
    />
    <Route
      exact
      path={EVENTCLOSE_ROUTES.expense}
      component={ExpenseManualEntriesScreen}
      isPrivateRoute
    />
    <Route
      exact
      path={EVENTCLOSE_ROUTES.machines}
      component={HomeMachineEventCloseScreen}
      isPrivateRoute
    />
    <Route
      exact
      path={EVENTCLOSE_ROUTES.machinesTicketSales}
      component={MachinesTicketSalesScreen}
      isPrivateRoute
    />
    <Route
      exact
      path={EVENTCLOSE_ROUTES.machinesProductSale}
      component={MachinesProductSalesScreen}
      isPrivateRoute
    />
    <Route
      exact
      path={EVENTCLOSE_ROUTES.machinesReport}
      component={MachinesReportScreen}
      isPrivateRoute
    />
  </>
);
