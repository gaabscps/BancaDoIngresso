import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface PaymentMethodsProviderProps {
  children: React.ReactNode;
}

interface PaymentMethodsState {
  idPaymentMethods: string;
  namePaymentMethods: string;
}

interface PaymentMethodsProviderValue {
  paymentMethodsState: PaymentMethodsState;
  onChange: (data: Partial<PaymentMethodsState>) => void;
  onClean: () => void;
}

const initialState: PaymentMethodsState = {
  idPaymentMethods: '',
  namePaymentMethods: '',
};

const PaymentMethodsContext = createContext<PaymentMethodsProviderValue>({
  paymentMethodsState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const PaymentMethodsProvider = ({ children }: PaymentMethodsProviderProps): JSX.Element => {
  const [paymentMethodsState, setPaymentMethodsState] = useState<PaymentMethodsState>(initialState);

  const onChange = useCallback((data: Partial<PaymentMethodsState>): void => {
    setPaymentMethodsState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setPaymentMethodsState(initialState);

  const providerValue = useMemo(
    () => ({ paymentMethodsState, onChange, onClean }),
    [paymentMethodsState, onChange, onClean],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <PaymentMethodsContext.Provider value={providerValue}>
      {children}
    </PaymentMethodsContext.Provider>
  );
};

export const usePaymentMethods = (): PaymentMethodsProviderValue =>
  useContext(PaymentMethodsContext);
