import React, { useState } from 'react';
import { Card, Collapse } from 'reactstrap';
// import { ModalConfirmation } from '../../Utils/Modal/ModalConfirmation';

interface CollapseCustomProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const CollapseCustom: React.FC<CollapseCustomProps> = ({
  title,
  children,
  className,
}): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="collapseTable d-flex justify-content-between collapseTableText"
        onClick={() => setOpen(!open)}
      >
        <div className="d-flex">{title}</div>
        <div>
          <svg
            className={`action-icon ${open ? 'rotateSvg' : ''}`}
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.88 0L8 6.10667L14.12 0L16 1.88L8 9.88L0 1.88L1.88 0Z" fill="#222222" />
          </svg>
        </div>
      </div>

      <Collapse isOpen={open}>
        <Card className={`${className}`}>{children}</Card>
      </Collapse>
    </>
  );
};
