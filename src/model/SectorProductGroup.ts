import GroupProduct from './SubgruopProduct';

export default interface SectorProductGroup {
  id: string;
  name: string;
  imageBase64?: string;
  subgroup?: GroupProduct[];
}
