import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface EventProviderProps {
  children: React.ReactNode;
}

interface EventState {
  id: string;
  currentStep: number;
}

interface EventProviderValue {
  eventState: EventState;
  onChange: (data: Partial<EventState>) => void;
  onClean: () => void;
}

const initialState: EventState = {
  id: '',
  currentStep: 2,
};

const EventContext = createContext<EventProviderValue>({
  eventState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const EventProvider = ({ children }: EventProviderProps): JSX.Element => {
  const [eventState, setEventState] = useState<EventState>(initialState);

  const onChange = useCallback((data: Partial<EventState>): void => {
    setEventState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setEventState(initialState);

  const providerValue = useMemo(
    () => ({ eventState, onChange, onClean }),
    [eventState, onChange, onClean],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <EventContext.Provider value={providerValue}>{children}</EventContext.Provider>
  );
};

export const useEvent = (): EventProviderValue => useContext(EventContext);
