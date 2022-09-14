import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface PosProviderProps {
  children: React.ReactNode;
}

interface PosState {
  idPos: string;
  namePos: string;
}

interface PosProviderValue {
  posState: PosState;
  onChange: (data: Partial<PosState>) => void;
  onClean: () => void;
}

const initialState: PosState = {
  idPos: '',
  namePos: '',
};

const PosContext = createContext<PosProviderValue>({
  posState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const PosProvider = ({ children }: PosProviderProps): JSX.Element => {
  const [posState, setPosState] = useState<PosState>(initialState);

  const onChange = useCallback((data: Partial<PosState>): void => {
    setPosState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setPosState(initialState);

  const providerValue = useMemo(
    () => ({ posState, onChange, onClean }),
    [posState, onChange, onClean],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <PosContext.Provider value={providerValue}>{children}</PosContext.Provider>
  );
};

export const usePos = (): PosProviderValue => useContext(PosContext);
