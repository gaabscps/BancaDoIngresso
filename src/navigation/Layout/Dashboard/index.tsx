import React from 'react';
import { Header, Sidebar, Footer } from '@/components';

interface DefaultProps {
  children: React.ReactNode;
}

export const Dashboard: React.FC<DefaultProps> = ({ children }) => (
  <div className="page-wrapper compact-wrapper" id="pageWrapper">
    <Header />

    <div className="page-body-wrapper sidebar-icon">
      <Sidebar />

      <div className="page-body" style={{ minHeight: '100vh' }}>
        {children}
      </div>

      <Footer />
    </div>
  </div>
);
