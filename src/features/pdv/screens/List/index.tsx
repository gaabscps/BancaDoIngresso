import React from 'react';

import { useDialog } from '@/hooks/useDialog';
import { RegisterContent } from '@/features/pdv/components/RegisterContent';
import { PdvContainer } from './ui';

export const PdvScreen: React.FC = (): JSX.Element => {
  const dialog = useDialog();

  const isValidFormRegister = handleOnRegisterFormValid();

  const handleOnClose = (): void => dialog.hide();

  const handleOnRegister = (): void => {
    if (isValidFormRegister) {
      console.log('enviar dado api');
    } else {
      console.log('não enviar dado api');
    }
  };

  const handleOnShowRegister = (): void => {
    dialog.show({
      title: 'Cadastro de PDV',
      children: <RegisterContent onSubmit={handleOnRegisterFormValid} />,
      onClose: handleOnClose,
      btnLabel: 'Salvar',
      onBtnAction: () => handleOnRegister(),
    });
  };

  return <PdvContainer onShowRegister={handleOnShowRegister} />;
};
