import { CustomTable } from '@/components/Table';
import EventCloseGeneralCollectionDetail from '@/model/EventCloseGeneralCollectionDetail';
import React from 'react';
import { columnsGeneralColletionDetails } from '../../screens/GeneralCollection/ui/table';

export interface GeneralCollectionDetailsContentProps {
  generalCollectionDetailsList: EventCloseGeneralCollectionDetail[];
}

export const GeneralCollectionDetailsContent: React.FC<GeneralCollectionDetailsContentProps> = ({
  generalCollectionDetailsList,
}) => (
  <div className="card-ligth-color p-4">
    {generalCollectionDetailsList.length > 0
      ? generalCollectionDetailsList.map(({ section, tickets }, index) => (
          <React.Fragment key={index}>
            {index > 0 ? <hr style={{ margin: '25px -25px 30px -25px' }} /> : null}
            <div>
              <div className="d-flex w-100 justify-content-between">
                <div className="mb-3 w-100">
                  <span className="secondary-table-title">Nome do setor #{index + 1}</span>
                  <span className="secondary-table-title font-weight-bold">• {section.name}</span>
                </div>
              </div>
              <CustomTable
                theme="secondaryWithoutBorder"
                numberRowsPerPage={0}
                progressPending={false}
                columns={columnsGeneralColletionDetails}
                data={
                  tickets.length > 0
                    ? tickets.map((ticket, indexTicket) => ({
                        id: indexTicket,
                        name: ticket.name,
                        grossAmount: ticket.grossAmount,
                        amount: ticket.amount,
                        averageTicket: ticket.averageTicket,
                      }))
                    : []
                }
              />
            </div>
          </React.Fragment>
        ))
      : 'Nenhuma POS cadastrada. Aqui será exibida uma lista de POS'}
  </div>
);
