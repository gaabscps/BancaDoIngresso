/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/extensions */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import { Checkbox } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import React, { Fragment, useEffect, useState } from 'react';
import { SectorProductPosContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export const PosConfigContent: React.FC<
  Pick<SectorProductPosContainerProps, 'dataConfig' | 'controllerEvent'>
> = ({ dataConfig, controllerEvent }) => {
  const [arrProducts, setArrProducts] = useState([]);
  const [selectedAll, setSelectedAll] = useState([]);

  const checkSelectedAll = (value: string) => {
    const { sectionGroup, sectionId }: any = controllerEvent.sectionList.find(
      ({ sectionId }: any) => value.includes(sectionId),
    );

    const _products = [];
    const _combos = [];

    sectionGroup.map(({ subGroups, categoryGroupId }: any) =>
      subGroups.map(({ products, combos, categorySubGroupId }: any) => {
        products.map(({ id }: any) => {
          _products.push(`${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`);
        });

        combos.map(({ id }: any) => {
          _combos.push(`${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`);
        });
      }),
    );

    const countProducts = dataConfig.form?.products?.filter((name: string) =>
      name.includes(sectionId),
    ).length;
    const countCombos = dataConfig.form?.combos?.filter((name: string) =>
      name.includes(sectionId),
    ).length;

    const _selectAll = selectedAll || [];

    if (_products.length === countProducts && _combos.length === countCombos) {
      _selectAll.push(sectionId as never);
    } else {
      const findedIndex = _selectAll.findIndex((name: string) => name.includes(sectionId));
      if (findedIndex !== -1) _selectAll.splice(findedIndex, 1);
    }

    setSelectedAll(_selectAll);
  };

  const handleChange = (name: string, value: string) => {
    const key = dataConfig.form[name] || [];
    const findedIndex = key.findIndex((id: string) => id.includes(value));
    if (findedIndex !== -1) key.splice(findedIndex, 1);
    else key.push(value);

    dataConfig.setForm({
      ...dataConfig.form,
      [name]: key,
    });

    checkSelectedAll(value);
  };

  const selectAll = (index: number) => {
    const { sectionGroup, sectionId } = dataConfig.configList[index];
    const _products = dataConfig.form.products || [];
    const _combos = dataConfig.form.combos || [];
    const _selectAll = selectedAll || [];

    if (selectedAll.includes(sectionId as never)) {
      // Remove all products and combos associated with the sectionId from the form data
      const filteredProducts = _products.filter((name: string) => !name.includes(sectionId));
      const filteredCombos = _combos.filter((name: string) => !name.includes(sectionId));

      // Update the form data with the filtered products and combos
      dataConfig.setForm({
        ...dataConfig.form,
        products: filteredProducts,
        combos: filteredCombos,
      });

      // Remove the sectionId from the selectedAll array
      const findedIndex = _selectAll.findIndex((name: string) => name.includes(sectionId));
      _selectAll.splice(findedIndex, 1);
    } else {
      const newProducts: any[] = [];
      const newCombos: any[] = [];

      sectionGroup.map(({ subGroups, categoryGroupId }: any) =>
        subGroups.map(({ products, combos, categorySubGroupId }: any) => {
          products.map(({ id }: any) => {
            newProducts.push(`${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`);
          });

          combos.map(({ id }: any) => {
            newCombos.push(`${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`);
          });
        }),
      );

      // Update the form data with the new products and combos
      dataConfig.setForm({
        ...dataConfig.form,
        products: [..._products, ...newProducts],
        combos: [..._combos, ...newCombos],
      });

      // Add the sectionId to the selectedAll array
      _selectAll.push(sectionId as never);
    }
    setSelectedAll(_selectAll);
  };

  useEffect(() => {
    const _products: any[] | ((prevState: never[]) => never[]) = [];
    controllerEvent.sectionList.map(({ sectionId, sectionNome, sectionGroup }: any) => {
      _products.push({ sectionId, sectionNome, sectionGroup });
    });

    setArrProducts(_products as never[]);
  }, []);

  return (
    <Fragment>
      <h6 className="mb-4">Selecione os setores e produtos que esta POS poderá vender</h6>
      {!!arrProducts.length &&
        arrProducts.map(({ sectionId, sectionNome, sectionGroup }: any, index) => (
          <div key={index}>
            <SuperCollapse
              title={sectionNome}
              leftIcon={
                <Checkbox
                  name={`${sectionNome}`}
                  checked={
                    selectedAll.includes(sectionId as never) ||
                    dataConfig.form?.combos?.reduce(
                      (acc: boolean, name: string) => acc || name.includes(sectionId as never),
                      false,
                    ) ||
                    dataConfig.form?.products?.reduce(
                      (acc: boolean, name: string) => acc || name.includes(sectionId as never),
                      false,
                    )
                  }
                  onChange={() => {
                    selectAll(index);
                  }}
                />
              }
              content={
                <>
                  {sectionGroup?.map(({ categoryGroupId, categoryGroupName, subGroups }: any) =>
                    subGroups?.map(
                      ({ categorySubGroupId, categorySubGroupName, products, combos }: any) => (
                        <Fragment key={categorySubGroupId}>
                          <p className="text-black-regular mb-4">{`${categoryGroupName} - ${categorySubGroupName}`}</p>
                          {!!products.length && (
                            <div className="mb-3">
                              <div className="mb-4">
                                <span className="text-black-light">Produtos</span>
                              </div>
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1fr 1fr 1fr',
                                  alignItems: 'center',
                                }}
                              >
                                {!!products.length &&
                                  products.map(({ id, name }: { id: string; name: string }) => (
                                    <div className="dataConfig.form-check" key={id}>
                                      <Checkbox
                                        label={name}
                                        name={`${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`}
                                        checked={dataConfig.form?.products?.includes(
                                          `${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`,
                                        )}
                                        onChange={() =>
                                          handleChange(
                                            'products',
                                            `${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`,
                                          )
                                        }
                                      />
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                          {!!combos.length && (
                            <div>
                              <div className="mb-4">
                                <span className="text-black-light">Combos</span>
                              </div>
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1fr 1fr 1fr',
                                  alignItems: 'center',
                                }}
                              >
                                {combos.map(({ id, name }: { id: string; name: string }) => (
                                  <>
                                    <div className="dataConfig.form-check mb-4" key={id}>
                                      <Checkbox
                                        label={name}
                                        name={`${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`}
                                        checked={dataConfig.form?.combos?.includes(
                                          `${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`,
                                        )}
                                        onChange={() =>
                                          handleChange(
                                            'combos',
                                            `${sectionId}_${categoryGroupId}_${categorySubGroupId}_${id}`,
                                          )
                                        }
                                      />
                                    </div>
                                  </>
                                ))}
                              </div>
                            </div>
                          )}
                        </Fragment>
                      ),
                    ),
                  )}
                </>
              }
            />
          </div>
        ))}
    </Fragment>
  );
};
