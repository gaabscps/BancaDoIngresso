import React from 'react';
import { Switch } from 'react-router-dom';
import { Error404 } from '@/components';
import { AuthNavigation } from '@/features/auth/navigation';
import { DashboardNavigation } from '@/features/dashboard/navigation';
import { PdvNavigation } from '@/features/pdv/navigation';
import { PaymentGatewayNavigation } from '@/features/paymentGateway/navigation';
import { PosNavigation } from '@/features/pos/navigation';
import { PaymentMethodsNavigation } from '@/features/paymentMethods/navigation';
import { PdvProvider } from '@/features/pdv/hook/usePdv';
import { ProductsCombosNavigation } from '@/features/productsAndCombos/navigation';
import { ProductNavigation } from '@/features/product/navigation';
import { ContractorNavigation } from '@/features/contractor/navigation';
import { ComboNavigation } from '@/features/combo/navigation';
import { renderRoutes } from './utils';
import { Route } from './Route';
import { path } from './path';

const Navigation: React.FC = (): JSX.Element => {
  const authRoutes = renderRoutes(AuthNavigation);
  const dashboardRoutes = renderRoutes(DashboardNavigation);
  const pdvRoutes = renderRoutes(PdvNavigation);
  const posRoutes = renderRoutes(PosNavigation);
  const paymentMethodsRoutes = renderRoutes(PaymentMethodsNavigation);
  const paymentGatewayRoutes = renderRoutes(PaymentGatewayNavigation);
  const productsCombosRoutes = renderRoutes(ProductsCombosNavigation);
  const productRoutes = renderRoutes(ProductNavigation);
  const comboRoutes = renderRoutes(ComboNavigation);
  const CompanyRoutes = renderRoutes(ContractorNavigation);

  return (
    <PdvProvider>
      <Switch>
        {authRoutes}
        {dashboardRoutes}
        {pdvRoutes}
        {posRoutes}
        {paymentMethodsRoutes}
        {paymentGatewayRoutes}
        {productsCombosRoutes}
        {productRoutes}
        {comboRoutes}
        {CompanyRoutes}
        <Route path={path.Initial.All} component={Error404} />
      </Switch>
    </PdvProvider>
  );
};

export { Navigation };
