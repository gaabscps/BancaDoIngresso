import React from 'react';
import { Switch } from 'react-router-dom';
import { Error404 } from '@/components';
import { AuthNavigation } from '@/features/auth/navigation';
import { DashboardNavigation } from '@/features/dashboard/navigation';
import { PdvNavigation } from '@/features/pdv/navigation';
import { PaymentGatewayNavigation } from '@/features/paymentGateway/navigation';
import { PosNavigation } from '@/features/pos/navigation';
import { PaymentMethodsNavigation } from '@/features/paymentMethods/navigation';
import { GroupSubgroupProductNavigation } from '@/features/groupSubgroupProduct/navigation';
import { PdvProvider } from '@/features/pdv/hook/usePdv';
import { ProductsCombosNavigation } from '@/features/productsAndCombos/navigation';
import { ProductNavigation } from '@/features/product/navigation';
import { ContractorNavigation } from '@/features/contractor/navigation';
import { ComboNavigation } from '@/features/combo/navigation';
import { UserNavigation } from '@/features/usersAndGroups/screens/navigation';
import { ModuleNavigation } from '@/features/module/screens/navigation';
import { PermissionNavigation } from '@/features/permission/screens/navigation';
import { MenuNavigation } from '@/features/menu/screens/navigation';
import { SubMenuNavigation } from '@/features/submenu/screens/navigation';
import { RegisterEventNavigation } from '@/features/registerEvent/navigation';
import { EventsNavigation } from '@/features/events/navigation';
import { EventProvider } from '@/features/registerEvent/hook/useEvent';
import { renderRoutes } from './utils';
import { Route } from './Route';
import { path } from './path';

const Navigation: React.FC = (): JSX.Element => {
  const authRoutes = renderRoutes(AuthNavigation);
  const dashboardRoutes = renderRoutes(DashboardNavigation);
  const eventsRoutes = renderRoutes(EventsNavigation);
  const moduleRoutes = renderRoutes(ModuleNavigation);
  const permissionRoutes = renderRoutes(PermissionNavigation);
  const menuRoutes = renderRoutes(MenuNavigation);
  const subMenuRoutes = renderRoutes(SubMenuNavigation);
  const userRoutes = renderRoutes(UserNavigation);
  const pdvRoutes = renderRoutes(PdvNavigation);
  const posRoutes = renderRoutes(PosNavigation);
  const paymentMethodsRoutes = renderRoutes(PaymentMethodsNavigation);
  const paymentGatewayRoutes = renderRoutes(PaymentGatewayNavigation);
  const productsCombosRoutes = renderRoutes(ProductsCombosNavigation);
  const productRoutes = renderRoutes(ProductNavigation);
  const comboRoutes = renderRoutes(ComboNavigation);
  const GroupSubgroupProductRoutes = renderRoutes(GroupSubgroupProductNavigation);
  const CompanyRoutes = renderRoutes(ContractorNavigation);
  const RegisterEventRoutes = renderRoutes(RegisterEventNavigation);

  return (
    <EventProvider>
      <PdvProvider>
        <Switch>
          {authRoutes}
          {dashboardRoutes}
          {moduleRoutes}
          {permissionRoutes}
          {menuRoutes}
          {subMenuRoutes}
          {userRoutes}
          {pdvRoutes}
          {posRoutes}
          {paymentMethodsRoutes}
          {paymentGatewayRoutes}
          {productsCombosRoutes}
          {productRoutes}
          {comboRoutes}
          {GroupSubgroupProductRoutes}
          {CompanyRoutes}
          {RegisterEventRoutes}
          <Route path={path.Initial.All} component={Error404} />
        </Switch>
      </PdvProvider>
    </EventProvider>
  );
};

export { Navigation };
