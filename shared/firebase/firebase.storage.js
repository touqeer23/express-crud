
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

async function uploadToFirebaseStorage(file, fileName) {
    const modifiedFileName = `files/${new Date().toISOString()}${fileName}`;
    const storage = getStorage();
    const storageRef = ref(storage, modifiedFileName);
    await uploadBytes(storageRef, file);
    const returnedUrl = await getDownloadURL(ref(storage, modifiedFileName));
    return returnedUrl;
}

module.exports = { uploadToFirebaseStorage };