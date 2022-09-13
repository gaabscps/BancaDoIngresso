import React from 'react';
import { Container, Label } from 'reactstrap';

interface PdvContainerProps {
  document: string;
  onShowRegister: () => void;
}

export const PdvContainer: React.FC<PdvContainerProps> = ({ document, onShowRegister }) => (
  <Container className="mainContainer" fluid={true}>
    <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
      <div style={{ display: 'grid' }}>
        <Label className="pageTitle" onClick={onShowRegister}>
          PDV {document}
        </Label>
      </div>
    </div>
  </Container>
);
