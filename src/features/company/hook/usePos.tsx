import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface CompanyProviderProps {
  children: React.ReactNode;
}

interface CompanyState {
  idCompany: string;
  nameCompany: string;
}

interface CompanyProviderValue {
  posState: CompanyState;
  onChange: (data: Partial<CompanyState>) => void;
  onClean: () => void;
}

const initialState: CompanyState = {
  idCompany: '',
  nameCompany: '',
};

const CompanyContext = createContext<CompanyProviderValue>({
  posState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const CompanyProvider = ({ children }: CompanyProviderProps): JSX.Element => {
  const [posState, setCompanyState] = useState<CompanyState>(initialState);

  const onChange = useCallback((data: Partial<CompanyState>): void => {
    setCompanyState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setCompanyState(initialState);

  const providerValue = useMemo(
    () => ({ posState, onChange, onClean }),
    [posState, onChange, onClean],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <CompanyContext.Provider value={providerValue}>{children}</CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyProviderValue => useContext(CompanyContext);
