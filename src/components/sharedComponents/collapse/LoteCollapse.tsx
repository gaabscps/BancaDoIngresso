import React, { useState } from 'react';
import { Card, Collapse } from 'reactstrap';
// import { CustomTable, TableColumn } from '../../Utils/Table';
// import { mockSubPdv } from '../../Utils/Table/mock';
import { ReactComponent as Pen } from '../../../assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '../../../assets/images/svg/lixeira.svg';
import { ReactComponent as SubPdvIcon } from '../../../assets/images/svg/subPDV.svg';
// import { ModalConfirmation } from '../../Utils/Modal/ModalConfirmation';

interface StateProps {
  title: string;
  onShowEditSubPdv: (value: any) => Promise<void>;
  onShowDeleteSubPdv: (value: any) => Promise<void>;
  dataList?: any;
  content: string;
  // idPdv: string;
}

// interface DispatchProps {}

type Props = StateProps;

// interface DataRow {
//   image: string;
//   pdvName: string;
//   address: string;
//   city: string;
//   state: string;
//   actions: string;
//   status: string;
//   dataSecundary: void;
// }

// const columnsSubPdvList: TableColumn<DataRow>[] = [
//   {
//     name: 'Usuário',
//     selector: (row: { pdvName: any }) => row.pdvName,
//   },
// ];

// const dataSubPdv = mockSubPdv.map((item: { id: number; user: string }) => ({
//   id: item.id,
// }));

function LoteCollapse(props: Props): JSX.Element {
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

      <Collapse isOpen={open}>
        {props.dataList.map((item: any, index: any) => (
          <Card className="subpdv-main-container card-container" key={item.id}>
            <div className="supdv-title-flex">
              <div className="subpdv-title-container">
                <p className="subpdv-title subpdv-title-index">Sub PDV’s #{String(index)} </p>
                <p className="subpdv-title subpvd-title-name">• {item.name}</p>
              </div>
              <div className="subpdv-icon-container">
                <Pen onClick={() => props.onShowEditSubPdv(item.id)} className="mr-2 svg-icon" />
                <Trash
                  onClick={() => props.onShowDeleteSubPdv(item.id)}
                  className="mr-2 svg-icon"
                />
              </div>
            </div>
            {/* <CustomTable theme={'secundary'} columns={columnsSubPdvList} data={dataSubPdv} /> */}
          </Card>
        ))}
      </Collapse>
    </>
  );
}
// Para voltar collapse vazio basta retirar a tag <card> inteira
export default LoteCollapse;
