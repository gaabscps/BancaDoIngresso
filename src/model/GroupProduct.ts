export default interface GroupProduct {
  productGroupId: string;
  productGroupName: string;
  subGroups: [
    {
      productSubGroupId: string;
      productSubGroupName: string;
    },
  ];
}
