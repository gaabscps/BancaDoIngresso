import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

interface StateProps {
  title: string;
  content: string | React.ReactNode;
  count?: number;
  showButtonOnTitle?: boolean;
  buttonTitle?: string;
}

interface DispatchProps {
  leftIcon(): JSX.Element;
  buttonAction?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  className?: string;
  disabled?: boolean;
}

type Props = StateProps & DispatchProps;

function SuperCollapse(props: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  const getCount = (): string => ` (${props.count})`;

  return (
    <>
      <div style={{ marginBottom: '50px' }}>
        <div
          className={`collapseTable d-flex justify-content-between collapseTableText ${
            props.disabled ? 'collapse-disabled' : ''
          } ${props.className} ${open ? ' border-bottom-collapse' : ''}`}
          onClick={() => setOpen(!open)}
        >
          <div className="d-flex">
            <div className="iconTable">{props.leftIcon()}</div>
            <div className={`normalText ${props.disabled ? 'disable-text' : ''}`}>
              {props.title}{' '}
              {props.count && props.count >= 0 && (
                <span style={{ fontWeight: 'bold' }}>{getCount()}</span>
              )}
            </div>
          </div>
          <div>
            {props.showButtonOnTitle && props.buttonTitle && props.buttonAction && (
              <button
                className="btn button-dark collapse-title-button"
                type="button"
                onClick={e =>
                  props.buttonAction
                    ? (props.buttonAction(e), e.stopPropagation())
                    : e.stopPropagation()
                }
              >
                {props.buttonTitle}
              </button>
            )}
            <svg
              className={`${open ? 'rotateSvg' : ''} ${props.disabled ? 'disable-text' : ''}`}
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

        <Collapse in={open} className={open ? 'show' : ''}>
          <div className="collapseTable">
            <div className="subTitleMain collapseTableText">{props.content}</div>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default SuperCollapse;
