import { CustomTable } from '@/components/Table';
import { updateMask as updateMaskCash } from '@/helpers/masks/cashNumber';
import React from 'react';
import { Card } from 'reactstrap';
import { StyledPie } from '../StyledPie';

export interface GeneralSaleProps {
  generalSaleState: any;
}

export const GeneralSale: React.FC<GeneralSaleProps> = ({ generalSaleState }) => {
  console.log(generalSaleState);
  return (
    <>
      <h5 className="pageTitle">Vendas gerais</h5>
      <h6 className="mb-4">Canais de venda</h6>
      <div className="d-flex justify-content-between">
        <StyledPie generalSale={generalSaleState?.salesChannel} />
        <StyledPie generalSale={generalSaleState?.ticketTypes} />
      </div>
      <hr className="mb-5 mt-5" />
      <h6>Ranking Geográfico (Top 10 Cidades)</h6>
      <CustomTable
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
      <hr className="mb-5 mt-5" />
      {/* {generalSale?.sections.length > 0 && ( */}
      <>
        <p>{generalSaleState?.sections.map((section: any) => section.name)}</p>
        <Card style={{ border: 'none', overflow: 'auto' }}>
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
            data={generalSaleState?.section?.map((item: any) => ({
              name: item?.batchs?.name,
              totalSale: item?.batchs?.totalSale,
              totalIssuede: item?.batchs?.totalIssued,
              totalAvailable: item?.batchs?.totalAvailable,
              amountCourtesy: item?.batchs?.amountCourtesy,
              ticketValue: `R$+${updateMaskCash(
                item?.batchs?.ticketValue && String(+item.batchs.ticketValue.toFixed(2)),
              )}`,
              totalValue: `R$+${updateMaskCash(
                item?.batchs?.totalValue && +item.batchs.totalValue.toFixed(2),
              )}`,
            }))}
          />
          <hr className="mb-0" />
          <div
            style={{
              padding: '30px 40px',
              gap: '40px',
            }}
            className="d-flex justify-content-center"
          >
            <div className="d-flex">
              <div>Total vendidos:</div>
              <div>100</div>
            </div>

            <div className="d-flex">
              <div>Total emitidos:</div>
              <div>100</div>
            </div>

            <div className="d-flex">
              <div>Total disponíveis:</div>
              <div>100</div>
            </div>

            <div className="d-flex">
              <div>Cortesias:</div>
              <div>100</div>
            </div>

            <div className="d-flex">
              <div>Total arrecadado:</div>
              <div>R$100</div>
            </div>
          </div>
        </Card>
      </>
      {/* )
            } */}
    </>
  );
};
