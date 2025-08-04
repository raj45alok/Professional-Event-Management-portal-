
export const uploadToS3 = async (file) => {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: URL.createObjectURL(file),
        key: `mock-upload/${file.name}`
      });
    }, 1000);
  });
};
