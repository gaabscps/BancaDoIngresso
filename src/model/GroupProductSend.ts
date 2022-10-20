import SubGrupSend from './SubGrupSend';

export default interface GroupProductSend {
  productGroupId: string;
  productGroupName: string;
  subGroups: SubGrupSend[];
}
