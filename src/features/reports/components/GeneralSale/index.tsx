import { StyledPie } from '@/components/StyledPie';
import { CustomTable } from '@/components/Table';
import { updateMask as updateMaskCash } from '@/helpers/masks/cashNumber';
import validators from '@/helpers/validators';
import React from 'react';
import { Card } from 'reactstrap';

export interface GeneralSaleProps {
  generalSaleState: any;
}

export const GeneralSale: React.FC<GeneralSaleProps> = ({ generalSaleState }) => {
  console.log(generalSaleState);

  return (
    <>
      <h5 className="mb-5">Vendas gerais</h5>
      <h6 className="mb-4">Canais de venda</h6>
      <div className="d-flex justify-content-between">
        <StyledPie generalSale={generalSaleState?.salesChannel} />
        <StyledPie generalSale={generalSaleState?.ticketTypes} />
      </div>
      <hr className="mb-5 mt-5" />
      <h6 className="mb-4">Ranking Geográfico (Top 10 Cidades)</h6>
      <div className="text-small-black-regular">
        <CustomTable
          theme="primary"
          columns={[
            {
              name: 'Cidade',
              selector: row => row.city,
              minWidth: '33%',
            },
            {
              name: 'Estado',
              selector: row => row.state,
              minWidth: '33%',
            },
            {
              name: 'Quantidade',
              selector: row => row.amount,
              width: '200px',
            },
          ]}
          data={generalSaleState?.geographicRanking?.map((item: any) => ({
            city: item.city,
            state: item.state,
            amount: item.amount,
          }))}
          numberRowsPerPage={10}
          progressPending={false}
        />
      </div>
      <hr className="mb-5 mt-5" />
      <>
        {generalSaleState?.sections?.map((section: any) => (
          <>
            <h6 className="mb-4">{section.section.name}</h6>
            <Card className="mb-5 card-no-border" style={{ border: 'none', overflow: 'auto' }}>
              <div className="p-4">
                <CustomTable
                  theme="secondary"
                  numberRowsPerPage={0}
                  progressPending={false}
                  columns={[
                    {
                      name: 'Lote',
                      selector: row => row.name,
                    },
                    {
                      name: 'Ingressos vendidos',
                      selector: row => row.totalSale,
                    },
                    {
                      name: 'Ingressos emitidos',
                      selector: row => row.totalIssuede,
                    },
                    {
                      name: 'Ingressos disponíveis',
                      selector: row => row.totalAvailable,
                    },
                    {
                      name: 'Cortesias',
                      selector: row => row.amountCourtesy,
                      width: '100px',
                    },
                    {
                      name: 'Valor do ingresso',
                      selector: row => row.ticketValue,
                    },
                    {
                      name: 'Valor total',
                      selector: row => row.totalValue,
                    },
                  ]}
                  data={
                    section?.batchs?.map((batch: any) => ({
                      name: batch.name,
                      totalSale: batch.totalSale,
                      totalIssuede: batch.totalIssued,
                      totalAvailable: batch.totalAvailable,
                      amountCourtesy: batch.amountCourtesy,
                      ticketValue: `R$ ${updateMaskCash(
                        validators.applyDecimalMask(String(batch.ticketValue)),
                      )}`,
                      totalValue: `R$ ${updateMaskCash(
                        validators.applyDecimalMask(String(batch.totalValue)),
                      )}`,
                    })) || []
                  }
                />
              </div>
              <hr className="mb-0" style={{ minWidth: '1040px' }} />
              <div
                style={{
                  padding: '30px 40px',
                  gap: '40px',
                }}
                className="d-flex justify-content-center"
              >
                <>
                  <div className="d-flex">
                    <div className="mr-1 text-small-gray-regular">Total vendidos:</div>
                    <div className="text-small-black-600">{section?.totalSale}</div>
                  </div>

                  <div className="d-flex">
                    <div className="mr-1 text-small-gray-regular">Total emitidos:</div>
                    <div className="text-small-black-600">{section?.totalIssued}</div>
                  </div>

                  <div className="d-flex">
                    <div className="mr-1 text-small-gray-regular">Total disponíveis:</div>
                    <div className="text-small-black-600">{section.totalAvailable}</div>
                  </div>

                  <div className="d-flex">
                    <div className="mr-1 text-small-gray-regular">Cortesias:</div>
                    <div className="text-small-black-600">{section.amountCourtesy}</div>
                  </div>

                  <div className="d-flex">
                    <div className="mr-1 text-small-gray-regular">Total arrecadado:</div>
                    <div className="text-small-black-600">{`R$ ${section?.totalRaised}`}</div>
                  </div>
                </>
              </div>
            </Card>
          </>
        ))}
      </>
    </>
  );
};
