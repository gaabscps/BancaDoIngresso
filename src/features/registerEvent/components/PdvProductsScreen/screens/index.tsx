import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import formatValueToCurrency from '@/helpers/common/mask';
import { DeleteContent } from '@/components/DeleteContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import ProductSectionEvent from '@/model/SectionProductEvent';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import EventPdvProduct from '@/model/EventPdvProduct';
import Pdv from '@/model/Pdv';
import EventSection from '@/model/EventSection';
import Section from '@/model/Section';
import Combo from '@/model/Combo';
import Product from '@/model/Product';
import { FormInputName, PdvProductContainer } from './ui';
import { formPdvProductProps } from '../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ProductAndComboType {
  PRODUCT,
  COMBO,
}
export interface ProductAndCombo {
  id: string;
  product: string;
  group: string;
  subGroup: string;
  amount: string;
  value: string;
  actions: string;
  type: ProductAndComboType;
}

export interface SectionProductsAndCombos {
  sectionId: string;
  sectionNome: string;
  productsAndCombos: ProductAndCombo[];
}

type UrlParams = {
  id: string;
};

interface SectorProductPosContainerProps {
  nextTab: () => void;
  backTab: () => void;
}

interface PdvProductScreenProps extends SectorProductPosContainerProps {
  pdvId?: string;
}

export const PdvProductScreen: React.FC<PdvProductScreenProps> = ({ pdvId, nextTab, backTab }) => {
  const params = useParams<UrlParams>();
  const [state, setState] = useState<States>(States.default);
  const [productSectionEvent, setProductSectionEvent] = useState<ProductSectionEvent[]>([]);
  const [originalSectionsProductsAndCombos, setOriginalSectionsProductsAndCombos] = useState<
    SectionProductsAndCombos[]
  >([]);
  const [sectionsProductsAndCombos, setSectionsProductsAndCombos] = useState<
    SectionProductsAndCombos[]
  >([]);
  const [sectionProduct, setSectionProduct] = useState<ProductAndCombo[]>([]);
  const [tableContent, setTableContent] = useState<SectionProductsAndCombos[]>([]);
  const [productsAndCombos, setProductsAndCombos] = useState<ProductAndCombo[]>([]);

  const addToSectionProductsAndCombos = (
    sectionId: string,
    sectionNome: string,
    productAndCombo: ProductAndCombo,
    sections: SectionProductsAndCombos[],
  ): SectionProductsAndCombos[] => {
    let found = false;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].sectionId === sectionId) {
        sections[i].productsAndCombos.push(productAndCombo);
        found = true;
        break;
      }
    }
    if (!found) {
      const section: SectionProductsAndCombos = {
        sectionId,
        sectionNome,
        productsAndCombos: [],
      };
      section.productsAndCombos.push(productAndCombo);
      sections.push(section);
    }
    return sections;
  };

  const toSectionProductsAndCombos = (
    response: ProductSectionEvent[],
  ): SectionProductsAndCombos[] => {
    let list: SectionProductsAndCombos[] = [];
    if (response && response.length > 0) {
      response.forEach(data => {
        if (data.sectionGroup && data.sectionGroup.length > 0) {
          data.sectionGroup.forEach(group => {
            if (group.subGroups && group.subGroups.length > 0) {
              group.subGroups.forEach(subGroup => {
                if (subGroup.products && subGroup.products.length > 0) {
                  subGroup.products.forEach(product => {
                    const productAndCombo: ProductAndCombo = {
                      id: product.id,
                      product: product.name,
                      group: group.categoryGroupName,
                      subGroup: subGroup.categorySubGroupName,
                      amount: `${product.amount}`,
                      value: formatValueToCurrency(String(product.unitValue)).masked,
                      actions: '',
                      type: ProductAndComboType.PRODUCT,
                    };
                    list = addToSectionProductsAndCombos(
                      data.sectionId,
                      data.sectionNome,
                      productAndCombo,
                      list,
                    );
                  });
                }
                if (subGroup.combos && subGroup.combos.length > 0) {
                  subGroup.combos.forEach(combo => {
                    const productAndCombo: ProductAndCombo = {
                      id: combo.id,
                      product: combo.name,
                      group: group.categoryGroupName,
                      subGroup: subGroup.categorySubGroupName,
                      amount: `${combo.amount}`,
                      value: formatValueToCurrency(String(combo.totalValue / combo.amount)).masked,
                      actions: '',
                      type: ProductAndComboType.COMBO,
                    };
                    list = addToSectionProductsAndCombos(
                      data.sectionId,
                      data.sectionNome,
                      productAndCombo,
                      list,
                    );
                  });
                }
              });
            }
          });
        }
      });
    }
    return list;
  };

  const getProductsAndCombos = async (): Promise<void> => {
    if (pdvId) {
      try {
        setState(States.loading);
        const responseTable = await api.get<ProductSectionEvent[]>(
          `/event/pdv/${params.id}/product/${pdvId}`,
        );
        const table = toSectionProductsAndCombos(responseTable.data);
        setTableContent(table);
        const response = await api.get<ProductSectionEvent[]>(
          `/event/section-product/${params.id}/section`,
        );
        setProductSectionEvent(response.data);
        const list = toSectionProductsAndCombos(response.data);
        const original = JSON.stringify(list);
        const originalList = JSON.parse(original);
        setOriginalSectionsProductsAndCombos(originalList);
        table.forEach(data => {
          // eslint-disable-next-line no-plusplus
          for (let e = 0; e < list.length; e++) {
            if (data.sectionId === list[e].sectionId) {
              data.productsAndCombos.forEach(productAndCombo => {
                let i = -1;
                // eslint-disable-next-line no-plusplus
                for (let g = 0; g < list[e].productsAndCombos.length; g++) {
                  if (productAndCombo.id === list[e].productsAndCombos[g].id) {
                    i = g;
                    break;
                  }
                }
                if (i >= 0) {
                  list[e].productsAndCombos.splice(i, 1);
                }
              });
            }
          }
        });
        setSectionsProductsAndCombos(list);
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
    }
  };

  const handleChangeSection = (sectionId: string): void => {
    let list: ProductAndCombo[] = [];
    sectionsProductsAndCombos.forEach(data => {
      if (data.sectionId === sectionId) {
        list = data.productsAndCombos;
      }
    });
    setProductsAndCombos(list);
  };

  const {
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
    resetForm: resetFormProduct,
  } = useForm({
    initialData: {
      allowProduct: 'true',
      sector: '',
      product: '',
    },
    validators: {
      allowProduct: [validators.required],
      sector: [validators.required],
      product: [validators.required],
    },
    formatters: {},
  });

  const controllerFormPos: formPdvProductProps = {
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    sections: productSectionEvent,
    productsAndCombos,
    tableContent,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
  };
  const confirmDelete = useConfirmDelete();

  const handleOnAddAll = async (): Promise<void> => {
    const sectionSelected = formDataProduct[FormInputName.sector];
    if (sectionSelected) {
      let list: ProductAndCombo[] = [];
      sectionsProductsAndCombos.forEach(data => {
        if (data.sectionId === sectionSelected) {
          list = data.productsAndCombos;
        }
      });
      if (!list || list.length === 0) {
        toast.warn('Não existem produtos a serem adcionados para esse setor');
      } else {
        try {
          setState(States.loading);
          const pdv = {
            id: pdvId,
          } as Pdv;
          const eventSections: EventSection[] = [];
          const section = {
            id: sectionSelected,
          } as Section;
          const eventSection: EventSection = {
            section,
            products: [],
            combos: [],
          };
          list.forEach(data => {
            if (data.type === ProductAndComboType.PRODUCT) {
              const product = {
                id: data.id,
              } as Product;
              eventSection.products.push(product);
            } else if (data.type === ProductAndComboType.COMBO) {
              const combo = {
                id: data.id,
              } as Combo;
              eventSection.combos.push(combo);
            }
          });
          eventSections.push(eventSection);

          const eventPdvProduct: EventPdvProduct = {
            pdv,
            eventSections,
          };
          await api.post(`/event/pdv/${params.id}/product`, eventPdvProduct);
          await getProductsAndCombos();
          resetFormProduct();
        } catch (error) {
          const err = error as AxiosError;
          toast.error(err.message);
        } finally {
          setState(States.default);
        }
      }
    } else {
      isFormValidProduct();
    }
  };

  const handleOnAddProduct = async (): Promise<void> => {
    if (isFormValidProduct()) {
      try {
        const sectionSelected = formDataProduct[FormInputName.sector];
        const productSelected = formDataProduct[FormInputName.product];
        const list: ProductAndCombo[] = [];
        sectionsProductsAndCombos.forEach(data => {
          if (data.sectionId === sectionSelected) {
            data.productsAndCombos.forEach(product => {
              if (product.id === productSelected) {
                list.push(product);
              }
            });
          }
        });
        if (!list || list.length === 0) {
          toast.warn('Não existem produtos a serem adcionados para esse setor');
        } else {
          setState(States.loading);
          const pdv = {
            id: pdvId,
          } as Pdv;
          const eventSections: EventSection[] = [];
          const section = {
            id: sectionSelected,
          } as Section;
          const eventSection: EventSection = {
            section,
            products: [],
            combos: [],
          };
          list.forEach(data => {
            if (data.type === ProductAndComboType.PRODUCT) {
              const product = {
                id: data.id,
              } as Product;
              eventSection.products.push(product);
            } else if (data.type === ProductAndComboType.COMBO) {
              const combo = {
                id: data.id,
              } as Combo;
              eventSection.combos.push(combo);
            }
          });
          eventSections.push(eventSection);

          const eventPdvProduct: EventPdvProduct = {
            pdv,
            eventSections,
          };
          await api.post(`/event/pdv/${params.id}/product`, eventPdvProduct);
          await getProductsAndCombos();
          resetFormProduct();
        }
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
    }
  };

  const handleOnConfirmDelete = async (sectionId: string, productId: string): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(
        `/event/pdv/${params.id}/product/${pdvId}/section/${sectionId}/${productId}`,
      );
      await getProductsAndCombos();
      toast.success('Setor e produtos excluídos com sucesso!');
      confirmDelete.hide();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnCancelEditProduct = (): void => {
    try {
      setSectionProduct([]);
      setProductsAndCombos([]);
      resetFormProduct();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnEditProduct = (sectionId: string, productId: string): void => {
    let list: ProductAndCombo[] = [];
    originalSectionsProductsAndCombos.forEach(data => {
      if (data.sectionId === sectionId) {
        list = data.productsAndCombos;
      }
    });
    setSectionProduct(list);
    setProductsAndCombos(list);
    onChangeFormInputProduct(FormInputName.sector)(sectionId);
    onChangeFormInputProduct(FormInputName.product)(productId);
  };

  const handleOnShowDeleteProduct = (sectionId: string, productId: string): void => {
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
          onClick: (): void => {
            handleOnConfirmDelete(sectionId, productId);
          },
        },
      ],
    });
  };

  useEffect(() => {
    getProductsAndCombos();
  }, [pdvId]);

  useEffect(() => {
    getProductsAndCombos();
  }, []);

  return (
    <>
      <PdvProductContainer
        state={state}
        controllerFormPos={controllerFormPos}
        sectionProduct={sectionProduct}
        onChangeSection={handleChangeSection}
        onAddAll={handleOnAddAll}
        onAddProduct={handleOnAddProduct}
        onEditProduct={handleOnEditProduct}
        onShowDeleteProduct={handleOnShowDeleteProduct}
        onCancelEdit={handleOnCancelEditProduct}
        nextTab={nextTab}
        backTab={backTab}
      />
    </>
  );
};
