import { createContext, useCallback, useContext, useState } from 'react';

interface PdvState {
  id: string;
  document: string;
}

interface PdvProviderValue {
  pdvState: PdvState;
  onChange: (data: Partial<PdvState>) => void;
  onClean: () => void;
}

const initialState: PdvState = {
  id: '',
  document: '005.075.572-20',
};

const PdvContext = createContext<PdvProviderValue>({
  pdvState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const PdvProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [pdvState, setPdvState] = useState<PdvState>(initialState);

  const onChange = useCallback((data: Partial<PdvState>): void => {
    setPdvState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setPdvState(initialState);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <PdvContext.Provider value={{ pdvState, onChange, onClean }}>{children}</PdvContext.Provider>
  );
};

export const usePdv = (): PdvProviderValue => useContext(PdvContext);
