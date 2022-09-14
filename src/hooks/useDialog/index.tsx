import React, { useState, createContext, useContext, useCallback, useMemo } from 'react';
import { Dialog } from '@/components';

interface DialogProviderProps {
  children: React.ReactNode;
}

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
  position?: 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const DialogContext = createContext<DialogProviderValue>({
  show: () => undefined,
  hide: () => undefined,
});

export const DialogProvider = ({ children }: DialogProviderProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<Omit<DialogProviderValue, 'onClose' | 'visible'> | any>(
    {},
  );
  const [visible, setVisible] = useState(false);

  const show = useCallback((currentOptions: DialogOptions): void => {
    setOptions(currentOptions);
    setVisible(true);
  }, []);

  const hide = (): void => setVisible(false);

  const providerValue = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <DialogContext.Provider value={providerValue}>
      {children}
      {options.children && (
        <Dialog
          title={options.title}
          visible={visible}
          onClose={options.onClose ?? hide}
          onBtnAction={options.onBtnAction}
          btnLabel={options.btnLabel}
          isCard={options.isCard}
          position={options.position}
          size={options.size}
        >
          {options.children}
        </Dialog>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogProviderValue => useContext(DialogContext);
