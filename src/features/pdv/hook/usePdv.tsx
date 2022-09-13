import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface PdvProviderProps {
  children: React.ReactNode;
}

interface PdvState {
  idPdv: string;
  namePdv: string;
  idSubPdv: string;
}

interface PdvProviderValue {
  pdvState: PdvState;
  onChange: (data: Partial<PdvState>) => void;
  onClean: () => void;
}

const initialState: PdvState = {
  idPdv: '',
  namePdv: '',
  idSubPdv: '',
};

const PdvContext = createContext<PdvProviderValue>({
  pdvState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const PdvProvider = ({ children }: PdvProviderProps): JSX.Element => {
  const [pdvState, setPdvState] = useState<PdvState>(initialState);

  const onChange = useCallback((data: Partial<PdvState>): void => {
    setPdvState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setPdvState(initialState);

  const providerValue = useMemo(
    () => ({ pdvState, onChange, onClean }),
    [pdvState, onChange, onClean],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <PdvContext.Provider value={providerValue}>{children}</PdvContext.Provider>
  );
};

export const usePdv = (): PdvProviderValue => useContext(PdvContext);
