import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

interface StateProps {
  title: string;
  content: string;
}

interface DispatchProps {
  leftIcon(): JSX.Element;
}

type Props = StateProps & DispatchProps;

function LoteCollapse(props: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ marginBottom: '50px' }}>
        <div
          className="collapseTable d-flex justify-content-between collapseTableText"
          onClick={() => setOpen(!open)}
        >
          <div className="d-flex">
            <div className="iconTable">{props.leftIcon()}</div>
            <div className="normalText ">{props.title}</div>
          </div>
          <div>
            <svg
              className={`${open ? 'rotateSvg' : ''}`}
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

        <Collapse in={open}>
          <div className="collapseTable">
            <div className="subTitleMain collapseTableText">{props.content}</div>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default LoteCollapse;
