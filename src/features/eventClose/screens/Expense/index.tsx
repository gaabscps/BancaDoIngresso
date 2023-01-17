/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';
import { useDialog } from '@/hooks/useDialog';
import { updateMask as updateMaskCash, unmask as unmaskCash } from '@/helpers/masks/cashNumber';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { NameFiles } from '@/features/events/types';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/components/DeleteContent';
import { FormInputName as FormInputNameExpense } from '@/features/eventClose/components/ExpenseManualEntriesRegister';
import { ExpenseManualEntriesContainer, ShouldShowModal, States } from './ui';

export const ExpenseManualEntriesScreen: React.FC = (): JSX.Element => {
  const { id: eventId } = useParams<{ id: string }>();
  const [state, setState] = useState<States>(States.default);
  const [expenseAttachments, setExpenseAttachments] = useState<
    { id?: string; attachmentsDescription: string; attachmentsFileURL: string }[] | []
  >([]);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.expenseRegister,
  );
  const [expenseList, setExpenseList] = useState([]);
  const [expense, setExpense] = useState<any>({});

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataExpense,
    formErrors: formErrorsExpense,
    onChangeFormInput: onChangeFormInputExpense,
    isFormValid: isFormValidExpense,
    resetForm: resetFormExpense,
  } = useForm({
    initialData: {
      description: '',
      value: '',
    },
    validators: {
      description: [validators.required],
      value: [validators.required],
    },
    formatters: {
      value: updateMaskCash,
    },
  });

  const handleOnChangeFileInput =
    (inputName: string, index: number) =>
    (file: File | undefined): void => {
      // validate if file is image
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result?.toString();
          if (base64) {
            // name files to index
            const newNameFiles = { ...nameFiles };
            newNameFiles[index] = file.name;
            setNameFiles(newNameFiles);
            // set expense Attachments to index
            const newFormValues = [...expenseAttachments] as any;
            newFormValues[index][inputName] = base64;
            setExpenseAttachments(newFormValues);
          }
        };
      } else {
        toast.error('Erro ao carregar arquivo');
      }
    };

  const handleOnShowDelete = (funcDelete: any, itemSelected: any): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => confirmDelete.hide(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): Promise<void> => funcDelete(itemSelected),
        },
      ],
    });
  };

  const handleDeleteExpenseAttachments = async (expenseAttachmentSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(
        `/event/close/${eventId}/expense/${
          expense?.id ?? expenseAttachmentSelected?.expenseId
        }/attachment/${expenseAttachmentSelected?.id}`,
      );
      toast.success('Anexo excluído com sucesso');
      confirmDelete.hide();
      if (expense) {
        handleGetExpenseManualEntries(expense);
      }
      handleGetAllExpenseManualEntries();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleDeleteExpense = async (expenseSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(`/event/close/${eventId}/expense/${expenseSelected?.id}`);
      toast.success('Anexo excluído com sucesso');
      confirmDelete.hide();
      handleGetAllExpenseManualEntries();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const controllerInputAppendExpenseAttachments = {
    nameFiles,
    onChangeFileInput: handleOnChangeFileInput,
    expenseAttachments,
    setExpenseAttachments,
    handleAddExpenseAttachments(): void {
      setExpenseAttachments([
        ...expenseAttachments,
        {
          id: '',
          attachmentsDescription: '',
          attachmentsFileURL: '',
        },
      ]);
    },
    handleChangeExpenseAttachments(inputName: string, index: number, value: string): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newFormValues = [...expenseAttachments] as any;
      newFormValues[index][inputName] = value;
      setExpenseAttachments(newFormValues);
    },
    handleRemoveExpenseAttachments(index: number): void {
      const values = [...expenseAttachments];
      values.splice(index, 1);
      setExpenseAttachments(values);
      // clear name to index
      const newNameFiles = { ...nameFiles };
      delete newNameFiles[index];
      setNameFiles(newNameFiles);
    },
    handleDeleteExpenseAttachments,
    handleOnShowDelete,
  };

  const handleGetAllExpenseManualEntries = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/expense`);
      setExpenseList(data.incomes ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetExpenseManualEntries = async (expenseSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/expense/${expenseSelected?.id}`);
      setExpense(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnSaveExpense = async (): Promise<void> => {
    try {
      setState(States.loading);
      const payloadIcomeAttachments = expenseAttachments.map((expenseAttachment, indexAtt) => ({
        id: expenseAttachment?.id,
        description: expenseAttachment.attachmentsDescription,
        fileURL:
          expenseAttachment.attachmentsFileURL ||
          expenseAttachment[
            'attachmentsFileURL-'.concat(indexAtt.toString()) as keyof typeof expenseAttachment
          ],
      }));

      // if payloadIcomeAttachments.id is empty, delete key
      payloadIcomeAttachments.forEach(expenseAttachment => {
        if (!expenseAttachment?.id) {
          delete expenseAttachment.id;
        }
      });

      if (isFormValidExpense()) {
        const payload = {
          id: expense?.id,
          description: formDataExpense[FormInputNameExpense.description],
          value:
            formDataExpense[FormInputNameExpense.value] &&
            unmaskCash(formDataExpense[FormInputNameExpense.value]),
        };

        if (!payload.id) {
          delete payload.id;
        }

        const { data } = await api.post(`/event/close/${eventId}/expense`, payload);

        // fetch loop to save attachments
        for (let index = 0; index < payloadIcomeAttachments.length; index += 1) {
          const expenseAttachment = payloadIcomeAttachments[index];
          await api.post(
            `/event/close/${eventId}/expense/${data?.id}/attachment`,
            expenseAttachment,
          );
        }

        toast.success('Registro salvo com sucesso!');

        onToggle();
        handleGetAllExpenseManualEntries();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    expenseManualEntries: expenseManualEntriesSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string;
    expenseManualEntries?: any;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    setExpense(expenseManualEntriesSelected);
    // if (expenseManualEntriesSelected) handleGetExpenseManualEntries(expenseManualEntriesSelected);
  };

  const controllerFormExpense = {
    formData: formDataExpense,
    formErrors: formErrorsExpense,
    onChangeFormInput: onChangeFormInputExpense,
  };

  useEffect(() => {
    handleGetAllExpenseManualEntries();
  }, []);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormExpense();
        setExpense(undefined);
        setExpenseAttachments([]);
        setNameFiles({});
      }, 500);
    }
  }, [visible]);

  useEffect(() => {
    if (expense?.id) {
      onChangeFormInputExpense(FormInputNameExpense.description)(expense.description);
      onChangeFormInputExpense(FormInputNameExpense.value)(expense?.value ?? '');

      setExpenseAttachments(
        expense.attachments.map((item: any) => ({
          id: item.id,
          attachmentsDescription: item.description,
          attachmentsFileURL: item.fileURL,
        })),
      );
    }
  }, [expense]);

  return (
    <ExpenseManualEntriesContainer
      state={state}
      expenseList={expenseList}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onShouldShowModal={handleOnShouldShowModal}
      shouldShowModal={shouldShowModal}
      formExpense={controllerFormExpense}
      onSaveExpense={handleOnSaveExpense}
      controllerInputAppendExpenseAttachments={controllerInputAppendExpenseAttachments}
      handleDeleteExpense={handleDeleteExpense}
    />
  );
};
