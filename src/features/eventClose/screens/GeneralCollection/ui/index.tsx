import React, { Fragment } from 'react';
import { Dialog, Loading } from '@/components';
import { Container } from 'reactstrap';
import './style.scss';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { colors } from '@/styles/colors';
import { CustomTable } from '@/components/Table';
import { ReactComponent as Info } from '@/assets/images/svg/infoCircle.svg';
import dayjs from 'dayjs';
import EventCloseGeneralCollection from '@/model/EventCloseGeneralCollection';
import { GeneralCollectionDetailsContent } from '@/features/eventClose/components/GeneralCollectionDetailsContent';
import EventCloseGeneralCollectionDetail from '@/model/EventCloseGeneralCollectionDetail';
import { FooterCustom } from '@/components/FooterCustom';
import { columnsGeneralColletion } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface GeneralCollectionProps {
  state: States;
  eventLocation: any;
  generalCollectionList: EventCloseGeneralCollection[];
  generalCollectionDetailsList: EventCloseGeneralCollectionDetail[];
  incomeFooter: any;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  onToggle: () => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
  }: {
    value: ShouldShowModal;
    newTitleModal: string;
  }) => void;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  infoGeneralCollection = 'infoGeneralCollection',
}

export const GeneralCollectionContainer: React.FC<GeneralCollectionProps> = ({
  state,
  eventLocation,
  generalCollectionList,
  generalCollectionDetailsList,
  incomeFooter,
  shouldShowModal,
  onShouldShowModal,
  title,
  visible,
  onToggle,
}) => {
  const { id: eventId } = useParams<{ id: string }>();

  const dataTableGeneralCollection = generalCollectionList.map(
    (item: EventCloseGeneralCollection) => ({
      id: item.event.id,
      name: item.event.name,
      startDate: dayjs(item.event.startDate).format('DD/MM/YYYY'),
      endDate: dayjs(item.event.endDate).format('DD/MM/YYYY'),
      amountTickets: item.amount,
      totalValue: item.value,
      actions: (
        <Info
          className="svg-icon action-icon"
          onClick={(): void => {
            onShouldShowModal({
              value: ShouldShowModal.infoGeneralCollection,
              newTitleModal: `${item.event.name} - ${dayjs(item.event.startDate).format(
                'DD/MM/YYYY',
              )}`,
            });
          }}
        />
      ),
    }),
  );

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
            [ShouldShowModal.infoGeneralCollection]: (
              <GeneralCollectionDetailsContent
                generalCollectionDetailsList={generalCollectionDetailsList}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>
      <Container className="mainContainer" fluid={true}>
        <div className="pageTitle d-flex mb-5">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/${eventId}`}>
            <ArrowLeft color={colors.black} className="arrow-left" />
          </Link>
          <h5 className="ml-3 mb-0 mt-2 pageTitle">
            Arrecadação geral {eventLocation?.event?.name}
          </h5>
        </div>
        <CustomTable
          columns={columnsGeneralColletion}
          data={dataTableGeneralCollection}
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
              incomeFooter?.value?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }) || 'Dado não encontrado',
          },
        ]}
      />
    </Fragment>
  );
};
