export default interface EventGroupSubgroup {
  id?: string;
  name: string;
  imageBase64: string;
  subGroups: [
    {
      id?: string;
      name: string;
      imageBase64: string;
      categoryGroup: {
        id: string;
        name: string;
        imageBase64: string;
      };
    },
  ];
}
