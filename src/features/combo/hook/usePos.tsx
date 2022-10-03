import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ComboProviderProps {
  children: React.ReactNode;
}

interface ComboState {
  idCombo: string;
  nameCombo: string;
}

interface ComboProviderValue {
  comboState: ComboState;
  onChange: (data: Partial<ComboState>) => void;
  onClean: () => void;
}

const initialState: ComboState = {
  idCombo: '',
  nameCombo: '',
};

const ComboContext = createContext<ComboProviderValue>({
  comboState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const ComboProvider = ({ children }: ComboProviderProps): JSX.Element => {
  const [comboState, setComboState] = useState<ComboState>(initialState);

  const onChange = useCallback((data: Partial<ComboState>): void => {
    setComboState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setComboState(initialState);

  const providerValue = useMemo(
    () => ({ comboState, onChange, onClean }),
    [comboState, onChange, onClean],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ComboContext.Provider value={providerValue}>{children}</ComboContext.Provider>
  );
};

export const useCombo = (): ComboProviderValue => useContext(ComboContext);
