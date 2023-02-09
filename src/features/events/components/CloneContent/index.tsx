import React from 'react';

interface StateProps {
  title: string;
}

export const CloneContent: React.FC<StateProps> = ({ title }): JSX.Element => (
  <React.Fragment>
    <div className="exclude-container">
      <div className="header-title-text modal__title">
        <h5 className="modal__confirmation-title">{`Você tem certeza que quer clonar o evento “${title}”?`}</h5>
      </div>
    </div>
  </React.Fragment>
);
