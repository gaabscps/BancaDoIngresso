import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface GroupSubgroupProductProviderProps {
  children: React.ReactNode;
}

interface GroupSubgroupProductState {
  idGroupSubgroupProduct: string;
  nameGroupSubgroupProduct: string;
}

interface GroupSubgroupProductProviderValue {
  groupSubgroupProductState: GroupSubgroupProductState;
  onChange: (data: Partial<GroupSubgroupProductState>) => void;
  onClean: () => void;
}

const initialState: GroupSubgroupProductState = {
  idGroupSubgroupProduct: '',
  nameGroupSubgroupProduct: '',
};

const GroupSubgroupProductContext = createContext<GroupSubgroupProductProviderValue>({
  groupSubgroupProductState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const GroupSubgroupProductProvider = ({ children }: GroupSubgroupProductProviderProps): JSX.Element => {
  const [groupSubgroupProductState, setGroupSubgroupProductState] = useState<GroupSubgroupProductState>(initialState);

  const onChange = useCallback((data: Partial<GroupSubgroupProductState>): void => {
    setGroupSubgroupProductState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setGroupSubgroupProductState(initialState);

  const providerValue = useMemo(
    () => ({ groupSubgroupProductState, onChange, onClean }),
    [groupSubgroupProductState, onChange, onClean],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GroupSubgroupProductContext.Provider value={providerValue}>{children}</GroupSubgroupProductContext.Provider>
  );
};

export const useGroupSubgroupProduct = (): GroupSubgroupProductProviderValue => useContext(GroupSubgroupProductContext);
