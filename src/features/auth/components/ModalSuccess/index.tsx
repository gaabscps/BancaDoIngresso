import React from 'react';
import { Container } from 'reactstrap';
import { Button } from '@/components/Button';

interface SuccessContentProps {
  onGoToDashboard: () => void;
}

export const SuccessContent: React.FC<SuccessContentProps> = ({ onGoToDashboard }) => (
  <React.Fragment>
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0C22.3502 0 0 22.3502 0 50C0 77.6498 22.3502 100 50 100C77.6498 100 100 77.6498 100 50C100 22.3502 77.6498 0 50 0ZM74.1936 39.6313L44.5853 69.1244C43.6635 70.0462 42.5119 70.5067 41.3595 70.5067C40.207 70.5067 38.9397 70.0462 38.1336 69.1244L23.5021 54.6079C21.6586 52.7644 21.6586 49.8842 23.5021 48.0406C25.3456 46.1971 28.2258 46.1971 30.0693 48.0406L41.3595 59.3308L67.6267 33.0635C69.4702 31.22 72.3504 31.22 74.194 33.0635C75.9217 34.9078 75.9217 37.9028 74.194 39.6315L74.1936 39.6313Z"
            fill="#222222"
          />
        </svg>
      </div>
      <div className="forgotPasswordLabel" style={{ display: 'flex', justifyContent: 'center' }}>
        Senha alterada
      </div>
      <div className="subTitleMain" style={{ display: 'flex', justifyContent: 'center' }}>
        A sua senha foi alterada com sucesso
      </div>
    </Container>
    <div
      style={{
        marginTop: '120px',
        marginBottom: '30px',
        paddingLeft: '70px',
        paddingRight: '70px',
      }}
    >
      <Button
        className="mainButton"
        theme="red"
        size="lg"
        style={{ width: '100%' }}
        onClick={onGoToDashboard}
        title="Entrar e ir para Início"
      />
    </div>
  </React.Fragment>
);
