import React from 'react';
import { ReactComponent as Warning } from '@/assets/images/svg/warning.svg';
import { colors } from '@/styles/colors';

export const DeleteContent: React.FC = (): JSX.Element => (
  <React.Fragment>
    <div className="exclude-container">
      <Warning color={colors.red} />
      <div className="header-title-text modal__title">
        <h5 className="modal__confirmation-title">Você tem certeza que quer excluir este item?</h5>
      </div>
      <div className="modal__confirmation-text">
        Ao excluir este item o mesmo será excluído <strong>permanentemente</strong> do sistema, não
        podendo ser recuperado ou acessado novamente.
      </div>
    </div>
  </React.Fragment>
);
