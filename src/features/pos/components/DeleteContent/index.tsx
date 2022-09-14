import React from 'react';
import { ReactComponent as Warning } from '@/assets/images/svg/warning.svg';
import { Button } from '@/components/Button';

interface DeleteContentProps {
  id: string;
  onSubmit: (value: any) => Promise<void>;
  onClose: () => void;
}

export const DeleteContent: React.FC<DeleteContentProps> = ({ id, onSubmit, onClose }) => (
  <>
    <div className="exclude-container">
      <Warning color="#E64F49" />
      <div className="header-title-text modal__title">
        <h5 className="modal__confirmation-title">Você tem certeza que quer excluir este item?</h5>
      </div>
      <div className="modal__confirmation-text">
        Ao excluir este item o mesmo será excluído <strong>permanentemente</strong> do sistema, não
        podendo ser recuperado ou acessado novamente.
      </div>
    </div>
    <div className="exclude-button">
      <div style={{ color: '#fff' }}>
        <Button
          title="Não, quero manter"
          theme="noneBorder"
          size="sm"
          style={{ height: '50px', marginRight: '20px' }}
          onClick={onClose}
        />
      </div>
      <Button
        title="Sim, quero remover"
        theme="dark"
        size="sm"
        onClick={() => onSubmit(id)}
      ></Button>
    </div>
  </>
);
