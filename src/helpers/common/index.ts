const DateToEN = (value: string): string => value.split('/').reverse().join('-');

const DateToPTBR = (value: string): string => value.split('-').reverse().join('/');

const EncodedBase64Image = (value: string): string => `data:image/gif;base64,${value}`;

export { DateToEN, DateToPTBR, EncodedBase64Image };
