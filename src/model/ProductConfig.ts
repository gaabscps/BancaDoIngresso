export default interface Product {
  id?: string;
  name: string;
  imageBase64: string;
  productSubGroup: {
    id?: string;
    name: string;
    imageBase64?: string;
    productGroup: {
      id?: string;
      name: string;
      imageBase64: string;
    };
  };
}
