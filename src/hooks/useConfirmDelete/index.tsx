import React, { useState, createContext, useContext, useMemo } from 'react';
import { Dialog, DialogProps } from '@/components/Dialog';

interface ConfirmDeleteProps {
  children: React.ReactNode;
}

interface ConfirmDeleteProviderValue {
  show(options: Omit<DialogProps, 'onClose' | 'visible'>): void;
  hide(): void;
}

const ConfirmDeleteContext = createContext<ConfirmDeleteProviderValue>({
  show: () => undefined,
  hide: () => undefined,
});

export const ConfirmDeleteProvider = ({ children }: ConfirmDeleteProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<
    Omit<ConfirmDeleteProviderValue, 'onClose' | 'visible'> | any
  >({});
  const [visible, setVisible] = useState(false);

  const show = (newOptions: DialogProps): void => {
    setOptions(newOptions);
    setVisible(true);
  };

  const hide = (): void => setVisible(false);

  const providerValue = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <ConfirmDeleteContext.Provider value={providerValue}>
      {children}
      {options.children && (
        <Dialog
          title={options.title}
          visible={visible}
          onClose={options.onClose ?? hide}
          isContentWithCard={options.isContentWithCard}
          position={options.position}
          size="lg"
          actions={options.actions}
        >
          {options.children}
        </Dialog>
      )}
    </ConfirmDeleteContext.Provider>
  );
};

export const useConfirmDelete = (): ConfirmDeleteProviderValue => useContext(ConfirmDeleteContext);
