// fuction to convert file to base64
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = error => {
      reject(error);
    };
  });
