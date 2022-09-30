import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface GroupProductProviderProps {
  children: React.ReactNode;
}

interface GroupProductState {
  idGroupProduct: string;
  nameGroupProduct: string;
}

interface GroupProductProviderValue {
  groupProductState: GroupProductState;
  onChange: (data: Partial<GroupProductState>) => void;
  onClean: () => void;
}

const initialState: GroupProductState = {
  idGroupProduct: '',
  nameGroupProduct: '',
};

const GroupProductContext = createContext<GroupProductProviderValue>({
  groupProductState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const GroupProductProvider = ({ children }: GroupProductProviderProps): JSX.Element => {
  const [groupProductState, setGroupProductState] = useState<GroupProductState>(initialState);

  const onChange = useCallback((data: Partial<GroupProductState>): void => {
    setGroupProductState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setGroupProductState(initialState);

  const providerValue = useMemo(
    () => ({ groupProductState, onChange, onClean }),
    [groupProductState, onChange, onClean],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GroupProductContext.Provider value={providerValue}>{children}</GroupProductContext.Provider>
  );
};

export const useGroupProduct = (): GroupProductProviderValue => useContext(GroupProductContext);
