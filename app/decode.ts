import { PUBLIC_MUSIC_ENDPOINT, PUBLIC_KEY_DECODE } from '@/app/config'
var CryptoJS = require('crypto-js');
var secretKey = `${PUBLIC_KEY_DECODE}`

export const decrypt = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
        throw new Error('Decrypted data is empty or invalid');
    }

    try {
        return `${PUBLIC_MUSIC_ENDPOINT}` + JSON.parse(decrypted);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        console.error("Decrypted data:", decrypted);
        return null;
    }
};