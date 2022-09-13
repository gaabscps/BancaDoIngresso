import React from 'react';

import { useDialog } from '@/hooks/useDialog';
import { usePdv } from '@/features/pdv/hook/usePdv';
import { RegisterContent } from '@/features/pdv/components/RegisterContent';
// import { EditContent } from '@/features/pdv/components/EditContent';
// import api from '@/services/api';
// import Pdv from '@/model/Pdv';
import { PdvContainer } from './ui';

export const PdvScreen: React.FC = (): JSX.Element => {
  const dialog = useDialog();
  const { pdvState, onChange } = usePdv();

  // const [pvd, setPvd] = React.useState(null);
  // const [listPdv, setListPvd] = React.useState([]);

  const handleOnClose = (): void => dialog.hide();

  const handleOnRegister = (value: any): void => {
    console.log('pdvState aqui!!', pdvState.document);
    console.log('logou!!', value);

    onChange({ document: value.document });
    // handleOnClose();
  };

  // const handleOnEditSave = (): void => {
  //   console.log('logou!!');
  // };

  const handleOnShowRegister = (): void => {
    dialog.show({
      title: 'Cadastro de PDV',
      children: <RegisterContent document={pdvState.document} onSubmit={handleOnRegister} />,
      onClose: handleOnClose,
    });
  };

  // const handleOnShowEditPdv = (value: any): Promise<void> => {
  //   // TODO: api call
  //   const { data } = await api.get(`/pdv/${value.id}`);

  //   dialog.show({
  //     title: 'Editar PDV',
  //     children: <EditContent data={data} onSubmit={handleOnEditSave} />,
  //     onClose: handleOnClose,
  //   });
  // };

  return <PdvContainer document={pdvState.document} onShowRegister={handleOnShowRegister} />;
};
