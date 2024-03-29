/* eslint-disable no-prototype-builtins */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useDialog } from '@/hooks/useDialog';
import { AxiosError } from 'axios';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Pos from '@/model/Pos';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/components/DeleteContent';
import {
  FormInputName as FormInputNamePos,
  SectorPosContainer,
  ShouldShowModal,
} from '@/features/registerEvent/components/SectorPosScreen/screens/ui';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import ProductSectionEvent from '@/model/SectionProductEvent';
import { unmask } from '@/helpers/masks/cashNumber';
import { toPercentage } from '@/helpers/common/amount';
import { controllerEventProps } from '@/features/registerEvent/screens/SectorTicket/types';
import EventPhaseCompletion from '@/model/EventPhaseCompletion';
import {
  dataConfigStatesProps,
  formAllowPosProps,
  formPosProps,
  modalConfigPosProps,
  onShouldShowModalSectorPosProps,
} from '../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorProductPosContainerProps {
  nextTab: () => void;
  backTab: () => void;
  controllerEvent: controllerEventProps;
  phaseCompletion?: EventPhaseCompletion | undefined;
  handleGetEventPhaseCompletion: () => void;
}

type UrlParams = {
  id: string;
};

export const SectorPosScreen: React.FC<SectorProductPosContainerProps> = ({
  backTab,
  controllerEvent,
  handleGetEventPhaseCompletion,
}) => {
  const [state, setState] = useState<States>(States.default);
  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configPos,
  );
  const [form, setForm] = useState<any>({});
  const [configList, setConfigList] = useState<ProductSectionEvent[]>([]);
  const [pos, setPos] = useState<any>();
  const [posList, setPosList] = useState<any[]>([]);

  const [posOptions, setPosOptions] = useState<Pos[]>([]);

  const confirmDelete = useConfirmDelete();

  const params = useParams<UrlParams>();

  const {
    formData: formDataAllowPos,
    formErrors: formErrorsAllowPos,
    onChangeFormInput: onChangeFormInputAllowPos,
    isFormValid: isFormValidAllowPos,
  } = useForm({
    initialData: {
      allowPos: 'true',
    },
    validators: {
      allowPos: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
    resetForm: resetFormPos,
  } = useForm({
    initialData: {
      pos: '',
      waiter: '',
      commission: '',
      allowDiscount: '',
    },
    validators: {
      pos: [validators.required],
      waiter: [validators.required],
      commission: [validators.required],
      allowDiscount: [validators.required],
    },
    formatters: {},
  });

  const controllerFormPos: formPosProps = {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
  };

  const controllerFormAllowPos: formAllowPosProps = {
    formData: formDataAllowPos,
    formErrors: formErrorsAllowPos,
    onChangeFormInput: onChangeFormInputAllowPos,
    isFormValid: isFormValidAllowPos,
  };

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    pos: posSelected,
  }: onShouldShowModalSectorPosProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (value === ShouldShowModal.configPos) {
      if (posSelected) {
        setPos(posSelected);
      } else {
        setForm({});
      }
    }
  };

  const controllerModalConfig: modalConfigPosProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
  };

  const controllerDataConfig: dataConfigStatesProps = {
    form,
    setForm,
    configList,
  };

  const handleOnGetPos = async (productPos: any): Promise<void> => {
    try {
      if (productPos) {
        setPos(productPos);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditPos = (): void => {
    try {
      setPos(undefined);
      resetFormPos();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleGetPosList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/section-product/${id}/pos`);

      setPosList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetAllPos = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Pos[]>('/pos/find');
      setPosOptions(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetProducComboConfigList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/section-product/${id}/section`);

      setConfigList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnChangePosSwitch = async (posSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      const activedInput = posSelected.actived;

      await api.patch(
        `event/section-product/${params.id}/pos/${posSelected.pos.id}${
          activedInput ? '/disable' : '/enable'
        }`,
      );

      handleGetPosList(params.id);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const mergeObjects = (
    sourceA: { [key: string]: any },
    sourceB: { [key: string]: any },
  ): { [key: string]: any } => {
    const obj: { [key: string]: any } = {};
    const keys = Object.keys(sourceA).concat(Object.keys(sourceB));
    keys.forEach(key => {
      if (sourceA.hasOwnProperty(key)) obj[key] = sourceA[key];
      if (sourceB.hasOwnProperty(key)) obj[key] = sourceB[key];
      // if sourceA and sourceB have the same key, concat the values in a single object
      if (sourceA.hasOwnProperty(key) && sourceB.hasOwnProperty(key)) {
        obj[key] = {
          ...sourceA[key],
          ...sourceB[key],
        };
      }
    });
    return obj;
  };

  const handleOnSavePos = async (): Promise<void> => {
    if (form.products?.length > 0 || form.combos?.length > 0) {
      try {
        setState(States.loading);
        const productSameSection = form.products?.reduce((acc: any, item: any) => {
          const [sectionId, categoryGroupId, categorySubGroupId, productsId] = item.split('_');

          // push product to section
          if (acc[sectionId]) {
            acc[sectionId].products.push({
              id: productsId,
              categorySubGroup: {
                id: categorySubGroupId,
                categoryGroup: {
                  id: categoryGroupId,
                },
              },
            });
          } else {
            acc[sectionId] = {
              section: {
                id: sectionId,
              },
              products: [
                {
                  id: productsId,
                  categorySubGroup: {
                    id: categorySubGroupId,
                    categoryGroup: {
                      id: categoryGroupId,
                    },
                  },
                },
              ],
            };
          }

          return acc;
        }, {});

        let comboSameSection;
        if (form.combos) {
          comboSameSection = form.combos?.reduce((acc: any, item: any) => {
            const [sectionId, categoryGroupId, categorySubGroupId, combosId] = item.split('_');

            // push product to section
            if (acc[sectionId]) {
              acc[sectionId].combos.push({
                id: combosId,
                categorySubGroup: {
                  id: categorySubGroupId,
                  categoryGroup: {
                    id: categoryGroupId,
                  },
                },
              });
            } else {
              acc[sectionId] = {
                section: {
                  id: sectionId,
                },
                combos: [
                  {
                    id: combosId,
                    categorySubGroup: {
                      id: categorySubGroupId,
                      categoryGroup: {
                        id: categoryGroupId,
                      },
                    },
                  },
                ],
              };
            }

            return acc;
          }, {});
        }

        // const productSameSectionArray = Object.values(productSameSection);
        // const comboSameSectionArray = comboSameSection ? Object.values(comboSameSection) : [];

        let productAndComboSameSection = {};

        productAndComboSameSection = mergeObjects(productSameSection, comboSameSection);

        // format productAndComboSameSection to array
        productAndComboSameSection = Object.values(productAndComboSameSection);

        const payload = {
          pos: {
            id: formDataPos[FormInputNamePos.pos],
          },
          waiter: +unmask(formDataPos[FormInputNamePos.waiter]),
          commission: +unmask(formDataPos[FormInputNamePos.commission]),
          allowDiscount: convertToBoolean(formDataPos[FormInputNamePos.allowDiscount]),
          eventSections: productAndComboSameSection,
        };
        // if (productAndComboSameSection)
        //   payload = { ...payload, eventSections: productAndComboSameSection as any };
        // else if (comboSameSectionArray && comboSameSectionArray.length > 0)
        //   payload = { ...payload, eventSections: comboSameSectionArray as any };
        // else payload = { ...payload, eventSections: productSameSectionArray as any };

        const reponse = await api.post(`/event/section-product/${params.id}/pos`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');

        handleGetPosList(params.id);
        onToggle();
      } catch (error) {
        const err = error as AxiosError | any;
        toast.error(err.response?.data.message);
      } finally {
        setState(States.default);
      }
    } else {
      toast.error('É necessário selecionar pelo menos um produto ou combo!');
    }
  };

  const handleHasPos = async (b: string): Promise<void> => {
    try {
      setState(States.loading);
      await api.patch(`/event/pos/${params.id}/has/${b}`);
      handleGetEventPhaseCompletion();
    } finally {
      setState(States.default);
    }
  };

  const handleOnConfirmDeleteToPos = async (posSelected: Pos): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(`/event/section-product/${params?.id}/pos/${posSelected.id}`);

      toast.success('Pos excluído com sucesso!');
      confirmDelete.hide();
      handleGetPosList(params.id);
    } catch (error) {
      const err = error as AxiosError | any;
      throw new Error(err.response?.data.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnShowDeletePos = (posSelected: Pos): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteToPos(posSelected),
        },
      ],
    });
  };

  useEffect(() => {
    resetFormPos();

    if (pos) {
      onChangeFormInputPos(FormInputNamePos.pos)(String(pos.pos?.id));
      onChangeFormInputPos(FormInputNamePos.waiter)(toPercentage(pos.waiter));
      onChangeFormInputPos(FormInputNamePos.commission)(toPercentage(pos.commission));
      onChangeFormInputPos(FormInputNamePos.allowDiscount)(String(pos?.allowDiscount));

      const _products: any[] = [];
      const _combos: any[] = [];
      pos?.eventSections?.forEach(({ products, section }: any) => {
        products?.forEach(({ categorySubGroup, id }: any) => {
          _products.push(
            `${section?.id}_${categorySubGroup?.categoryGroup?.id}_${categorySubGroup?.id}_${id}`,
          );
        });
      });

      pos?.eventSections?.forEach(({ combos, section }: any) => {
        combos?.forEach(({ categorySubGroup, id }: any) => {
          _combos.push(
            `${section?.id}_${categorySubGroup?.categoryGroup?.id}_${categorySubGroup?.id}_${id}`,
          );
        });
      });

      setForm({
        products: _products,
        combos: _combos,
      });
    }
  }, [pos]);

  useEffect(() => {
    handleGetAllPos();
    handleGetPosList(params.id);
    handleGetProducComboConfigList(params.id);
  }, []);

  useEffect(() => {
    if (!visible) {
      handleOnCancelEditPos();
    }
  }, [visible]);

  return (
    <>
      <SectorPosContainer
        state={state}
        controllerModalConfig={controllerModalConfig}
        controllerFormPos={controllerFormPos}
        controllerFormAllowPos={controllerFormAllowPos}
        controllerEvent={controllerEvent}
        posList={posList}
        posOptions={posOptions}
        dataConfig={controllerDataConfig}
        backTab={backTab}
        handleOnSavePos={handleOnSavePos}
        handleOnShowDeletePos={handleOnShowDeletePos}
        handleOnChangePosSwitch={handleOnChangePosSwitch}
        handleOnGetPos={handleOnGetPos}
        handleOnCancelEditPos={handleOnCancelEditPos}
        posState={pos}
        setPosState={setPos}
        onHandleHasPos={handleHasPos}
      />
    </>
  );
};
