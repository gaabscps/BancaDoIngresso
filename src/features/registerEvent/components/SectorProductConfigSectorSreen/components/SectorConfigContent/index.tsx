/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import { Checkbox } from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import React, { Fragment, useEffect, useState } from 'react';
import { SectorProductConfigSectorContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export const SectorConfigContent: React.FC<
  Pick<SectorProductConfigSectorContainerProps, 'dataConfig'>
> = ({ dataConfig }) => {
  const [arrProducts, setArrProducts] = useState([]);
  const [selectedAll, setSelectedAll] = useState([]);

  const checkSelectedAll = (value: string) => {
    const { subGroups } = dataConfig.configList.find(({ categoryGroupId }) =>
      value.includes(categoryGroupId),
    );
    const {
      categorySubGroupId,
      products,
      combos,
    }: { categorySubGroupId: string; products: any; combos: any } = subGroups.find(
      ({ categorySubGroupId }: any) => value.includes(categorySubGroupId),
    );

    const countProducts = dataConfig.form?.products?.filter((name: string) =>
      name.includes(categorySubGroupId),
    ).length;

    const countCombos = dataConfig.form?.combos?.filter((name: string) =>
      name.includes(categorySubGroupId),
    ).length;

    const _selectAll = selectedAll || [];

    if (products.length === countProducts && combos.length === countCombos) {
      _selectAll.push(categorySubGroupId as never);
    } else {
      const findedIndex = _selectAll.findIndex((name: string) => name.includes(categorySubGroupId));
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
    const { products, combos, categoryGroupId, categorySubGroupId }: any = arrProducts[index];

    const _products = dataConfig.form.products || [];
    const _combos = dataConfig.form.combos || [];
    const _selectAll = selectedAll || [];

    if (selectedAll.includes(categorySubGroupId as never)) {
      const filteredProducts = _products.filter(
        (name: string) => !name.includes(categorySubGroupId),
      );

      const filteredCombos = _combos.filter((name: string) => !name.includes(categorySubGroupId));

      dataConfig.setForm({
        ...dataConfig.form,
        products: filteredProducts,
        combos: filteredCombos,
      });

      const findedIndex = _selectAll.findIndex((name: string) => name.includes(categorySubGroupId));
      _selectAll.splice(findedIndex, 1);
    } else {
      const filteredProducts = _products.filter(
        (name: string) => !name.includes(categorySubGroupId),
      );
      const newProducts = products.map(
        ({ id }: any) => `${categoryGroupId}_${categorySubGroupId}_${id}`,
      );

      const filteredCombos = _combos.filter((name: string) => !name.includes(categorySubGroupId));
      const newCombos = combos.map(
        ({ id }: any) => `${categoryGroupId}_${categorySubGroupId}_${id}`,
      );

      dataConfig.setForm({
        ...dataConfig.form,
        products: [...filteredProducts, ...newProducts],
        combos: [...filteredCombos, ...newCombos],
      });

      _selectAll.push(categorySubGroupId as never);
    }

    setSelectedAll(_selectAll);
  };

  useEffect(() => {
    const _products: any[] | ((prevState: never[]) => never[]) = [];
    dataConfig.configList.map(({ categoryGroupId, categoryGroupName, subGroups }) => {
      subGroups.map((subgroup: any) => {
        _products.push({ categoryGroupId, categoryGroupName, ...subgroup });
      });
    });

    setArrProducts(_products as never[]);
  }, []);

  return (
    <Fragment>
      <h6 className="mb-4">Selecione os produtos e combos que este setor poderá vender</h6>
      {arrProducts.length
        ? arrProducts.map(
            (
              {
                categoryGroupId,
                categoryGroupName,
                categorySubGroupId,
                categorySubGroupName,
                combos,
                products,
              }: any,
              index,
            ) => (
              <Fragment key={index}>
                <SuperCollapse
                  title={`${categoryGroupName} // ${categorySubGroupName}`}
                  leftIcon={() => (
                    <Checkbox
                      name={`${categoryGroupName} + ${categorySubGroupName}`}
                      checked={selectedAll.includes(categorySubGroupId as never)}
                      onChange={() => {
                        selectAll(index);
                      }}
                      onClick={e => e.stopPropagation()}
                    />
                  )}
                  content={
                    <>
                      {!!products.length && (
                        <div className="mb-3">
                          <div className="mb-4">
                            <span className="text-dark">Produtos</span>
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
                                    name={name}
                                    checked={dataConfig.form?.products?.includes(
                                      `${categoryGroupId}_${categorySubGroupId}_${id}`,
                                    )}
                                    onChange={() =>
                                      handleChange(
                                        'products',
                                        `${categoryGroupId}_${categorySubGroupId}_${id}`,
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
                            <span className="text-dark">Combos</span>
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
                                <div className="dataConfig.form-check" key={id}>
                                  <Checkbox
                                    label={name}
                                    name={name}
                                    checked={dataConfig.form?.combos?.includes(
                                      `${categoryGroupId}_${categorySubGroupId}_${id}`,
                                    )}
                                    onChange={() =>
                                      handleChange(
                                        'combos',
                                        `${categoryGroupId}_${categorySubGroupId}_${id}`,
                                      )
                                    }
                                  />
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  }
                />
              </Fragment>
            ),
          )
        : 'Nenhum produto ou combo encontrado'}
    </Fragment>
  );
};
