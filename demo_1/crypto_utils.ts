/**
 * 前端 对称加密 解决方案--crypto-js
 * 加密/解密
 */
import CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF")  //密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412')   //密钥偏移量

//解密
function decrypt(word: string): string {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密
function encrypt(word: string): string {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}

export default {
  decrypt,
  encrypt
}
