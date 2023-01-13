import React from 'react';
import { Route } from '@/navigation/Route';
import { HomeEventCloseScreen } from '@/features/eventClose/screens/Home';
import { GeneralCollectionScreen } from './screens/GeneralCollection';
import { IncomeScreen } from './screens/Income';
import { IncomeManualEntriesScreen } from './screens/incomeManualEntries';
import { ExpenseManualEntriesScreen } from './screens/Expense';

export const EVENTCLOSE_ROUTES = {
  itself: '/dashboard/event-close/:id',
  generalCollection: '/dashboard/event-close/general-collection/:id',
  income: '/dashboard/event-close/income/:id',
  incomeManualEntries: '/dashboard/event-close/income/:id/manual-entries',
  expense: '/dashboard/event-close/expense/:id',
  machines: '/dashboard/event-close/machines/:id',
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
  </>
);
