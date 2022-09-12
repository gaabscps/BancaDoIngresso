import React, { useState, createContext, useContext } from 'react';
import { Dialog } from '@/components';

interface DialogProviderValue {
  show(options: DialogOptions): void;
  hide(): void;
}

interface DialogOptions {
  title: React.ReactNode;
  children: React.ReactNode;
  onBtnAction?: () => void;
  btnLabel?: string;
  isCard?: boolean;
  visible?: boolean;
  onClose?: () => void;
}

const DialogContext = createContext<DialogProviderValue>({
  show: () => undefined,
  hide: () => undefined,
});

export const useDialog = (): DialogProviderValue => useContext(DialogContext);

const DialogProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [options, setOptions] = useState<Omit<DialogProviderValue, 'onClose' | 'visible'> | any>(
    {},
  );
  const [visible, setVisible] = useState(false);

  const show = (currentOptions: DialogOptions): void => {
    setOptions(currentOptions);
    setVisible(true);
  };

  const hide = (): void => {
    setVisible(false);
  };

  return (
    <DialogContext.Provider value={{ show, hide }}>
      {children}
      {options.children && (
        <Dialog
          title={options.title}
          visible={visible}
          onClose={options.onClose ?? hide}
          onBtnAction={options.onBtnAction}
          btnLabel={options.btnLabel}
        >
          {options.children}
        </Dialog>
      )}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
