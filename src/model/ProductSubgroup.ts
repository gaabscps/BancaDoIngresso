export default interface ProductSubgroup {
  productGroupId: string;
  productGroupName: string;
  subGroups: [
    {
      productSubGroupId: string;
      productSubGroupName: string;
    },
  ];
}
