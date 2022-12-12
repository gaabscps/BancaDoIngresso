export default interface EventGroupSubgroup {
  categoryGroupId: string;
  categoryGroupName: string;
  subGroups: [
    {
      productSubGroupId: string;
      productSubGroupName: string;
    },
  ];
}
