import React, { Fragment } from 'react';
import { Button, Dialog, Loading } from '@/components';
import { Container } from 'reactstrap';
import './style.scss';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, X } from 'react-feather';
import { colors } from '@/styles/colors';
import { CustomTable } from '@/components/Table';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as Attachments } from '@/assets/images/svg/Attachments.svg';
import EventCloseExpense from '@/model/EventCloseExpense';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import { updateMask as updateMaskCash } from '@/helpers/masks/cash';
import { DropdownMenuAttachment } from '@/features/eventClose/components/DropdownMenuAttachment';
import { ReactComponent as Download } from '@/assets/images/svg/download.svg';
import { ExpenseManualEntriesRegister } from '@/features/eventClose/components/ExpenseManualEntriesRegister';
import { columnsExpenseDetails } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface ExpenseProps {
  state: States;
  eventLocation: any;
  expenseList: EventCloseExpense[];
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  onToggle: () => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    expenseManualEntries,
  }: {
    value: ShouldShowModal;
    newTitleModal: string;
    expenseManualEntries?: any;
  }) => void;
  formExpense: {
    formData: FormData;
    formErrors: FormErrors;
    onChangeFormInput: OnChangeFormInput;
  };
  onSaveExpense: () => Promise<void>;
  controllerInputAppendExpenseAttachments: any;
  handleDeleteExpense: (expense: EventCloseExpense) => void;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  expenseRegister = 'expenseRegister',
}

export const ExpenseManualEntriesContainer: React.FC<ExpenseProps> = ({
  state,
  // eventLocation,
  expenseList,
  shouldShowModal,
  onShouldShowModal,
  title,
  visible,
  onToggle,
  formExpense,
  onSaveExpense,
  controllerInputAppendExpenseAttachments,
  handleDeleteExpense,
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

  const dataTableExpense = expenseList?.map((item: any, index) => ({
    id: index,
    item: index < 10 ? `0${index + 1}` : index + 1,
    description: item.description,
    value: updateMaskCash(item.value || 0),
    actions: (
      <div className="mt-3">
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
                    controllerInputAppendExpenseAttachments.handleOnShowDelete(
                      controllerInputAppendExpenseAttachments.handleDeleteExpenseAttachments,
                      { ...attachment, expenseId: item.id },
                    )
                  }
                />
              </div>
            ),
            onClick: (): void => undefined,
          }))}
          title={<Attachments className="mr-4 svg-icon action-icon" />}
        />
        <Pen
          className="mr-4 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.expenseRegister,
              newTitleModal: `${item.description}`,
              expenseManualEntries: item,
            })
          }
        />
        <Trash
          className="mr-2 svg-icon action-icon svg-icon-trash"
          onClick={() =>
            controllerInputAppendExpenseAttachments.handleOnShowDelete(handleDeleteExpense, item)
          }
        />
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
            onClick: (): Promise<void> => onSaveExpense(),
          },
        ]}
      >
        {
          {
            [ShouldShowModal.expenseRegister]: (
              <ExpenseManualEntriesRegister
                formExpense={formExpense}
                controllerInputAppendExpenseAttachments={controllerInputAppendExpenseAttachments}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>
      <Container className="mainContainer" fluid={true}>
        <div className="pageTitle d-flex justify-content-between mb-5">
          <div className="d-flex">
            <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/${eventId}`}>
              <ArrowLeft color={colors.black} className="arrow-left" />
            </Link>
            <h5 className="ml-3 mb-0 pageTitle">Despesas</h5>
          </div>
          <div>
            <Button
              title="+ Inserir item"
              onClick={(): void => {
                onShouldShowModal({
                  value: ShouldShowModal.expenseRegister,
                  newTitleModal: `Inserir item`,
                });
              }}
            />
          </div>
        </div>
        <CustomTable
          columns={columnsExpenseDetails}
          data={dataTableExpense}
          numberRowsPerPage={10}
          theme="primary"
          progressPending={state === States.loading}
        />
      </Container>
    </Fragment>
  );
};
