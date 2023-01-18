import React, { Fragment } from 'react';
import { Button, Checkbox, Dialog, Loading } from '@/components';
import { Container } from 'reactstrap';
import './style.scss';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, X } from 'react-feather';
import { colors } from '@/styles/colors';
import { CustomTable } from '@/components/Table';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as Attachments } from '@/assets/images/svg/Attachments.svg';
import { IncomeManualEntriesRegister } from '@/features/eventClose/components/IncomeManualEntriesRegister';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import { updateMask as updateMaskCash } from '@/helpers/masks/cash';
import { DropdownMenuAttachment } from '@/features/eventClose/components/DropdownMenuAttachment';
import { ReactComponent as Download } from '@/assets/images/svg/download.svg';
import { FooterCustom } from '@/components/FooterCustom';
import { EventCloseIncome } from '@/model/EventCloseIncome';
import { columnsIncomeDetails } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface IncomeProps {
  state: States;
  incomeList: EventCloseIncome[];
  incomeFooter: any;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  onToggle: () => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    incomeManualEntries,
  }: {
    value: ShouldShowModal;
    newTitleModal: string;
    incomeManualEntries?: any;
  }) => void;
  formIncome: {
    formData: FormData;
    formErrors: FormErrors;
    onChangeFormInput: OnChangeFormInput;
  };
  onSaveIncome: () => Promise<void>;
  controllerInputAppendIncomeAttachments: {
    nameFiles: {
      [key: string]: string;
    };
    onChangeFileInput: (inputName: string, index: number) => (file: File | undefined) => void;
    incomeAttachments: {
      id: string;
      attachmentsDescription: string;
      attachmentsFileURL: string;
    }[];
    setIncomeAttachments: React.Dispatch<
      React.SetStateAction<
        { id: string; attachmentsDescription: string; attachmentsFileURL: string }[]
      >
    >;
    handleAddIncomeAttachments: () => void;
    handleChangeIncomeAttachments: (inputName: string, index: number, value: string) => void;
    handleRemoveIncomeAttachments: (index: number) => void;
    handleDeleteIncomeAttachments: (income: any) => void;
    handleOnShowDelete: any;
  };
  handleDeleteIncome: (income: EventCloseIncome) => void;
  onCheckIncome: (incomeId: string) => Promise<void>;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  incomeRegister = 'incomeRegister',
}

export const IncomeManualEntriesContainer: React.FC<IncomeProps> = ({
  state,
  incomeList,
  incomeFooter,
  shouldShowModal,
  onShouldShowModal,
  title,
  visible,
  onToggle,
  formIncome,
  onSaveIncome,
  controllerInputAppendIncomeAttachments,
  handleDeleteIncome,
  onCheckIncome,
}) => {
  const { id: eventId } = useParams<{ id: string }>();

  const downloadURI = (uri: string, name: string): void => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dataTableIncome = incomeList?.map((item: any, index) => ({
    id: index,
    item: index < 10 ? `0${index + 1}` : index + 1,
    description: item.description,
    value: updateMaskCash(item.totalValue),
    actions: (
      <div className="mt-3 d-flex">
        <div className="mr-4" style={{ overflow: 'unset' }}>
          <Checkbox
            theme="secondary"
            name={`income-${index}-${item.id}`}
            checked={item.checked}
            onChange={() => onCheckIncome(item.id)}
          />
        </div>
        <div>
          {item.attachments?.length > 0 && (
            <span
              className="badge badge-custom position-absolute top-0 start-100 translate-middle rounded-pill bg-danger"
              style={{ marginLeft: '12px' }}
            >
              {item.attachments?.length}
            </span>
          )}
          <DropdownMenuAttachment
            actions={item.attachments?.map((attachment: any) => ({
              title: (
                <div className="d-flex align-items-center">
                  <span className="mr-5">{attachment.description}</span>
                  {
                    // verificar se é um arquivo ou url
                    attachment.fileURL?.includes('http') ? (
                      <Download
                        height={15}
                        className="svg-icon action-icon mr-3"
                        onClick={() =>
                          downloadURI(attachment.fileURL, attachment.fileURL.split('/').pop())
                        }
                      />
                    ) : (
                      ''
                    )
                  }

                  <X
                    height={18}
                    className="svg-icon action-icon"
                    onClick={() =>
                      controllerInputAppendIncomeAttachments.handleOnShowDelete(
                        controllerInputAppendIncomeAttachments.handleDeleteIncomeAttachments,
                        { ...attachment, incomeId: item.id },
                      )
                    }
                  />
                </div>
              ),
              onClick: (): void => undefined,
            }))}
            title={<Attachments className="mr-4 svg-icon action-icon" />}
          />
        </div>
        <div>
          <Pen
            className="mr-4 svg-icon action-icon"
            onClick={(): void =>
              onShouldShowModal({
                value: ShouldShowModal.incomeRegister,
                newTitleModal: `${item.description}`,
                incomeManualEntries: item,
              })
            }
          />
        </div>
        <div>
          <Trash
            className="mr-2 svg-icon action-icon svg-icon-trash"
            onClick={() =>
              controllerInputAppendIncomeAttachments.handleOnShowDelete(handleDeleteIncome, item)
            }
          />
        </div>
      </div>
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
        isContentWithCard={true}
        actions={[
          {
            title: 'Cancelar',
            onClick: (): void => onToggle(),
            theme: 'noneBorder',
          },
          {
            title: 'Inserir',
            onClick: (): Promise<void> => onSaveIncome(),
          },
        ]}
      >
        {
          {
            [ShouldShowModal.incomeRegister]: (
              <IncomeManualEntriesRegister
                formIncome={formIncome}
                controllerInputAppendIncomeAttachments={controllerInputAppendIncomeAttachments}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>
      <Container className="mainContainer" fluid={true}>
        <div className="pageTitle d-flex justify-content-between mb-5">
          <div className="d-flex">
            <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/income/${eventId}`}>
              <ArrowLeft color={colors.black} className="arrow-left" />
            </Link>
            <h5 className="ml-3 mb-0 pageTitle">Receitas - Lançamentos Manuais</h5>
          </div>
          <div>
            <Button
              title="+ Inserir item"
              onClick={(): void => {
                onShouldShowModal({
                  value: ShouldShowModal.incomeRegister,
                  newTitleModal: `Inserir item`,
                });
              }}
            />
          </div>
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
