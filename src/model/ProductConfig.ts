export default interface Product {
  id?: string;
  name: string;
  imageBase64: string;
  categorySubGroup: {
    id?: string;
    name: string;
    imageBase64?: string;
    categoryGroup: {
      id?: string;
      name: string;
      imageBase64: string;
    };
  };
}
