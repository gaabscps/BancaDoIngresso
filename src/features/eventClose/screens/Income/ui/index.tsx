import React, { Fragment } from 'react';
import { Dialog, Loading } from '@/components';
import { Container } from 'reactstrap';
import './style.scss';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { colors } from '@/styles/colors';
import { CustomTable } from '@/components/Table';
import { ReactComponent as Info } from '@/assets/images/svg/infoCircle.svg';
// import dayjs from 'dayjs';
import EventCloseIncome from '@/model/EventCloseIncome';
// import { GeneralCollectionDetailsContent } from '@/features/eventClose/components/GeneralCollectionDetailsContent';
// import EventCloseGeneralCollectionDetail from '@/model/EventCloseGeneralCollectionDetail';
import { FooterCustom } from '@/components/FooterCustom';
import { columnsIncomeDetails } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface IncomeProps {
  state: States;
  eventLocation: any;
  incomeList: EventCloseIncome[];
  incomeFooter: any;
  incomeDetailsList: any[];
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  onToggle: () => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    income,
  }: {
    value: ShouldShowModal;
    newTitleModal: string;
    income: any;
  }) => void;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  infoIncome = 'infoIncome',
}

export const IncomeContainer: React.FC<IncomeProps> = ({
  state,
  eventLocation,
  incomeList,
  incomeFooter,
  shouldShowModal,
  title,
  visible,
  onToggle,
}) => {
  const history = useHistory();
  const { id: eventId } = useParams<{ id: string }>();
  const dataTableIncome = incomeList?.map((item: any, index) => ({
    id: index,
    item: index < 10 ? `0${index + 1}` : index + 1,
    description: item.description,
    value: item?.value?.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
    actions: item.isIncome ? (
      <Info
        className="svg-icon action-icon"
        onClick={(): void => {
          history.push(
            `${process.env.PUBLIC_URL}/dashboard/event-close/income/${eventId}/manual-entries`,
          );
        }}
      />
    ) : (
      ''
    ),
  }));

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        position="center"
        isContentWithCard={false}
        actions={[]}
      >
        {
          {
            [ShouldShowModal.infoIncome]: (
              <h1>Welcome income</h1>
              // <GeneralCollectionDetailsContent incomeDetailsList={incomeDetailsList} />
            ),
          }[shouldShowModal]
        }
      </Dialog>
      <Container className="mainContainer" fluid={true}>
        <div className="pageTitle d-flex mb-5">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/${eventId}`}>
            <ArrowLeft color={colors.black} className="arrow-left" />
          </Link>
          <h5 className="ml-3 mb-0 mt-2 pageTitle">Receitas {eventLocation?.event?.name}</h5>
        </div>
        <CustomTable
          columns={columnsIncomeDetails}
          data={dataTableIncome}
          numberRowsPerPage={10}
          theme="primary"
          progressPending={state === States.loading}
        />
      </Container>
      <FooterCustom
        data={[
          {
            title: 'Totais de ítens:',
            value: incomeFooter?.amount || 'Dado não encontrado',
          },
          {
            title: 'Total de receitas:',
            value:
              incomeFooter?.totalValue?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }) || 'Dado não encontrado',
          },
        ]}
      />
    </Fragment>
  );
};
