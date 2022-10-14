export default interface SubgroupProduct {
  id?: string;
  name: string;
  imageBase64?: string;
  productGroup?: {
    id: string;
    name: string;
    imageBase64?: string;
  };
}
