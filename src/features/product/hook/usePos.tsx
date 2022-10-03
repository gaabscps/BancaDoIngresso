import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ProductProviderProps {
  children: React.ReactNode;
}

interface ProductState {
  idProduct: string;
  nameProduct: string;
}

interface ProductProviderValue {
  productState: ProductState;
  onChange: (data: Partial<ProductState>) => void;
  onClean: () => void;
}

const initialState: ProductState = {
  idProduct: '',
  nameProduct: '',
};

const ProductContext = createContext<ProductProviderValue>({
  productState: initialState,
  onChange: () => undefined,
  onClean: () => undefined,
});

export const ProductProvider = ({ children }: ProductProviderProps): JSX.Element => {
  const [productState, setProductState] = useState<ProductState>(initialState);

  const onChange = useCallback((data: Partial<ProductState>): void => {
    setProductState(previousState => ({ ...previousState, ...data }));
  }, []);

  const onClean = (): void => setProductState(initialState);

  const providerValue = useMemo(
    () => ({ productState, onChange, onClean }),
    [productState, onChange, onClean],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ProductContext.Provider value={providerValue}>{children}</ProductContext.Provider>
  );
};

export const useProduct = (): ProductProviderValue => useContext(ProductContext);
