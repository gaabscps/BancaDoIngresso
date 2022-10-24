import SubGrupSend from './SubGrupSend';

export default interface GroupProductSend {
  categoryGroupId: string;
  categoryGroupName: string;
  subGroups: SubGrupSend[];
}
