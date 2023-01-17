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
import { FormInputName as FormInputNameIncome } from '@/features/eventClose/components/IncomeManualEntriesRegister';
import { NameFiles } from '@/features/events/types';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/components/DeleteContent';
import { IncomeManualEntriesContainer, ShouldShowModal, States } from './ui';

export const IncomeManualEntriesScreen: React.FC = (): JSX.Element => {
  const { id: eventId } = useParams<{ id: string }>();
  const [state, setState] = useState<States>(States.default);
  const [incomeAttachments, setIncomeAttachments] = useState<
    { id: string; attachmentsDescription: string; attachmentsFileURL: string }[] | any[]
  >([]);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.incomeRegister,
  );
  const [incomeList, setIncomeList] = useState([]);
  const [income, setIncome] = useState<any>({});
  const [incomeFooter, setIncomeFooter] = useState<any>({});

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataIncome,
    formErrors: formErrorsIncome,
    onChangeFormInput: onChangeFormInputIncome,
    isFormValid: isFormValidIncome,
    resetForm: resetFormIncome,
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
            // set income Attachments to index
            const newFormValues = [...incomeAttachments];
            newFormValues[index][inputName] = base64;
            setIncomeAttachments(newFormValues);
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

  const handleDeleteIncomeAttachments = async (incomeAttachmentSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(
        `/event/close/${eventId}/income/${
          income?.id ?? incomeAttachmentSelected?.incomeId
        }/attachment/${incomeAttachmentSelected?.id}`,
      );
      toast.success('Anexo excluído com sucesso');
      confirmDelete.hide();
      if (income) {
        handleGetIncomeManualEntries(income);
      }
      handleGetAllIncomeManualEntries();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleDeleteIncome = async (incomeSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(`/event/close/${eventId}/income/${incomeSelected?.id}`);
      toast.success('Anexo excluído com sucesso');
      confirmDelete.hide();
      handleGetAllIncomeManualEntries();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const controllerInputAppendIncomeAttachments = {
    nameFiles,
    onChangeFileInput: handleOnChangeFileInput,
    incomeAttachments,
    setIncomeAttachments,
    handleAddIncomeAttachments(): void {
      setIncomeAttachments([
        ...incomeAttachments,
        {
          id: '',
          attachmentsDescription: '',
          attachmentsFileURL: '',
        },
      ]);
    },
    handleChangeIncomeAttachments(inputName: string, index: number, value: string): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newFormValues = [...incomeAttachments] as any;
      newFormValues[index][inputName] = value;
      setIncomeAttachments(newFormValues);
    },
    handleRemoveIncomeAttachments(index: number): void {
      const values = [...incomeAttachments];
      values.splice(index, 1);
      setIncomeAttachments(values);
      // clear name to index
      const newNameFiles = { ...nameFiles };
      delete newNameFiles[index];
      setNameFiles(newNameFiles);
    },
    handleDeleteIncomeAttachments,
    handleOnShowDelete,
  };

  const handleGetAllIncomeManualEntries = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/income/find`);
      setIncomeList(data.incomes ?? []);
      setIncomeFooter(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetIncomeManualEntries = async (incomeSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${eventId}/income/${incomeSelected?.id}`);
      setIncome(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnCheckIncome = async (incomeId: string): Promise<void> => {
    try {
      setState(States.loading);
      await api.patch(`/event/close/${eventId}/income/${incomeId}/check`);
      toast.success('Recebimento confirmado com sucesso');
      handleGetAllIncomeManualEntries();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnSaveIncome = async (): Promise<void> => {
    try {
      setState(States.loading);
      const payloadIcomeAttachments = incomeAttachments.map((incomeAttachment, indexAtt) => ({
        id: incomeAttachment?.id,
        description: incomeAttachment.attachmentsDescription,
        fileURL:
          incomeAttachment.attachmentsFileURL ||
          incomeAttachment['attachmentsFileURL-'.concat(indexAtt.toString())],
      }));

      // if payloadIcomeAttachments.id is empty, delete key
      payloadIcomeAttachments.forEach(incomeAttachment => {
        if (!incomeAttachment?.id) {
          delete incomeAttachment.id;
        }
      });

      if (isFormValidIncome()) {
        const payload = {
          id: income?.id,
          description: formDataIncome[FormInputNameIncome.description],
          totalValue:
            formDataIncome[FormInputNameIncome.value] &&
            unmaskCash(formDataIncome[FormInputNameIncome.value]),
        };

        if (!payload.id) {
          delete payload.id;
        }

        const { data } = await api.post(`/event/close/${eventId}/income`, payload);

        // fetch loop to save attachments
        for (let index = 0; index < payloadIcomeAttachments.length; index += 1) {
          const incomeAttachment = payloadIcomeAttachments[index];
          await api.post(`/event/close/${eventId}/income/${data?.id}/attachment`, incomeAttachment);
        }

        toast.success('Registro salvo com sucesso!');

        onToggle();
        handleGetAllIncomeManualEntries();
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
    incomeManualEntries: incomeManualEntriesSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string;
    incomeManualEntries?: any;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    setIncome(incomeManualEntriesSelected);
    if (incomeManualEntriesSelected) handleGetIncomeManualEntries(incomeManualEntriesSelected);
  };

  const controllerFormIncome = {
    formData: formDataIncome,
    formErrors: formErrorsIncome,
    onChangeFormInput: onChangeFormInputIncome,
  };

  useEffect(() => {
    handleGetAllIncomeManualEntries();
  }, []);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormIncome();
        setIncome(undefined);
        setIncomeAttachments([]);
        setNameFiles({});
      }, 500);
    }
  }, [visible]);

  useEffect(() => {
    if (income?.id) {
      onChangeFormInputIncome(FormInputNameIncome.description)(income.description);
      onChangeFormInputIncome(FormInputNameIncome.value)(income?.totalValue ?? '');

      setIncomeAttachments(
        income.attachments.map((item: any) => ({
          id: item.id,
          attachmentsDescription: item.description,
          attachmentsFileURL: item.fileURL,
        })),
      );
    }
  }, [income]);

  return (
    <IncomeManualEntriesContainer
      state={state}
      incomeList={incomeList}
      incomeFooter={incomeFooter}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onShouldShowModal={handleOnShouldShowModal}
      shouldShowModal={shouldShowModal}
      formIncome={controllerFormIncome}
      onSaveIncome={handleOnSaveIncome}
      controllerInputAppendIncomeAttachments={controllerInputAppendIncomeAttachments}
      handleDeleteIncome={handleDeleteIncome}
      onCheckIncome={handleOnCheckIncome}
    />
  );
};
