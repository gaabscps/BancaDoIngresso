import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { Button, InputFile, InputText } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { ReactComponent as Download } from '@/assets/images/svg/download.svg';
import { X } from 'react-feather';

interface RegisterContentProps {
  formExpense: {
    formData: FormData;
    formErrors: FormErrors;
    onChangeFormInput: OnChangeFormInput;
  };
  controllerInputAppendExpenseAttachments: any;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  description = 'description',
  value = 'value',
  attachmentsDescription = 'attachmentsDescription',
  attachmentsFileURL = 'attachmentsFileURL',
}

export const ExpenseManualEntriesRegister: React.FC<RegisterContentProps> = ({
  formExpense,
  controllerInputAppendExpenseAttachments,
}) => {
  const { formData, formErrors, onChangeFormInput } = formExpense;

  const downloadURI = (uri: string, name: string): void => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
      }}
    >
      <Row>
        <Col md={8}>
          <FormGroup className="mb-2">
            <InputText
              name="description"
              label="Descrição"
              placeholder="Digite a descrição do item"
              value={formData[FormInputName.description]}
              onChange={e => onChangeFormInput(FormInputName.description)(e.target.value)}
              error={formErrors.description && formErrors.description[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="value"
              label="Valor"
              placeholder="Ex: 20,00"
              addon="R$"
              className="w-input-md"
              value={formData[FormInputName.value]}
              onChange={e => onChangeFormInput(FormInputName.value)(e.target.value)}
              error={formErrors.value && formErrors.value[0]}
            />
          </FormGroup>
        </Col>
      </Row>
      <div>
        <Row>
          <Col md={8}>
            <h5 className="mb-5 border-bottom-title">Anexos</h5>
          </Col>
        </Row>
        {controllerInputAppendExpenseAttachments.expenseAttachments.length > 0 ? (
          controllerInputAppendExpenseAttachments.expenseAttachments.map(
            (item: any, index: string) => (
              <Row key={index}>
                <Col md={5}>
                  <FormGroup className="mb-2">
                    <InputText
                      name="agencia"
                      label="Descrição"
                      placeholder="Digite a descrição"
                      value={item.attachmentsDescription}
                      maxLength={60}
                      onChange={e =>
                        controllerInputAppendExpenseAttachments.handleChangeExpenseAttachments(
                          FormInputName.attachmentsDescription,
                          index,
                          e?.target.value,
                        )
                      }
                      error={
                        formErrors?.attachmentsDescription && formErrors.attachmentsDescription[0]
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup className="mb-2">
                    <InputFile
                      name={`attachmentsFileURL-${index}`}
                      label="Arquivo"
                      fileName={
                        controllerInputAppendExpenseAttachments?.expenseAttachments[index]
                          .attachmentsFileURL
                          ? controllerInputAppendExpenseAttachments.expenseAttachments[
                              index
                            ].attachmentsFileURL
                              .split('/')
                              .pop()
                          : controllerInputAppendExpenseAttachments.nameFiles[index]
                      }
                      onChange={e => {
                        controllerInputAppendExpenseAttachments.onChangeFileInput(
                          `${FormInputName.attachmentsFileURL}-${index}`,
                          index,
                        )((e.target as HTMLInputElement)?.files?.[0]);
                      }}
                      error={formErrors?.attachmentsFileURL && formErrors.attachmentsFileURL[0]}
                    />
                  </FormGroup>
                </Col>
                <Col md={2} className="pt-5">
                  {
                    // verificar se é um arquivo ou url
                    item.attachmentsFileURL?.includes('http') ? (
                      <Download
                        className="svg-icon action-icon mr-3"
                        onClick={() =>
                          downloadURI(
                            item.attachmentsFileURL,
                            controllerInputAppendExpenseAttachments.expenseAttachments[
                              index
                            ].attachmentsFileURL
                              .split('/')
                              .pop(),
                          )
                        }
                      />
                    ) : (
                      ''
                    )
                  }

                  <X
                    className="svg-icon action-icon"
                    onClick={() =>
                      item.attachmentsFileURL?.includes('http')
                        ? controllerInputAppendExpenseAttachments.handleOnShowDelete(
                            controllerInputAppendExpenseAttachments.handleDeleteExpenseAttachments,
                            { ...item, expenseId: item.id },
                          )
                        : controllerInputAppendExpenseAttachments.handleRemoveExpenseAttachments(
                            index,
                          )
                    }
                  />
                </Col>
              </Row>
            ),
          )
        ) : (
          <span className="p-3 text-black-50">Para adicionar anexos, clique no botão abaixo</span>
        )}
        <Row>
          <Col>
            <div className="d-flex mb-4">
              <Button
                className="p-0"
                title="Adicionar anexo"
                theme="noneBorder"
                onClick={() =>
                  controllerInputAppendExpenseAttachments.handleAddExpenseAttachments()
                }
              />
            </div>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
