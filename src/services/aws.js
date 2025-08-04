// src/services/aws.js
export const uploadToS3 = async (file) => {
  // Mock function - replace with real AWS SDK in Session 3
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: URL.createObjectURL(file),
        key: `mock-upload/${file.name}`
      });
    }, 1000);
  });
};