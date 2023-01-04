import React from 'react';
import { ReactComponent as Warning } from '@/assets/images/svg/warning.svg';

export const ReversePaymentContent: React.FC = (): JSX.Element => (
  <React.Fragment>
    <div className="exclude-container">
      <Warning color="#E64F49" />
      <div className="header-title-text modal__title">
        <h5 className="modal__confirmation-title">Você tem certeza que quer estornar esse item?</h5>
      </div>
      <div className="modal__confirmation-text">
        Ao estornar esse item, o valor será devolvido ao cliente.
      </div>
    </div>
  </React.Fragment>
);
