import React, { useState } from 'react';
import { Card, Collapse } from 'reactstrap';
import SubPdv from '@/model/SubPdv';
import { ReactComponent as Pen } from '../../../assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '../../../assets/images/svg/lixeira.svg';
import { ReactComponent as SubPdvIcon } from '../../../assets/images/svg/subPDV.svg';
// import { ModalConfirmation } from '../../Utils/Modal/ModalConfirmation';

interface LoteCollapseProps {
  title: string;
  onShowEditSubPdv: (subPdv: SubPdv) => void;
  onShowDeleteSubPdv: (subPdv: SubPdv) => void;
  dataList?: any;
}

const LoteCollapse: React.FC<LoteCollapseProps> = ({
  title,
  onShowDeleteSubPdv,
  onShowEditSubPdv,
  dataList,
}): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="collapseTable d-flex justify-content-between collapseTableText"
        onClick={() => setOpen(!open)}
      >
        <div className="d-flex">
          <div className="iconTable">
            <SubPdvIcon />
          </div>
          <div className="normalText ">{title}</div>
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

      <Collapse isOpen={open}>
        {dataList.map((item: any, index: any) => (
          <Card className="subpdv-main-container card-container" key={item.id}>
            <div className="supdv-title-flex">
              <div className="subpdv-title-container">
                <p className="subpdv-title subpdv-title-index">Sub PDV’s #{String(index)} </p>
                <p className="subpdv-title subpvd-title-name">• {item.name}</p>
              </div>
              <div className="subpdv-icon-container">
                <Pen onClick={() => onShowEditSubPdv(item)} className="mr-2 svg-icon" />
                <Trash onClick={() => onShowDeleteSubPdv(item)} className="mr-2 svg-icon" />
              </div>
            </div>
          </Card>
        ))}
      </Collapse>
    </>
  );
};
export default LoteCollapse;
